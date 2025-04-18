import { TYPE } from "../types/types.js"
import { data } from "./data.js"

class Database {
  constructor(data) {
    this.all = {
      lists: {},
    }

    for (let type of Object.values(TYPE)) {
      this[type] = {
        getAll: () => (Array.isArray(data[type]) ? data[type] : []),
        getById: (id) => {
          return (this[type].getAll() || []).find((item) => item.id === id)
        },
        getPromoted: () =>
          Array.from(new Set(this[type].getAll().filter((o) => o.promote))),
        groupByCategory: () => {
          let map = new Map()

          this[type].getAll().forEach((item) => {
            const category = item.category.toLowerCase()

            if (!map.has(category)) {
              map.set(category, [])
            }
            map.get(category).push(item)
          })

          return map
        },
        getCategoryNames: () => {
          let set = new Set()

          const list = Array.from(this[type].groupByCategory().keys())

          for (let key of list) {
            set.add(key)
          }

          return Array.from(set)
        },
        getItemsByCategory: (category) => {
          const categories = this[type].groupByCategory()
          return categories.has(category) ? categories.get(category) : []
        },
        getItemsByRating: () => {
          /** @type {Map<number, Set<any>} */
          const map = new Map()

          for (let index = 1; index <= 5; index++) {
            map.set(index, new Set())

            for (let element of this[type].getAll()) {
              if (element.rating === index) {
                map.get(index).add(element)
              }
            }
          }

          return map
        },
      }

      this.all.lists[type] = () => this[type].getAll()
    } // end for loop

    this.all["categories"] = (asObject = false) => {
      let map = new Map()

      for (let type of Object.values(TYPE)) {
        map.set(type, this[type].getCategoryNames())
      }
      if (asObject) {
        let obj = {}
        for (let [key, list] of map) {
          obj[key] = list
        }
        return obj
      }

      return map
    }

    this.debouncedSearch = this.createDebounceFunction()
  }
  /**
   * @returns {(query: any, time: any) => Promise}
   */
  createDebounceFunction() {
    // to have shared state of debounceTimer
    let debounceTimer

    return function debounce(query, time) {
      return new Promise((resolve, reject) => {
        let date = new Date()
        // let time = date.toLocaleTimeString()
        let d = date.toLocaleString()

        console.log("Debouncer cleared at: ", d, "current query => ", query)
        clearTimeout(debounceTimer)

        debounceTimer = setTimeout(() => {
          try {
            console.log(
              "Making the request after the delay with => ",
              `[${query}]`,
            )
            const result = this.search(query, 5)
            result ? resolve(result) : reject("Could not fetch the data")
          } catch (error) {
            console.log("Error: ", error)
            return reject("An error occured while fetching the data")
          }
        }, time)
      })
    }
  }

  /**
   * @param {string} query
   * @return {Map<string, Set<any>}
   * @memberof Database
   */
  searchMap(query, limit = 0) {
    const q = query.toLowerCase()
    const newMap = new Map()

    for (let type of Object.values(TYPE)) {
      let startsWith = []
      let includesElement = []

      let found = 0

      let getArray = this[type].getAll()
      for (let index = 0; index < getArray.length; index++) {
        const element = getArray[index]
        let e = element.title.toLowerCase()

        let array = e.split(" ")

        if (array[0] === "the") e = array.slice(1).join(" ")

        if (e.startsWith(q)) {
          startsWith.push(element)
          if (found >= limit && limit !== 0) break
        } else if (e.includes(q)) {
          includesElement.push(element)
          if (found >= limit && limit !== 0) break
        }
      }

      const list = [...startsWith, ...includesElement]

      newMap.set(type, list)
    }

    return newMap
  }

  /**
   * @param {string} query
   * @return {object}
   * @memberof Database
   */
  search(query, limit) {
    const newMap = this.searchMap(query, limit)

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
