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
        <select class="theme" type="text">
          <img src="https://image.flaticon.com/icons/svg/60/60995.svg" alt="">
          <option hidden disabled selected value>Select Theme</option>
          <option>3024-day</option>
    <option>3024-night</option>
    <option>abcdef</option>
    <option>ambiance</option>
    <option>ayu-dark</option>
    <option>ayu-mirage</option>
    <option>base16-dark</option>
    <option>base16-light</option>
    <option>bespin</option>
    <option>blackboard</option>
    <option>cobalt</option>
    <option>colorforth</option>
    <option>darcula</option>
    <option>dracula</option>
    <option>duotone-dark</option>
    <option>duotone-light</option>
    <option>eclipse</option>
    <option>elegant</option>
    <option>erlang-dark</option>
    <option>gruvbox-dark</option>
    <option>hopscotch</option>
    <option>icecoder</option>
    <option>idea</option>
    <option>isotope</option>
    <option>lesser-dark</option>
    <option>liquibyte</option>
    <option>lucario</option>
    <option>material</option>
    <option>material-darker</option>
    <option>material-palenight</option>
    <option>material-ocean</option>
    <option>mbo</option>
    <option>mdn-like</option>
    <option>midnight</option>
    <option>monokai</option>
    <option>moxer</option>
    <option>neat</option>
    <option>neo</option>
    <option>night</option>
    <option>nord</option>
    <option>oceanic-next</option>
    <option>panda-syntax</option>
    <option>paraiso-dark</option>
    <option>paraiso-light</option>
    <option>pastel-on-dark</option>
    <option>railscasts</option>
    <option>rubyblue</option>
    <option>seti</option>
    <option>shadowfox</option>
    <option>solarized dark</option>
    <option>solarized light</option>
    <option>the-matrix</option>
    <option>tomorrow-night-bright</option>
    <option>tomorrow-night-eighties</option>
    <option>ttcn</option>
    <option>twilight</option>
    <option>vibrant-ink</option>
    <option>xq-dark</option>
    <option>xq-light</option>
    <option>yeti</option>
    <option>yonce</option>
    <option>zenburn</option>
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
    let pre = document.querySelector("pre");
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
    let pre = document.querySelector("pre");
    if (pre.classList.contains("code-insert-initialized") === false) {
      let div = document.createElement("div");
      let html = this.options.html;
      div.innerHTML = html;
      div.classList.add("wysiwyg-code-insert-options");
      let deleteIcon = div.querySelector(".delete-icon");
      let saveIcon = div.querySelector(".save-icon");
      let languageSelection = div.querySelector("select.language");
      let themeSelection = div.querySelector("select.theme");
      themeSelection.onchange = (e) => {
        editor.setOption("theme", e.target.options[e.target.selectedIndex].textContent);
      };
      deleteIcon.onclick = () => {
        document.body.removeChild(div);
        pre.innerHTML = editor.getValue();
        pre.classList.remove("code-insert-initialized");
        pre.classList.remove("wysiwyg-code-insert");
        pre.parentElement.removeChild(pre);
      };
      saveIcon.onclick = () => {
        document.body.removeChild(div);
        pre.innerHTML = editor.getValue();
        pre.classList.remove("code-insert-initialized");
        pre.classList.remove("wysiwyg-code-insert");
      };
      var rect = pre.getBoundingClientRect();
      var docEl = document.documentElement;

      var rectTop = rect.top + window.pageYOffset - docEl.clientTop;
      document.body.appendChild(div);
      div.style.top = pre.clientHeight + rectTop + "px";

      const handleChange = () => {
        let preNew = document.querySelector("pre");
        var docEl = document.documentElement;
        var rectTop = rect.top + window.pageYOffset - docEl.clientTop;
        setTimeout(() => {
          div.style.top = preNew.clientHeight + rectTop + "px";
        }, 1);
      };

      editor.on("change", function () {
        handleChange();
      });
      editor.on("optionChange", function () {
        handleChange();
      });
    }
  },
};
