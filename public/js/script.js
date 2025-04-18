//@ts-check
import { TYPE } from "../types/types.js"
import newDatabase from "../data/Database2.js"

const db = newDatabase()

import { SearchTemplate } from "../../templates/SearchTemplate.js"

const data = new Map()
const containers = new Map()

for (let type of Object.values(TYPE)) {
  data.set(type, db[type].getAll())
  containers.set(TYPE.MOVIES, document.querySelector(`.${type}`))
}

// template for Movies, Books and TV Series
/**
 * @param {string} type
 */
function initList(type) {
  /**
   * @type {HTMLElement}
   */
  const container = containers.get(type)
  if (!container) return

  container.classList.add(type)
  const items = data.get(type)
  if (!items || items.length === 0) return

  const ul = document.createElement("ul")
  container.appendChild(ul)

  for (let i = 0; i < items.length; i++) {
    const element = items[i]

    const li = document.createElement("li")
    ul.appendChild(li)

    const link = document.createElement("a")
    link.href = `/${type}/review/${element.id}`
    li.appendChild(link)

    const elementId = document.createElement("h2")
    elementId.textContent = element.id

    const elementTitle = document.createElement("h1")
    elementTitle.textContent = element.title

    link.append(elementId, elementTitle)
  }
}

function initAllPromoted(log = false) {
  if (log) {
    for (let type of Object.values(TYPE)) {
      console.log(type, db[type].getPromoted())
    }
  }

  for (let type of Object.values(TYPE)) {
    initPromoted(type, `.promoted-${type}`, db[type].getPromoted())
  }
}

/**
 * @param {string} type
 * @param {string} containerName
 * @param {any[]} database
 */
function initPromoted(type, containerName, database) {
  if (!type || !containerName || !database) return

  const container = document.querySelector(containerName)
  if (!container) return
  container.classList.add("container", "promoted")

  const ulType = document.createElement("ul")
  container.appendChild(ulType)

  const db = database ?? []
  db.forEach((e) => {
    const li = document.createElement("li")
    ulType.appendChild(li)

    const a = document.createElement("a")
    a.href = `${type}/review/${e.id}`
    li.appendChild(a)

    const id = document.createElement("h2")
    id.textContent = e.id

    const title = document.createElement("h1")
    title.textContent = e.title

    a.append(id, title)
  })
}

function init() {
  for (let type of Object.values(TYPE)) {
    initList(type)
  }

  initAllPromoted(false)
}

// search
function searchInit() {
  const container = document.querySelector("#search")

  const form = container?.querySelector("form")

  const input = form?.querySelector("input")

  const resultsContainer = document.createElement("div")

  // to cancel refresh on submit
  form?.addEventListener("submit", (e) => e.preventDefault())

  input?.addEventListener("input", async (e) => {
    resultsContainer.innerHTML = ""

    container?.appendChild(resultsContainer)

    if (e.target instanceof HTMLInputElement) {
      const query = e.target?.value.trim()

      const templateElement = document.createElement("div")
      const list = await db.debouncedSearch(query, 100)

      const template = SearchTemplate(list)
      templateElement.innerHTML = template

      resultsContainer?.append(templateElement)
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  init()
  searchInit()
})
