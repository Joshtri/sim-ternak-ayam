/**
 * Generic lookup utility for finding text by value in an array of objects
 */
export interface LookupItem {
  key: string;
  text: string;
  value: string;
}

export const getDisplayText = (
  value: string | number | null | undefined,
  lookupArray: LookupItem[],
  fallbackValue?: string
): string => {
  if (!value) return fallbackValue ?? "";

  const stringValue = value.toString();
  const lookupItem = lookupArray.find(item => item.value === stringValue);

  return lookupItem ? lookupItem.text : (fallbackValue ?? stringValue);
};

export const createLookupFunction = (lookupArray: LookupItem[]) => {
  return (
    value: string | number | null | undefined,
    fallbackValue?: string
  ): string => {
    return getDisplayText(value, lookupArray, fallbackValue);
  };
};

export const getDisplayTexts = (
  values: (string | number)[],
  lookupArray: LookupItem[],
  fallbackValue?: string
): string[] => {
  return values.map(value => getDisplayText(value, lookupArray, fallbackValue));
};

export const hasLookupValue = (
  value: string | number | null | undefined,
  lookupArray: LookupItem[]
): boolean => {
  if (!value) return false;
  const stringValue = value.toString();

  return lookupArray.some(item => item.value === stringValue);
};

export const getLookupItem = (
  value: string | number | null | undefined,
  lookupArray: LookupItem[]
): LookupItem | undefined => {
  if (!value) return undefined;
  const stringValue = value.toString();

  return lookupArray.find(item => item.value === stringValue);
};
