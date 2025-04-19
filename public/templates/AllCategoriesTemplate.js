// let allDatebases = {
//   movies: db.getCategoriesMovies(),
//   "tv-series": db.getCategoriesTvSeries(),
//   books: db.getCategoriesBooks(),
// }

function AllCategoriesTemplate(allDatebases) {
  return /*html*/ `${Object.entries(allDatebases)
    .map(([type, list], index) => {
      return /*html*/ `
      <div className="categories">
      <h3>${index + 1}. ${type}</h3>
      <ul>
      ${list
        .map((el) => {
          return /*html*/ `
            <li>
            <a href="/${type}/category/${el}">
            ${el}
            </a>
            </li>
            `
        })
        .join("")}
          </ul>
          </div>
        `
    })
    .join("")}`
}

export { AllCategoriesTemplate }
