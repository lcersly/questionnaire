export function asStrings<T extends { [key: string]: string }>(arg: T): T {
  return arg;
}
