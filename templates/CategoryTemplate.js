/**
 * @param {{ type: string; list: []; }} param0
 * @returns {string}
 */
function CategoryTemplate({ type, list }) {
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
    <a href="/${type}/review/${item.id}">${item.title}</a>
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

export { CategoryTemplate }
