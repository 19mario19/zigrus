import { TYPE } from "../types/types.js"
import { data, data2 } from "./data.js"

class Database {
  constructor(data) {
    this._movies = Array.isArray(data.movies) ? data.movies : []
    this._tvSeries = Array.isArray(data.tvSeries) ? data.tvSeries : []
    this._books = Array.isArray(data.books) ? data.books : []
    this._games = Array.isArray(data.games) ? data.games : []

    this.Movies = {
      getAll: this.getAllMovies.bind(this),
    }
    this["Tv-series"] = {
      getAll: this.getAllTvSeries.bind(this),
    }
    this.Books = {
      getAll: this.getAllBooks.bind(this),
    }
    this.Games = {
      getAll: this.getAllGames.bind(this),
    }

    // Initialise Map collections
    this._mapItemsById()
    this._mapItemsByCategory()
    this._mapByCategories()
    this._mapPromotedItems()
  }

  _mapPromotedItems() {
    this._promotedMovies = new Set(this._movies.filter((e) => e.promote))
    this._promotedTvSeries = new Set(this._tvSeries.filter((e) => e.promote))
    this._promotedBooks = new Set(this._books.filter((e) => e.promote))
    this._promotedGames = new Set(this._games.filter((e) => e.promote))
  }

  getPromotedMovies() {
    return Array.from(this._promotedMovies)
  }
  getPromotedTvSeries() {
    return Array.from(this._promotedTvSeries)
  }
  getPromotedBooks() {
    return Array.from(this._promotedBooks)
  }
  getPromotedGames() {
    return Array.from(this._promotedGames)
  }

  // Store items in Maps by their unique ID
  _mapItemsById() {
    this._moviesMap = new Map(this._movies.map((m) => [m.id, m]))
    this._tvSeriesMap = new Map(this._tvSeries.map((t) => [t.id, t]))
    this._booksMap = new Map(this._books.map((b) => [b.id, b]))
    this._gamesMap = new Map(this._games.map((g) => [g.id, g]))
  }

  // Group items by category in Maps
  _mapItemsByCategory() {
    this._moviesByCategory = new Map()
    this._tvSeriesByCategory = new Map()
    this._booksByCategory = new Map()
    this._gamesByCategory = new Map()

    this._moviesMap.forEach((m) => {
      const category = m.category.toLowerCase()

      if (!this._moviesByCategory.has(category)) {
        this._moviesByCategory.set(category, [])
      }
      this._moviesByCategory.get(category).push(m)
    })

    this._tvSeriesMap.forEach((t) => {
      const category = t.category.toLowerCase()

      if (!this._tvSeriesByCategory.has(category)) {
        this._tvSeriesByCategory.set(category, [])
      }
      this._tvSeriesByCategory.get(category).push(t)
    })

    this._booksMap.forEach((b) => {
      const category = b.category.toLowerCase()

      if (!this._booksByCategory.has(category)) {
        this._booksByCategory.set(category, [])
      }
      this._booksByCategory.get(category).push(b)
    })

    this._gamesMap.forEach((g) => {
      const category = g.category.toLowerCase()

      if (!this._gamesByCategory.has(category)) {
        this._gamesByCategory.set(category, [])
      }
      this._gamesByCategory.get(category).push(g)
    })
  }

  _mapByCategories() {
    this._categoriesOfMovies = new Set()
    this._categoriesOfTvSeries = new Set()
    this._categoriesOfBooks = new Set()
    this._categoriesOfGames = new Set()

    for (const [key, value] of this._moviesByCategory) {
      if (!this._categoriesOfMovies.has(key)) this._categoriesOfMovies.add(key)
    }
    for (const [key, value] of this._tvSeriesByCategory) {
      if (!this._categoriesOfTvSeries.has(key))
        this._categoriesOfTvSeries.add(key)
    }
    for (const [key, value] of this._booksByCategory) {
      if (!this._categoriesOfBooks.has(key)) this._categoriesOfBooks.add(key)
    }
    for (const [key, value] of this._gamesByCategory) {
      if (!this._categoriesOfBooks.has(key)) this._categoriesOfGames.add(key)
    }
  }

  getCategoriesMovies() {
    return Array.from(this._categoriesOfMovies) || []
  }
  getCategoriesTvSeries() {
    return Array.from(this._categoriesOfTvSeries) || []
  }
  getCategoriesBooks() {
    return Array.from(this._categoriesOfBooks) || []
  }
  getCategoriesGames() {
    return Array.from(this._categoriesOfGames) || []
  }

  getAllCategories() {
    return {
      movies: Array.from(this._categoriesOfMovies) || [],
      "tv-series": Array.from(this._categoriesOfTvSeries) || [],
      books: Array.from(this._categoriesOfBooks) || [],
      games: Array.from(this._categoriesOfGames) || [],
    }
  }

  /**
   * @param {string} category
   * @returns {Array}
   */
  getMoviesByCategory(category) {
    return this._moviesByCategory.get(category) || []
  }

  /**
   * @param {string} category
   * @returns {Array}
   */
  getTvSeriesByCategory(category) {
    return this._tvSeriesByCategory.get(category) || []
  }

  /**
   * @param {string} category
   * @returns {Array}
   */
  getBooksByCategory(category) {
    return this._booksByCategory.get(category) || []
  }

  /**
   * @param {string} category
   * @returns {Array}
   */
  getGamesByCategory(category) {
    return this._gamesByCategory.get(category) || []
  }

  /**
   * @param {number} id
   */
  getMovieById(id) {
    return this._moviesMap.get(id) || null
  }

  /**
   * @param {number} id
   */
  getTvSeriesById(id) {
    return this._tvSeriesMap.get(id) || null
  }

  /**
   * @param {number} id
   */
  getBookById(id) {
    return this._booksMap.get(id) || null
  }

  /**
   * @param {number} id
   */
  getGameById(id) {
    return this._gamesMap.get(id) || null
  }

  // Get all collections
  getAllMovies() {
    return this._movies
  }

  getAllTvSeries() {
    return this._tvSeries
  }

  getAllBooks() {
    return this._books
  }

  getAllGames() {
    return this._games
  }

  getAllDatabases() {
    return {
      movies: this._movies ?? [],
      "tv-series": this._tvSeries ?? [],
      books: this._books ?? [],
      games: this._games ?? [],
    }
  }
  /**
   * @param {string} query
   * @return {Map<string, Set<any>}
   * @memberof Database
   */
  searchMap(query) {
    const q = query.toLowerCase()
    const newMap = new Map()

    for (let t of Object.values(TYPE)) {
      const type = t[0].toUpperCase() + t.slice(1)

      const array = this[type].getAll()

      let startsWith = []
      let includesElement = []

      for (let element of array) {
        let e = element.title.toLowerCase()

        let array = e.split(" ")

        if (array[0] === "the") e = array.slice(1).join(" ")

        if (e.startsWith(q)) {
          startsWith.push(element)
        } else if (e.includes(q)) {
          includesElement.push(element)
        }
      }

      const list = [...startsWith, ...includesElement]

      newMap.set(t, list)
    }

    return newMap
  }

  /**
   * @param {string} query
   * @return {object}
   * @memberof Database
   */
  search(query) {
    // make it in one list, starts-with then includes. Do not include the same file

    const newMap = this.searchMap(query)

    const results = {}
    for (let type of Object.values(TYPE)) {
      results[type] = Array.from(newMap.get(type))
    }

    return {
      query,
      ...results,
    }
  }
}


let dbInstance = null

/**
 * @returns {Database}
 */
function newDatabase() {
  if (!dbInstance) {
    dbInstance = new Database(data)
  }
  return dbInstance
}

export default newDatabase
