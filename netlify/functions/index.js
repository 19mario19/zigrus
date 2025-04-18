//netlify
import serverless from "serverless-http"
// main
import express from "express"
import path, { join } from "path"
import fs from "fs/promises"
// personal
import { TYPE } from "../../public/types/types.js"
import newDatabase from "../../public/data/Database2.js"
import { Layout } from "../../public/layout/Layout.js"

import dotenv from "dotenv"
dotenv.config()

const application = express()
const router = express.Router()

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT

const app = NODE_ENV === "development" ? application : router

console.log("process: ", process.cwd())

const __rootFolder = process.cwd()

const fullPath = path.join(
  __rootFolder,
  NODE_ENV === "development" ? "public" : " ",
  "pages",
  "output",
)

app.use(express.static("public"))
app.use("/templates", express.static(path.join(__rootFolder, "templates")))

app.use((req, _, next) => {
  const route = req.method
  const url = req.originalUrl

  console.log(route, "-", `[${url}]`)

  next()
})

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

if (NODE_ENV === "development") {
  app.listen(PORT, () => {
    let date = new Date()
    // let time = date.toLocaleTimeString()
    let time = date.toLocaleString()
    console.log(`${time} -> Listening on: localhost:${PORT}.`)
  })
}

app.use("/.netlify/functions/server", router)

const handler = serverless(app)

export { handler }
