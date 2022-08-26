import {mkdirSync, readFileSync, writeFile} from "fs";
import {globby} from "globby";
import {mergeFiles} from "json-merger";

const inputPath = './src/app/**';
const outputPath = './src/assets/i18n/';
const languages = ['da', 'en'];

(async () => {
  try {
    mkdirSync(outputPath, {recursive: true});
    const languageFiles = await globby([inputPath], {
      expandDirectories: {
        files: languages,
        extensions: ['json'],
      },
    });
    const languageFilesByLocale = await groupLanguageByLocale(languageFiles);
    verifyLanguageFiles(
      Object.keys(languageFilesByLocale),
      [].concat(...Object.values(languageFilesByLocale))
    );
    for (const language in languageFilesByLocale) {
      await mergeLanguageFiles(languageFilesByLocale[language], language);
    }
  } catch (error) {
    console.log(error);
  }
})();

async function groupLanguageByLocale(languageFiles) {
  let languageDictionary = {};
  languages.forEach(
    (lang) =>
      (languageDictionary[lang] = languageFiles.filter((file) =>
        file.includes(lang + '.json')
      ))
  );
  return languageDictionary;
}

function jsonStringifyWithSortedKeys(obj) {
  let keys = [];
  let seen = {};
  JSON.stringify(obj, function (key, value) {
    if (!(key in seen)) {
      keys.push(key);
      seen[key] = null;
    }
    return value;
  });
  return JSON.stringify(obj, keys.sort(), 2);
}

async function mergeLanguageFiles(languageFiles, language) {
  const mergedLanguageFile = mergeFiles(languageFiles);
  await writeFile(
    `${outputPath}${language}.json`,
    jsonStringifyWithSortedKeys(mergedLanguageFile),
    'utf8',
    function (err) {
      if (err) {
        console.log('An error occured while writing language file.');
        return console.log(err);
      }
    }
  );
}

function verifyLanguageFiles(languages, languageFiles) {
  let failed = false;

  const languageFilesByFolder = getLanguageFilesByFolder(languageFiles);

  // verify that each folder contains both expected files
  for (const languageFileFolder of Object.keys(languageFilesByFolder)) {
    for (const language of languages) {
      const expectedLanguageFile = `${languageFileFolder}/${language}.json`;
      if (!languageFiles.includes(expectedLanguageFile)) {
        console.error('Missing language file:', expectedLanguageFile);
        failed = true;
      }
    }
  }

  // verify that language files within each folder contain the same structure
  const flattenedTranslationsByLanguageFile =
    getFlattenedTranslationsByLanguageFile(languageFiles);
  for (const languageFilesFolder of Object.keys(languageFilesByFolder)) {
    const languageFilesInFolder = languageFilesByFolder[languageFilesFolder];
    const flattenedKeysWithDuplicates = [].concat(
      ...languageFilesInFolder.map((languageFile) =>
        Object.keys(flattenedTranslationsByLanguageFile[languageFile])
      )
    );
    const uniqueFlattenedKeys = Array.from(
      new Set(flattenedKeysWithDuplicates)
    );

    for (const language of languages) {
      for (const flattenedKey of uniqueFlattenedKeys) {
        const languageFile = `${languageFilesFolder}/${language}.json`;
        const flattenedTranslations =
          flattenedTranslationsByLanguageFile[languageFile];
        const translation = flattenedTranslations[flattenedKey];
        if (translation === undefined) {
          console.error(
            `Missing translation key [${flattenedKey}] in ${languageFile}`
          );
          failed = true;
        }
      }
    }
  }

  if (failed) {
    process.exit(1);
  }
}

function getFlattenedTranslationsByLanguageFile(languageFiles) {
  let flattenedTranslationsByLanguageFile = {};
  for (const languageFile of languageFiles) {
    const json = readFileSync(languageFile).toString();
    flattenedTranslationsByLanguageFile[languageFile] = flatten(
      JSON.parse(json)
    );
  }
  return flattenedTranslationsByLanguageFile;
}

function getLanguageFilesByFolder(languageFiles) {
  let languageFileByFolder = {};
  for (const languageFile of languageFiles) {
    const parentFolder = languageFile.split('/').slice(0, -1).join('/');
    languageFileByFolder[parentFolder] =
      languageFileByFolder[parentFolder] || [];
    languageFileByFolder[parentFolder].push(languageFile);
  }
  return languageFileByFolder;
}

function flatten(obj, keyPath = []) {
  let flattened = {};
  for (const key of Object.keys(obj)) {
    const myKeyPath = [...keyPath, key];
    if (typeof obj[key] === 'string') {
      flattened[myKeyPath.join('.')] = obj[key];
    } else {
      flattened = {
        ...flattened,
        ...flatten(obj[key], myKeyPath),
      };
    }
  }
  return flattened;
}
