/**
 * @param {{ type: string; list: []; }} param0
 * @returns {string}
 */
function CategoryTypeTemplate({ type, list }) {
  return /*html*/ `

<div class="category">
<div class="title">
<div class="container">
<ul>
${list.length > 0 && list
      ? list
        .map(
          (item) => /*html*/ ` 
    <li>
    <a href="/${type}/category/${item}">${item}</a>
    </li>`,
        )
        .join("")
      : ""
    }
</ul>
</div>
</div>
</div>
    `
}

export { CategoryTypeTemplate }
