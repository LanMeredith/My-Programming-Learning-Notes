/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/main.ts
__export(exports, {
  default: () => NukeOrphansPlugin
});
var import_obsidian3 = __toModule(require("obsidian"));

// src/settings.ts
var import_obsidian = __toModule(require("obsidian"));
var DEFAULT_SETTINGS = {
  attachmentsPaths: [],
  trashFolderOverride: "",
  ignorePatterns: [],
  alternativeAttachmentAlg: false
};
var CSS_CLASS_CHECK_PASS = "nuke-orphans-pass";
var CSS_CLASS_CHECK_FAIL = "nuke-orphans-fail";
var NukeOrphansSettingsTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h3", {
      attr: {
        "style": "text-align: center;"
      },
      text: "Nuke Orphans Plugin Settings"
    });
    new import_obsidian.Setting(containerEl).setName("Override Attachment Folder").setDesc("Where attachments are stored").addTextArea((text) => text.setPlaceholder(this.app.vault.config.attachmentFolderPath).setValue(this.plugin.settings.attachmentsPaths.join("\n")).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.attachmentsPaths = value.split("\n").map((x) => x.trim()).filter((x) => x.length > 0);
      yield this.plugin.saveSettings();
    })));
    new import_obsidian.Setting(containerEl).setName("Override Trash Folder").setDesc("Trash folder path, will be created if it does not exist").addText((text) => text.setPlaceholder(this.plugin.shouldUseSystemTrash() ? "system trash" : ".trash/").setValue(this.plugin.settings.trashFolderOverride).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.trashFolderOverride = value;
      yield this.plugin.saveSettings();
    })));
    new import_obsidian.Setting(containerEl).setName("Ignore Patterns").setDesc("Add regex patterns to ignore when searching for orphans").addTextArea((text) => text.setValue(this.plugin.settings.ignorePatterns.join("\n")).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.ignorePatterns = value.split("\n").map((x) => x.trim()).filter((x) => x.length > 0);
      yield this.plugin.saveSettings();
    })));
    new import_obsidian.Setting(containerEl).setName("Test Settings").setDesc("If the path is ignored it will be red, otherwise green").addText((text) => {
      function resetColor() {
        text.inputEl.classList.remove(CSS_CLASS_CHECK_PASS, CSS_CLASS_CHECK_FAIL);
      }
      text.onChange((value) => {
        resetColor();
        if (value.length == 0)
          return;
        if (this.plugin.getIgnoreFilter().test(value))
          text.inputEl.classList.add(CSS_CLASS_CHECK_FAIL);
        else
          text.inputEl.classList.add(CSS_CLASS_CHECK_PASS);
      });
      text.inputEl.addEventListener("focusout", () => resetColor());
      text.inputEl.addEventListener("focusin", () => text.onChanged());
    });
    containerEl.createEl("h3", {
      attr: {
        style: "font-weight: bold"
      },
      text: "Advanced Settings"
    });
    new import_obsidian.Setting(containerEl).setName("Alternative Attachments Finding Algorithm").setDesc("Try enabling this if attachments are not found in subfolders").addToggle((btn) => btn.setValue(this.plugin.settings.alternativeAttachmentAlg).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.alternativeAttachmentAlg = value;
      yield this.plugin.saveSettings();
    })));
  }
};

// src/trash_modal.ts
var import_obsidian2 = __toModule(require("obsidian"));
var path = __toModule(require("path"));
var TrashFilesModal = class extends import_obsidian2.Modal {
  constructor(app, files, trashFolderPath, useSystemTrash) {
    super(app);
    this.files = files;
    this.trashFolderPath = trashFolderPath;
    this.useSystemTrash = useSystemTrash;
  }
  onOpen() {
    let { contentEl, titleEl } = this;
    titleEl.setText("Move " + this.files.length + " files to trash?");
    const div = contentEl.createDiv({
      cls: "trash-modal-file-links"
    });
    this.files.forEach((file) => {
      div.createEl("p", {
        cls: "trash-modal-link",
        text: file.path
      }).addEventListener("click", () => __async(this, null, function* () {
        this.close();
        yield this.app.workspace.activeLeaf.openFile(file);
      }));
    });
    contentEl.createEl("button", {
      cls: ["trash-modal-button"],
      text: "Cancel"
    }).addEventListener("click", () => this.close());
    contentEl.createEl("button", {
      cls: ["trash-modal-button"],
      text: "Copy list to clipboard"
    }).addEventListener("click", () => __async(this, null, function* () {
      yield navigator.clipboard.writeText(this.files.map((file) => file.path).join("\n"));
      new import_obsidian2.Notice("Copied list to clipboard");
    }));
    contentEl.createEl("button", {
      cls: ["mod-cta", "trash-modal-button"],
      text: "Trash"
    }).addEventListener("click", () => __async(this, null, function* () {
      if (this.trashFolderPath.length > 0) {
        if (!(yield this.app.vault.adapter.exists(this.trashFolderPath)))
          yield this.app.vault.createFolder(this.trashFolderPath);
        this.files.forEach((file) => __async(this, null, function* () {
          return yield this.app.fileManager.renameFile(file, path.join(this.trashFolderPath, file.name));
        }));
      } else
        this.files.forEach((file) => __async(this, null, function* () {
          return yield this.app.vault.trash(file, this.useSystemTrash);
        }));
      new import_obsidian2.Notice("Trashed " + this.files.length + " files");
      this.close();
    }));
  }
  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
};

// src/main.ts
var CustomFilter = class {
  constructor(regexes, strings) {
    this.regexes = new Set(regexes.map((x) => RegExp(x)));
    this.strings = new Set(strings);
  }
  test(input) {
    return Array.from(this.regexes).some((x) => x.test(input)) || Array.from(this.strings).some((x) => x === input);
  }
};
var NukeOrphansPlugin = class extends import_obsidian3.Plugin {
  getIgnoreFilter() {
    let strings = [];
    if (this.settings.trashFolderOverride.length > 0)
      strings.push(this.settings.trashFolderOverride);
    return new CustomFilter(this.settings.ignorePatterns, strings);
  }
  shouldUseSystemTrash() {
    switch (this.app.vault.config.trashOption) {
      case "system":
        return true;
      default:
        return false;
    }
  }
  getAttachmentsPaths() {
    if (this.settings.attachmentsPaths.length === 0)
      return [this.app.vault.config.attachmentFolderPath];
    return this.settings.attachmentsPaths;
  }
  isAttachment(file) {
    return this.getAttachmentsPaths().some((element) => {
      console.log(file.path);
      if (element.startsWith("./")) {
        if (this.settings.alternativeAttachmentAlg) {
          let path2 = file.parent;
          while (path2.name !== void 0 && path2.name.length > 0) {
            if (path2.name == element.substring(2))
              return true;
            path2 = path2.parent;
          }
        } else {
          return file.path.startsWith(element.substring(2)) || file.path.contains(element.substring(1) + "/");
        }
      } else {
        if (file.parent.path == element)
          return true;
        if (file.path.startsWith(element))
          return true;
      }
      return false;
    });
  }
  getCanvasLinks() {
    return __async(this, null, function* () {
      let links = new Set();
      yield Promise.all(this.app.vault.getFiles().filter((f) => f.extension === "canvas").map((f) => __async(this, null, function* () {
        const content = yield this.app.vault.read(f);
        try {
          const canvas = JSON.parse(content);
          canvas.nodes.filter((node) => node.type === "file").forEach((node) => links.add(node.file));
        } catch (e) {
          console.error("Error parsing canvas file " + f.path + "\n", e);
        }
        return Promise.resolve();
      })));
      return links;
    });
  }
  getOrphans() {
    return __async(this, null, function* () {
      const links = new Set(Object.values(this.app.metadataCache.resolvedLinks).flatMap((x) => Object.keys(x)));
      const canvasLinks = yield this.getCanvasLinks();
      const filter = this.getIgnoreFilter();
      return this.app.vault.getFiles().filter((file) => {
        return ![
          links.has(file.path),
          canvasLinks.has(file.path),
          filter.test(file.path)
        ].some((x) => x === true);
      });
    });
  }
  trash(files) {
    if (files.length > 0)
      new TrashFilesModal(this.app, files, this.settings.trashFolderOverride, this.shouldUseSystemTrash()).open();
    else
      new import_obsidian3.Notice("No orphaned files have been found");
  }
  onload() {
    return __async(this, null, function* () {
      yield this.loadSettings();
      this.addCommand({
        id: "nuke-orphaned-attachments",
        name: "Trash orphaned attachments",
        callback: () => __async(this, null, function* () {
          new import_obsidian3.Notice("Gathering orphaned attachments..");
          this.trash((yield this.getOrphans()).filter((file) => this.isAttachment(file)));
        })
      });
      this.addCommand({
        id: "nuke-orphaned-notes",
        name: "Trash orphaned notes",
        callback: () => __async(this, null, function* () {
          new import_obsidian3.Notice("Gathering orphaned notes..");
          this.trash((yield this.getOrphans()).filter((file) => file.extension === "md"));
        })
      });
      this.addCommand({
        id: "nuke-orphaned",
        name: "Trash orphaned files",
        callback: () => __async(this, null, function* () {
          new import_obsidian3.Notice("Gathering orphaned files..");
          this.trash(yield this.getOrphans());
        })
      });
      this.addSettingTab(new NukeOrphansSettingsTab(this.app, this));
    });
  }
  onunload() {
  }
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
    });
  }
};

/* nosourcemap */