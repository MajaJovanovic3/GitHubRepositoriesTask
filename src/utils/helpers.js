export function mapLanguages(languagesJSON) {
  const languageEntries = Object.entries(languagesJSON);
  const sum = languageEntries.reduce((acc, currentValue) => {
    return acc + currentValue[1];
  }, 0);
  return languageEntries.map((entry) => {
    const percentage = (entry[1] * 100) / sum;
    const roundedValue = Math.round(percentage * 100) / 100;
    return { languageName: entry[0], usagePercent: roundedValue };
  });
}
