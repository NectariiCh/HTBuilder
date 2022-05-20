 const builder = {
  buildPage: (
    title,
    headPre,
    deviceWidth,
    initialScale,
    favicon,
    bodyStructure,
    bodyAttr,
    stylesheet,
    script,
    headAft,
    err
  ) => {
    let page;
    try {
      page = `
    <head>
      ${headPre}
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=${deviceWidth}, initial-scale=${initialScale}">
      <title>${title}</title>
      <link rel="icon" href="${favicon}"/>
      <link rel="stylesheet" href="${stylesheet}"/>
      <script src="${script}"></script>
      ${headAft}
  </head>
  <body ${bodyAttr}>
    ${bodyStructure}
  </body>`;
    } catch (error) {
      console.warn("Error occured at buildPage() in JSPageBuild: ", error);
      if (err) {
        return 4.2;
      }
      return 3;
    }
    if (err) {
      return 4;
    }
    return page;
  },
  openPage: (page) => {
    document.getElementsByTagName("html")[0].innerHTML = page.toString();
  },
  createElement: (name, value, attr, child) => {
    let attrc;
    if (typeof attr === "string") {
      attrc = attr.toString();
    } else if (typeof attr === "object") {
      attrc = attr.join(" ");
    } else {
      attrc = "";
    }
    // Type string | Array<string> is not assignable to type string
    return `<${name} ${attrc}>${child ? child : ""}${value}</${name}>`;
  },

  createNonValueElement: (name, attr) => {
    let attrc;
    if (typeof attr === "string") {
      attrc = attr.toString();
    } else if (typeof attr === "object") {
      attrc = attr.join(" ");
    } else {
      attrc = "";
    }
    // Type string | Array<string> is not assignable to type string
    return `<${name} ${attrc}/>`;
  },

  buildBody: (elements) => {
    return elements.join("");
  },
};
builder.exports;

window.addEventListener("load", () => {
  build();
})