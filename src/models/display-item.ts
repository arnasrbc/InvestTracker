export interface DisplayItem {
  label: string;
  code: string;
}

export function arrayAsCodes(array: DisplayItem[]) {
  return array.map( di => di.code);
}
