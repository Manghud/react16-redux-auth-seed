module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "react-app",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
      "comma-dangle": ["error", "never"],
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          "components": ["Link"],
          "specialLink": ["hrefLeft", "hrefRight"],
          "aspects": ["invalidHref"]
        }
      ],
      "indent": [
          "error",
          2
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "always"
      ],
      "no-multi-spaces": ["error"],
      "no-trailing-spaces": ["error"],
      "object-curly-spacing": ["error", "always"]
    }
};