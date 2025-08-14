import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "@/hooks/use-toast", message: "Use notify from src/lib/notify instead of importing use-toast directly." },
            { name: "@/components/ui/use-toast", message: "Use notify from src/lib/notify instead of importing toast directly." },
            { name: "@/components/ui/toast", message: "Use notify from src/lib/notify. Toast UI primitives are internal." }
          ]
        }
      ],
    },
  },
  {
    files: [
      "src/lib/notify.ts",
      "src/components/ui/toaster.tsx",
      "src/hooks/use-toast.ts",
      "src/components/ui/use-toast.ts",
      "src/components/ui/toast.tsx"
    ],
    rules: {
      "no-restricted-imports": "off"
    }
  }
);