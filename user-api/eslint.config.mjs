import js from "@eslint/js";
import globals from "globals";
import jest from "eslint-plugin-jest";

export default [
  // Configuração base para todos os arquivos
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
      jest
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      ...js.configs.recommended.rules
    }
  },
  // Configuração específica para arquivos de teste
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    rules: {
      ...jest.configs.recommended.rules
    }
  }
];