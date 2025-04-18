function Layout(
  { template = "", header = "", footer = "", script = "" },
  type = "",
  title = "Document",
  nextToTitle = "",
) {
  const fullTitle = nextToTitle ? title + " | " + nextToTitle : title

  let date = new Date()

  // let time = date.toLocaleTimeString()
  let time = date.toLocaleString()

  if (!footer) footer = /*html*/ `<div>Created at: ${time}</div>`

  return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="/navigation/navigation.js" type="module"  defer></script>
        <link rel="stylesheet" href="/global.css">
        <title>${fullTitle} | ${type}</title>
        
        ${header}
    </head>
    <body>
    <div className="container" id="layout" >
    <p><span> ${type} / ${title} </span></p>
    ${template}
    </div>
    <footer>${footer}</footer>
    <script defer>${script}</script>
    </body>
    </html>`
}

export { Layout }
