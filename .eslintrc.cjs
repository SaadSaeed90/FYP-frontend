module.exports = {
    root: true,
    env: {
      browser: true,
      es2021: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: ["react", "react-hooks", "react-refresh"],
    rules: {
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-unused-vars": "warn",
    },
    ignorePatterns: ["dist"],
  };
  