import express from "express"
import { fileURLToPath } from "url"
import path, { join } from "path"
import fs from "fs/promises"
// types
import { TYPE } from "./public/types/types.js"
import newDatabase from "./public/data/Database2.js"
import { Layout } from "./public/layout/Layout.js"
import { SearchTemplate } from "./templates/SearchTemplate.js"


const app = express()
const port = 3000
const db = newDatabase()

const __fileName = fileURLToPath(import.meta.url)
const __folderName = path.dirname(__fileName)

const fullPath = path.join(__folderName, "public/pages", "output")

app.use(express.static("public"))
app.use("/templates", express.static(path.join(__folderName, "templates")))

app.use((req, _, next) => {
  const route = req.method
  const url = req.originalUrl

  console.log(route, "-", `[${url}]`)

  next()
})

const d = newDatabase()

const c = d.all.lists

console.log(c)



// search page, like google's. One input, on pressing submit, sends to the /search?query=[input]
app.get("/query", async (req, res) => {
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

  try {
    return res
      .status(200)
      .send(
        Layout(
          { header: template.header, template: template.html },
          "input",
          "query",
        ),
      )
  } catch (error) {
    console.log(error)
  }
})

app.get("/search", async (req, res) => {
  /**
   *  as this a is dyncamic route, we have to create files dynamically.
   *  that is the reason of not creating it using create.js, because that would require an
   *  infinite number of queries
   *
   */
  const { query } = req.query

  const result = db.search(query)

  const formString = /*html*/ `
  <div class="form">
      <form action="/search" method="get">
        <input type="text" name="query" />
        <button type="submit">Search</button>
      </form>
    </div>
  `

  const template = Layout(
    { template: `${formString} ${SearchTemplate(result)}` },
    "query",
    `[${query || "search"}]`,
  )

  try {
    return res.status(200).send(template)
  } catch (error) {
    console.log(error)

    return res.status(500).json({ error })
  }
})

app.get("/", (req, res) => {
  return res.sendFile(join(fullPath, "index.html"))
})

for (let type of Object.values(TYPE)) {
  app.get(`/${type}`, (req, res) => {
    return res.sendFile(path.join(fullPath, type, `${type}.html`))
  })

  app.get(`/${type}/review/:id`, async (req, res) => {
    const { id } = req.params

    const dynamicPath = path.join(
      fullPath,
      type,
      "dynamic",
      `${type}-${id}`,
      `${type}-${id}.html`,
    )

    if (!(await checkFileExists(dynamicPath))) {
      return res.status(400).sendFile(path.join(fullPath, "404.html"))
    }

    return res.status(200).sendFile(dynamicPath)
  })
}

app.get("/category", async (req, res) => {
  const folderPath = path.join(fullPath, "categories", "all")
  const filePath = path.join(folderPath, "categories.html")

  return res.sendFile(filePath)
})

app.get("/:type/category/", (req, res) => {
  // returns a list of categories filtered by type
  // e.g books -> dystopian, sci-fi only.
  const { type } = req.params

  const categoryFolder = path.join(fullPath, "categories", type)
  const categoryFile = path.join(categoryFolder, `${type}.html`)

  return res.sendFile(categoryFile)
})

app.get("/:type/category/:category", async (req, res) => {
  const { category, type } = req.params

  const categoryFolder = path.join(fullPath, "categories", type, category)
  const categoryFile = path.join(categoryFolder, `${type}-${category}.html`)

  return res.sendFile(categoryFile)
})

async function checkFileExists(path) {
  try {
    await fs.access(path)
    return true
  } catch (error) {
    return false
  }
}

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(fullPath, "404.html"))
})

app.listen(port, () => {
  let date = new Date()
  // let time = date.toLocaleTimeString()
  let time = date.toLocaleString()
  console.log(`${time} -> Listening on port: ${port}.`)
})
