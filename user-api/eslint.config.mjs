import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: {globals: globals.node}},
  pluginJs.configs.recommended,
  {
    "env": {
      "jest": true,
    },
    "rules": {
      "constructor-super": "error" // Ou "off" se você preferir desativá-la
    }
  }
];
;

