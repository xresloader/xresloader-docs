const fs = require("node:fs");
const path = require("node:path");

module.exports = function localePreference() {
  return {
    name: "locale-preference",
    injectHtmlTags() {
      return {
        headTags: [{
          tagName: "script",
          innerHTML: fs.readFileSync(
            path.join(__dirname, "../static/js/locale-preference.js"), "utf8",
          ),
        }],
      };
    },
  };
};
