import { TYPE } from "../types/types.js"
import newDatabase2 from "../data/Database2.js"

const db = newDatabase2()

// console.log(db)

const categoriesMap = db.all.categories()

/**
 * @param {HTMLElement} root
 */
function init(root) {
  const container = document.createElement("div")
  container.classList.add("container")
  const nav = document.createElement("nav")
  container.appendChild(nav)

  /**
   * @type {HTMLElement}
   */
  const title = document.createElement("h2")
  title.classList.add("title")
  nav.appendChild(title)

  const linkTitle = document.createElement("a")
  linkTitle.textContent = "Reviews by Zigrus"
  linkTitle.href = "/"
  title.appendChild(linkTitle)

  // 1. creating routes for types
  // 2. creating routes for types' categories
  // 3. creating routes for all categoires filtered by types

  // search container
  // const searchContainer = initSearch()
  // nav.appendChild(searchContainer)

  const ulParent = document.createElement("ul")
  ulParent.classList.add("parent")
  nav.appendChild(ulParent)
  // categories
  const liParentSearch = document.createElement("li")
  liParentSearch.classList.add("parent", "search-item")
  ulParent.appendChild(liParentSearch)

  const linkParentSearch = document.createElement("a")
  linkParentSearch.href = "/query"
  linkParentSearch.textContent = "search"
  liParentSearch.appendChild(linkParentSearch)

  // movies, tv-series, books
  for (let type of Object.values(TYPE)) {
    const liParent = document.createElement("li")
    liParent.classList.add("parent")
    ulParent.appendChild(liParent)

    const linkParent = document.createElement("a")
    liParent.appendChild(linkParent)
    linkParent.href = `/${type}`
    linkParent.textContent = type
  }

  // categories
  const liParentCategory = document.createElement("li")
  liParentCategory.classList.add("parent", "category-item")
  ulParent.appendChild(liParentCategory)

  const linkParentCategory = document.createElement("a")
  linkParentCategory.href = "/category"
  linkParentCategory.textContent = "categories"
  liParentCategory.appendChild(linkParentCategory)

  // types -> movies, tv-series, books
  const ulCategories = document.createElement("ul")
  ulCategories.classList.add("categories")
  liParentCategory.appendChild(ulCategories)

  // categories
  for (const [type, list] of categoriesMap) {
    const liType = document.createElement("li")
    liType.classList.add("type")
    ulCategories.appendChild(liType)

    const linkType = document.createElement("a")
    liType.appendChild(linkType)
    linkType.href = `/${type}/category`
    linkType.textContent = type

    liParentCategory.appendChild(ulCategories)

    if (list.length > 0) {
      const liWrapper = document.createElement("li")
      liWrapper.classList.add("wrapper")
      ulCategories.appendChild(liWrapper)

      const ulGenre = document.createElement("ul")
      ulGenre.classList.add("genre-list")
      liWrapper.appendChild(ulGenre)

      for (let i = 0; i < list.length; i++) {
        const genre = list[i]

        const liGenre = document.createElement("li")
        liGenre.classList.add("category")
        ulGenre.appendChild(liGenre)

        const linkGenre = document.createElement("a")
        linkGenre.href = `/${type}/category/${genre}`
        linkGenre.textContent = genre
        liGenre.appendChild(linkGenre)
      }
    }
  }

  root.insertBefore(container, root.firstChild)
}

function initSearch(root) {
  /**
   * search button -> redirects to search page
   *
   * in that search page we have an input
   * [later maybe adding options, filter by type, category, year and so on]
   *
   * main route of the page is /search
   *
   * the same route but with query
   * on submit of the form, a call will be made to [/search?query=text]->
   *  returns a template with the current json
   *
   * keeping this file, in case we will eventually want to add the functionality of drop-down
   *
   */
  // const container = document.createElement("div")
  // const name = "search"
  // const a = document.createElement("a")
  // a.href = `/${name}`
  // a.textContent = name
  // container.appendChild(a)
  // root.insertBefore(container, root.firstChild)
  // return container
}

window.addEventListener("DOMContentLoaded", () => {
  init(document.body)
})
