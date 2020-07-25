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
  options: {
    html: `<div class="options-container">
    <div class="select-language">
      <div class="input-dropdown">
        <select class="language" type="text">
  
          <img src="https://image.flaticon.com/icons/svg/60/60995.svg" alt="">
  
          <option hidden disabled selected value>Select Language</option>
          <option value="">HTML</option>
          <option value="">Less</option>
          <option value="">CSS</option>
          <option value="">Python</option>
          <option value="">JavaScript</option>
        </select>
      </div>
    </div>
  
    <div class="select-language">
      <div class="input-dropdown">
        <select class="language" type="text">
          <img src="https://image.flaticon.com/icons/svg/60/60995.svg" alt="">
          <option hidden disabled selected value>Select Theme</option>
          <option value="">HTML</option>
          <option value="">Less</option>
          <option value="">CSS</option>
          <option value="">Python</option>
          <option value="">JavaScript</option>
        </select>
      </div>
    </div>
    <div class="actions">
      <div class="delete-icon">
        <img class="delete" src="https://image.flaticon.com/icons/svg/3159/3159662.svg" alt="">
      </div>
      <div class="save-icon">
        <img class="delete" src="https://image.flaticon.com/icons/svg/60/60731.svg" alt="">
      </div>
    </div>
  </div>
  `,
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

    let pre = document.querySelector(el);
    pre.onclick = () => {
      _this.generateCodeMirror();
    };
  },
  generateCodeMirror() {
    if (document.querySelector("pre").classList.contains("code-insert-initialized") === false) {
      let val = document.querySelector("pre").innerHTML;
      document.querySelector("pre").innerHTML = "";
      editor = CodeMirror(document.querySelector("pre"), {
        mode: "javascript",
        theme: "ayu-mirage",
        height: "200px",
        lineNumbers: true,
        extraKeys: { "Ctrl-Space": "autocomplete" },
        value: val,
      });
      editor.setSize("auto", "auto");
      this.generateDropdown(editor);
    }
    document.querySelector("pre").classList.add("code-insert-initialized");
    document.querySelector("pre").classList.add("wysiwyg-code-insert");
  },
  generateDropdown(editor) {
    if (document.querySelector("pre").classList.contains("code-insert-initialized") === false) {
      let div = document.createElement("div");
      let html = this.options.html;
      div.innerHTML = html;
      div.classList.add("wysiwyg-code-insert-options");
      let deleteIcon = div.querySelector(".delete-icon");
      let saveIcon = div.querySelector(".save-icon");
      deleteIcon.onclick = () => {
        document.body.removeChild(div);
        document.querySelector("pre").innerHTML = editor.getValue();
        document.querySelector("pre").classList.remove("code-insert-initialized");
        document.querySelector("pre").classList.remove("wysiwyg-code-insert");
        document.querySelector("pre").parentElement.removeChild(document.querySelector("pre"))
      };
      saveIcon.onclick = () => {
        document.body.removeChild(div);
        document.querySelector("pre").innerHTML = editor.getValue();
        document.querySelector("pre").classList.remove("code-insert-initialized");
        document.querySelector("pre").classList.remove("wysiwyg-code-insert");
      }
      document.body.appendChild(div);
    }
  },
};
