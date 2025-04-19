import { fileURLToPath } from "url"
import path from "path"
import fs from "fs/promises"
// database
import newDatabase from "./public/data/Database2.js"
const db = newDatabase()

// templates
import { Layout } from "./public/layout/Layout.js"
import { CategoryTemplate } from "./public/templates/CategoryTemplate.js"
import { CategoryTypeTemplate } from "./public/templates/CategoryTypeTemplate.js"
import { AllCategoriesTemplate } from "./public/templates/AllCategoriesTemplate.js"

// when a new movie is created in [data], it should create a file for it
// without the need to remove the "output" folder

const __fileName = fileURLToPath(import.meta.url)
const __folderName = path.dirname(__fileName)

const fullPath = path.join(__folderName, "public/pages", "output")

// const d = db.getAllDatabases()
const d = db.all.lists
const c = db.all.categories()

async function createQuery() {
  // layout -> template [just an input]
  const template = {
    header: /*html*/ `
        <script src="/js/script.js" defer type="module"></script>
    `,
    html: /*html*/ `
    <div class="form" id="search">
        <form >
          <input type="text" name="query" />
        </form>
      </div>
    `,
  }

  const filePath = path.join(fullPath, "query")

  try {
    await fs.mkdir(filePath, { recursive: true })
    await fs.writeFile(
      path.join(filePath, "query.html"),
      Layout(
        { header: template.header, template: template.html },
        "input",
        "query",
      ),
      "utf-8",
    )
  } catch (error) {
    console.log(error)
  }
}

async function createFiles() {
  if (!(await checkFileExists(fullPath))) await fs.mkdir(fullPath)
  // create a folder with name movies

  for (let type in d) {
    console.log(type, "-> ", d[type]())

    const fullPathType = path.join(fullPath, type)
    if (!(await checkFileExists(fullPathType)))
      await fs.mkdir(fullPathType, { recursive: true })

    // here we show the list of instances(book, tv-series, movie)
    const typeTemplate = CategoryTemplate({ type, list: d[type]() })

    const typeFile = path.join(fullPathType, `${type}.html`)
    // if (!(await checkFileExists(typeFile)))
    // not checked, as it is needed to create a completely new file each time
    await fs.writeFile(
      typeFile,
      Layout({ template: typeTemplate }, type, "all"),
    )

    for (let entity of d[type]()) {
      // for each movie/tv-serie/book(entity), we create a folder dynamic in which we have two files,
      // one is the movie-id.html
      // and the second is movie-review-id.html. Both wrapped in Layout.js.

      // create dynamic folder for each entity
      const dynamicPath = path.join(fullPath, type, "dynamic")
      if (!(await checkFileExists(dynamicPath)))
        await fs.mkdir(dynamicPath, { recursive: true })

      // create individual instances of the entity and its review. E.g. movie-id.html, movie-review-id.html

      // create individual folder
      const dynamicFolderPath = path.join(dynamicPath, `${type}-${entity.id}`)
      if (!(await checkFileExists(dynamicFolderPath)))
        await fs.mkdir(dynamicFolderPath, { recursive: true })

      // create review file
      const reviewPath = path.join(
        dynamicFolderPath,
        `${type}-review-${entity.id}.html`,
      )
      if (!(await checkFileExists(reviewPath)))
        await fs.writeFile(reviewPath, "", "utf-8")

      // movie-id.html
      const filePath = path.join(dynamicFolderPath, `${type}-${entity.id}.html`)
      // no template
      if (!(await checkFileExists(filePath)))
        await fs.writeFile(filePath, Layout("", type, entity.title), "utf-8")
    }
  }
}

async function createCategoriesFiles() {
  const categoryFolder = path.join(fullPath, "categories")
  if (!(await checkFileExists(categoryFolder))) {
    await fs.mkdir(categoryFolder, { recursive: true })
  }

  // console.log("All categories", c)

  for (let [type, list] of c) {
    // create book.htm, movies.html that lists all the categoies
    const categoryTypeFolder = path.join(fullPath, "categories", type)
    const categoryTypeFile = path.join(categoryTypeFolder, `${type}.html`)

    // /:type/category
    try {
      const template = CategoryTypeTemplate({ type, list })
      if (!(await checkFileExists(categoryTypeFolder)))
        await fs.mkdir(categoryTypeFolder, { recursive: true })
      if (!(await checkFileExists(categoryTypeFile)))
        await fs.writeFile(categoryTypeFile, Layout({ template }), "utf-8")
    } catch (error) {
      console.log({
        error,
        message: "Problem with creation of categoryTypeFile",
      })
    }

    // /:type/category/:category
    for (let category of list) {
      // type [books, tv-series, movies] -> category folder -> category file

      try {
        const folderPath = path.join(categoryTypeFolder, `${category}`)
        await fs.mkdir(folderPath, { recursive: true })

        const filePath = path.join(folderPath, `${type}-${category}.html`)

        const template = CategoryTemplate({
          type,
          list: db[type].getItemsByCategory(category),
          // list: d[type].filter((el) => el.category.toLowerCase() === category),
        })
        if (!(await checkFileExists(filePath)))
          await fs.writeFile(
            filePath,
            Layout({ template }, type, category),
            "utf-8",
          )
      } catch (error) {
        console.log({
          error,
          message: "Could not create folder, file in /:type/category/:category",
        })
      }
    }
  }

  // create folder for each type's[movies, tv-series, books] category
  // create folder with name "all"

  // /category
  const allFolder = path.join(categoryFolder, "all")
  if (!(await checkFileExists(allFolder))) {
    await fs.mkdir(allFolder, { recursive: true })
  }

  const template = AllCategoriesTemplate(db.all.categories(true))

  const categoryFile = path.join(categoryFolder, "all", "categories.html")

  if (!(await checkFileExists(categoryFile)))
    await fs.writeFile(
      categoryFile,
      Layout({ template }, "categories", "all"),
      "utf-8",
    )
}

// index.html and 404.html
async function defaultFilesInit() {
  // templates
  const indexTemplate = {
    header: /*html*/ `
        <script src="/js/script.js" defer type="module"></script>
    `,
    html: /*html*/ ` <div class="container">
      <section class="promoted-movies">
        <h3>Movies</h3>
      </section>

      <section class="promoted-tv-series">
        <h3>TV Series</h3>
      </section>

      <section class="promoted-books">
        <h3>Books</h3>
      </section>
    </div>`,
  }

  const fileNotFoundTemplate = /*html*/ `
    <h1>This page does not exist!</h1>
    <a href="/movies/">Go home!</a>
    `

  // path declaration
  const indexPath = path.join(fullPath, "index.html")
  const fileNotFoundPath = path.join(fullPath, "404.html")

  // file creation
  try {
    if (!(await checkFileExists(indexPath)))
      await fs.writeFile(
        indexPath,
        Layout(
          { header: indexTemplate.header, template: indexTemplate.html },
          "highlighted",
          "all",
        ),
        "utf-8",
      )
    if (!(await checkFileExists(fileNotFoundPath)))
      await fs.writeFile(
        fileNotFoundPath,
        Layout({ template: fileNotFoundTemplate }, "404", "Not Found"),
        "utf-8",
      )
  } catch (error) {
    console.log(error)
  }
}

async function checkFileExists(path) {
  try {
    await fs.access(path)
    return true
  } catch (error) {
    return false
  }
}

function init(files = true, categoryFiles = true, createDefaultFiles = true) {
  files && createFiles()
  categoryFiles && createCategoriesFiles()
  createDefaultFiles && defaultFilesInit()
  createQuery()
}

init()
