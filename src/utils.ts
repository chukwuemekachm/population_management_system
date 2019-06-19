export const transformToSnaKeCase = (word: string = ''): string => {
  const charArr = [...word].map((char) => {
    const isUpper = char.match(/[A-Z]/);
    const result = isUpper ? `_${char.toLowerCase()}` : char;
    return result;
  });
  return charArr.join('');
};
