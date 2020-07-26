let wysiwygCodeInsert = {
  currentCodeMirrorInstance: null,
  currentPre: null,
  currentToolbar: null,
  defaults: {
    mode: "xml",
    theme: "ayu-mirage",
    themeURL: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.56.0/theme/__themeName__.css",
    modeURL: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.56.0/mode/__mode__/__mode__.min.js",
  },
  options: {
    languageTypes: ["html", , "xml", "less", "css", "scss", "sass", "typescript", "javascript", "sql", "php", "python", "ruby", "java"],
    themes: [
      "3024-day",
      "3024-night",
      "abcdef",
      "ambiance",
      "ayu-dark",
      "ayu-mirage",
      "base16-dark",
      "base16-light",
      "bespin",
      "blackboard",
      "cobalt",
      "colorforth",
      "darcula",
      "dracula",
      "duotone-dark",
      "duotone-light",
      "eclipse",
      "elegant",
      "erlang-dark",
      "gruvbox-dark",
      "hopscotch",
      "icecoder",
      "idea",
      "isotope",
      "lesser-dark",
      "liquibyte",
      "lucario",
      "material",
      "material-darker",
      "material-palenight",
      "material-ocean",
      "mbo",
      "mdn-like",
      "midnight",
      "monokai",
      "moxer",
      "neat",
      "neo",
      "night",
      "nord",
      "oceanic-next",
      "panda-syntax",
      "paraiso-dark",
      "paraiso-light",
      "pastel-on-dark",
      "railscasts",
      "rubyblue",
      "seti",
      "shadowfox",
      "solarized dark",
      "solarized light",
      "the-matrix",
      "tomorrow-night-bright",
      "tomorrow-night-eighties",
      "ttcn",
      "twilight",
      "vibrant-ink",
      "xq-dark",
      "xq-light",
      "yeti",
      "yonce",
      "zenburn",
    ],
    html() {
      return `<div class="options-container">
    <div class="select-language">
      <div class="input-dropdown">
        <select class="language" type="text">
          <img src="https://image.flaticon.com/icons/svg/60/60995.svg" alt="" />
          ${this.languageTypes.map((c) => {
            return `<option>${c}</option>`;
          })}
        </select>
      </div>  
    </div>
  
    <div class="select-language">
      <div class="input-dropdown">
        <select class="theme" type="text">
          <img src="https://image.flaticon.com/icons/svg/60/60995.svg" alt="" />
          <option hidden disabled selected value>Select Theme</option>
          ${this.themes.map((c) => {
            return `<option>${c}</option>`;
          })}
        </select>
      </div>
    </div>
    <div class="actions">
      <div class="delete-icon">
        <img class="delete" src="https://image.flaticon.com/icons/svg/3159/3159662.svg" alt="" />
      </div>
      <div class="save-icon">
        <img class="delete" src="https://image.flaticon.com/icons/svg/60/60731.svg" alt="" />
      </div>
    </div>
  </div>
  
  `;
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
    let pre = [...document.querySelectorAll(el)];
    pre.forEach((preEl) => {
      preEl.onclick = () => {
        _this.generateCodeMirror(preEl);
      };
    });
  },
  handleThemeChange(theme, editor, pre) {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = this.defaults.themeURL.replace("__themeName__", theme);
    link.classList.add("wysiwygCodeInsert-theme-file");
    link.onload = () => {
      editor.setOption("theme", theme);
    };

    document.head.append(link);
  },
  handleModeChange(mode, editor) {
    let script = document.createElement("script");
    script.src = this.defaults.modeURL.replace("__mode__", mode);
    script.src = script.src.replace("__mode__", mode);
    script.onload = () => {
      editor.setOption("mode", mode);
    };
    document.head.append(script);
  },
  generateCodeMirror(el) {
    let pre = el;
    if (pre.classList.contains("code-insert-initialized") === false) {
      let val = pre.innerHTML;
      pre.innerHTML = "";
      editor = CodeMirror(pre, {
        mode: "javascript",
        theme: "ayu-mirage",
        height: "200px",
        lineNumbers: true,
        extraKeys: { "Ctrl-Space": "autocomplete" },
        value: val,
      });
      // editor.setSize("auto", "auto");
      this.generateDropdown(editor, el);
      this.handleThemeChange("ayu-mirage", editor);
      this.handleModeChange("javascript", editor);
      pre.classList.add("code-insert-initialized");
      pre.classList.add("wysiwyg-code-insert");
      this.currentCodeMirrorInstance = editor;
      this.currentPre = pre;
    }
  },
  handleSave(div, editor, pre) {
    document.body.removeChild(div);
    pre.innerHTML = editor.getValue();
    pre.classList.remove("code-insert-initialized");
    pre.classList.remove("wysiwyg-code-insert");
    pre.style.removeProperty("margin-bottom");
  },
  generateDropdown(editor, el) {
    let _this = this;
    let pre = el;
    if (pre.classList.contains("code-insert-initialized") === false) {
      let div = document.createElement("div");
      let html = this.options.html();
      div.innerHTML = html;
      div.classList.add("wysiwyg-code-insert-options");
      let deleteIcon = div.querySelector(".delete-icon");
      let saveIcon = div.querySelector(".save-icon");
      let languageSelection = div.querySelector("select.language");
      let themeSelection = div.querySelector("select.theme");
      languageSelection.onchange = (e) => {
        let value = e.target.options[e.target.selectedIndex].textContent;
        _this.handleModeChange(value, editor, pre);
      };
      themeSelection.onchange = (e) => {
        let value = e.target.options[e.target.selectedIndex].textContent;
        _this.handleThemeChange(value, editor, pre);
      };
      deleteIcon.onclick = () => {
        document.body.removeChild(div);
        pre.innerHTML = editor.getValue();
        pre.classList.remove("code-insert-initialized");
        pre.classList.remove("wysiwyg-code-insert");
        pre.parentElement.removeChild(pre);
        pre.style.marginBottom = "0px";
        pre.style.removeProperty("margin-bottom");
      };
      saveIcon.onclick = () => {
        this.handleSave(div, editor, pre);
      };
      var rect = pre.getBoundingClientRect();
      var docEl = document.documentElement;

      var rectTop = rect.top + window.pageYOffset - docEl.clientTop;
      var rectLeft = rect.left + window.pageXOffset - docEl.clientLeft;
      document.body.appendChild(div);
      div.style.top = pre.clientHeight + rectTop + "px";
      div.style.left = rectLeft + "px";
      pre.style.marginBottom = div.clientHeight + 10 + "px";
      this.currentToolbar = div;

      const handleChange = () => {
        let preNew = el;
        var docEl = document.documentElement;
        var rectTop = rect.top + window.pageYOffset - docEl.clientTop;
        setTimeout(() => {
          div.style.top = preNew.clientHeight + rectTop + "px";
          pre.style.marginBottom = div.clientHeight + 10 + "px";
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
