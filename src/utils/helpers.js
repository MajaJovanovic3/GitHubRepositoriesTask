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

export function findLastPageNumber(link) {
  const lastPage = link
    .split(',')
    .find((linkItem) => linkItem.includes('rel="last"'));
  const prevPage = link
    .split(',')
    .find((linkItem) => linkItem.includes('rel="prev"'));
  const PageRegex = /&page=(\d+)/;
  let lastPageNum;
  if (lastPage && lastPage.match(PageRegex).length > 0) {
    lastPageNum = lastPage.match(PageRegex)[1];
  } else if (
    lastPage === undefined &&
    prevPage.match(PageRegex).length > 0 &&
    prevPage
  ) {
    lastPageNum = Number(prevPage.match(PageRegex)[1]) + 1;
  } else lastPageNum = 1;
  return lastPageNum;
}

export const numberHTML = (number, currPage, setCurrPage) => {
  return (
    <>
      <div
        key={number}
        className={number === currPage ? 'round-effect activeNum' : 'round-effect'}
        onClick={() => {
          setCurrPage(number);
        }}
      >
        {number}
      </div>
    </>
  );
};
