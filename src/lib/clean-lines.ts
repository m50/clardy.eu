export const cl = (strings: TemplateStringsArray, ...expr: string[]): string => {
  let str = '';
  strings.forEach((string, i) => {
    str += string + (expr[i] || '');
  });

  str = str.replace(/\s+/g, ' ').trim();

  return str;
};
