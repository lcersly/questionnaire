export type PageElement = CodeElement | SimpleTextElement;

export interface CodeElement {
  readonly type: 'code'
  readonly content: string
  readonly languageHighlighting: string;
}

export interface SimpleTextElement {
  readonly type: 'simple-text'
  readonly content: string,
}
