let wysiwygCodeInsert = {
  languageTypes: {
    xml: {
      html: "html",
      xml: "xml",
    },
    css: {
      less: "less",
      css: "css",
      scss: "scss",
      sass: "sass",
    },
    js: {
      typescript: "typescript",
      javascript: "javascript",
    },
    sql: {
      sql: "sql",
    },
    php: {
      php: "php",
    },
    python: {
      python: "python",
    },
    ruby: {
      ruby: "ruby",
    },
    java: {
      java: "java",
    },
  },
  codeMirrorFiles: {
    css: {
      main: '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.56.0/codemirror.min.css" />',
    },
    js: {
      main: '<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.56.0/codemirror.min.js"></script>',
    },
  },
  init(el) {
    let _this = this;
    let pre = document.querySelector(el)
    // document.head.append(this.codeMirrorFiles.css.main)
    // document.head.append(this.codeMirrorFiles.js.main)
    // document.querySelector(el).append(pre);
    editor = CodeMirror(document.querySelector("pre"), {
      mode: "xml",
      theme: "ayu-mirage",
      height: "200px",
      extraKeys: { "Ctrl-Space": "autocomplete" },
      value: "<button>Click Me</button>",
    });
    editor.setSize("auto", "auto");
    pre.onclick = () => {
      _this.generateDropdown();
    };
  },
  generateDropdown() {
    alert("will generate dropdown");
  },
};
