import { fileURLToPath } from "url"
import path from "path"
import fs from "fs/promises"
// database
import newDatabase from "./public/data/Database2.js"
const db = newDatabase()

// templates
import { Layout } from "./public/layout/Layout.js"
import { MovieTemplate } from "./templates/MovieTemplate.js"
import { TvSeriesTemplate } from "./templates/TvSeriesTemplate.js"
import { BookTemplate } from "./templates/BookTemplate.js"

const __fileName = fileURLToPath(import.meta.url)
const __folderName = path.dirname(__fileName)

const fullPath = path.join(__folderName, "public/pages", "output")

const d = db.all.lists // an object with all db


async function init() {
  for (let type in d) {
    for (let entity of d[type]()) {
      const dynamicPath = path.join(fullPath, type, "dynamic")
      const dynamicFolderPath = path.join(dynamicPath, `${type}-${entity.id}`)

      // get data from review file
      const reviewPath = path.join(
        dynamicFolderPath,
        `${type}-review-${entity.id}.html`,
      )
      const reviewTemplate = await fs.readFile(reviewPath, "utf-8")

      // selecting the template based on type [movies, tv-series, books]

      let template = ""
      if (type === "movies") {
        template = MovieTemplate({
          id: entity.id,
          title: entity.title,
          review: reviewTemplate,
        })
      } else if (type === "tv-series") {
        template = TvSeriesTemplate({
          id: entity.id,
          title: entity.title,
          review: reviewTemplate,
        })
      } else if (type === "books") {
        template = BookTemplate({
          id: entity.id,
          title: entity.title,
          review: reviewTemplate,
        })
      }

      const filePath = path.join(dynamicFolderPath, `${type}-${entity.id}.html`)
      await fs.writeFile(
        filePath,
        Layout({ template }, type, entity.title),
        "utf-8",
      )
    }
  }
}

init()
