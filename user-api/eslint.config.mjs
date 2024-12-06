import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("google"), {
    languageOptions: {
        globals: {
            ...globals.commonjs,
            ...globals.node,
        },

        ecmaVersion: 13,
        sourceType: "commonjs",
    },

    rules: {
        "max-len": ["error", {
            code: 90,
        }],
        'new-cap': ['error', {
            newIsCap: true,  // Permite que funções com nome iniciando com maiúscula possam ser chamadas com "new"
            capIsNew: false, // Impede que funções com nome minúsculo sejam tratadas como construtores
        }]
    },
}];