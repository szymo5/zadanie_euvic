export const selectLanguage = (texts: {pl: string, en: string}, lg: string): string => {
  return lg === 'pl' ? texts.pl : texts.en;
}