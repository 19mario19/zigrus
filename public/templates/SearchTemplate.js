// let object = {
//   query: "",
//   movies: db.getCategoriesMovies(),
//   "tv-series": db.getCategoriesTvSeries(),
//   books: db.getCategoriesBooks(),
// }

function SearchTemplate(object) {
  return /*html*/ `<h2>Search resutls for: ${object.query}</h2>
  ${Object.entries(object)
    .filter((_, index) => index > 0) // remove query filed from the object
    .map(([type, list], index) => {
      return /*html*/ `
      <div className="categories">
      <h3>${type}</h3>
      <ul>
      ${
        Array.isArray(list) &&
        list
          .map((el) => {
            return /*html*/ `
            <li>
            <a href="/${type}/review/${el.id}">
            ${el.title}
            </a>
            </li>
            `
          })
          .join("")
      }
          </ul>
          </div>
        `
    })
    .join("")}`
}

export { SearchTemplate }
