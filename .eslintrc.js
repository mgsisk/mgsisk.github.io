/* eslint-env node */

module.exports = {
  parserOptions: {
    ecmaVersion: 9,
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
    },
  },
  extends: ['eslint:recommended'],
  rules: {
    // ----- Possible Errors ---------------------------------------------------

    'for-direction': 'error',
    'getter-return': ['error', {allowImplicit: true}],
    'no-await-in-loop': 'error',
    'no-extra-parens': 'error',
    'no-prototype-builtins': 'error',
    'no-template-curly-in-string': 'error',
    'valid-jsdoc': ['error', {requireReturnDescription: false}],

    // ----- Best Practices ----------------------------------------------------

    'accessor-pairs': 'error',
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    // 'class-methods-use-this': 'error',
    complexity: ['error', 8],
    // 'consistent-return': 'error',
    curly: 'error',
    'default-case': 'error',
    'dot-location': ['error', 'property'],
    'dot-notation': 'error',
    eqeqeq: 'error',
    'guard-for-in': 'error',
    'no-alert': 'error',
    'no-caller': 'error',
    'no-div-regex': 'error',
    'no-else-return': 'error',
    'no-empty-function': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-floating-decimal': 'error',
    'no-implicit-coercion': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-invalid-this': 'error',
    'no-iterator': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    // 'no-magic-numbers': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    // 'no-param-reassign': 'error',
    'no-proto': 'error',
    // 'no-restricted-properties': [],
    'no-return-assign': ['error', 'always'],
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unused-expressions': [
      'error', {
        allowShortCircuit: true,
        allowTaggedTemplates: true,
      },
    ],
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'no-warning-comments': 'error',
    'no-with': 'error',
    'prefer-promise-reject-errors': 'error',
    radix: ['error', 'as-needed'],
    'require-await': 'error',
    'vars-on-top': 'error',
    'wrap-iife': ['error', 'outside'],
    yoda: ['error', 'never'],

    // ----- Strict Mode -------------------------------------------------------

    // 'strict': 'error',

    // ----- Variables ---------------------------------------------------------

    'init-declarations': ['error', 'always'],
    'no-catch-shadow': 'error',
    'no-label-var': 'error',
    // 'no-restricted-globals': [],
    'no-shadow': 'error',
    'no-shadow-restricted-names': 'error',
    'no-undef-init': 'error',
    'no-undefined': 'error',
    'no-use-before-define': ['error', 'nofunc'],

    // ----- Node.js and CommonJS ----------------------------------------------

    'callback-return': 'error',
    // 'global-require': 'error',
    'handle-callback-err': 'error',
    'no-buffer-constructor': 'error',
    'no-mixed-requires': ['error', {allowCall: true}],
    'no-new-require': 'error',
    'no-path-concat': 'error',
    'no-process-env': 'error',
    'no-process-exit': 'error',
    // 'no-restricted-modules': [],
    'no-sync': 'error',

    // ----- Stylistic Issues --------------------------------------------------

    'array-bracket-newline': ['error', 'consistent'],
    'array-bracket-spacing': 'error',
    // 'array-element-newline': ['error', {multiline: true}],
    'block-spacing': ['error', 'never'],
    'brace-style': 'error',
    camelcase: 'error',
    'capitalized-comments': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': 'error',
    'consistent-this': ['error', 'self'],
    'eol-last': 'error',
    'func-call-spacing': 'error',
    'func-name-matching': 'error',
    'func-names': ['error', 'as-needed'],
    'func-style': ['error', 'declaration'],
    'function-paren-newline': 'error',
    // 'id-blacklist': [],
    'id-length': ['error', {exceptions: ['i', 'n', 'x']}],
    // 'id-match': [],
    'implicit-arrow-linebreak': 'error',
    indent: ['error', 2, {SwitchCase: 1}],
    'jsx-quotes': 'error',
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    // 'line-comment-position': 'error',
    'linebreak-style': 'error',
    'lines-around-comment': 'error',
    'lines-between-class-members': 'error',
    'max-depth': 'error',
    'max-len': [
      'error', {
        code: 120,
        tabWidth: 2,
        ignoreRegExpLiterals: true,
        ignoreTrailingComments: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
      },
    ],
    'max-lines': [
      'error', {
        max: 320,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'max-nested-callbacks': 'error',
    'max-params': ['error', {max: 8}],
    'max-statements': ['error', 16],
    'max-statements-per-line': 'error',
    // 'multiline-comment-style': 'error',
    'multiline-ternary': ['error', 'always-multiline'],
    'new-cap': 'error',
    // 'new-parens': 'error',
    'newline-per-chained-call': 'error',
    'no-array-constructor': 'error',
    'no-bitwise': 'error',
    // 'no-continue': 'error',
    // 'no-inline-comments': 'error',
    'no-lonely-if': 'error',
    // 'no-mixed-operators': 'error',
    'no-multi-assign': 'error',
    'no-multiple-empty-lines': 'error',
    'no-negated-condition': 'error',
    'no-nested-ternary': 'error',
    'no-new-object': 'error',
    'no-plusplus': [
      'error', {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-restricted-syntax': 'error',
    'no-tabs': 'error',
    'no-ternary': 'error',
    'no-trailing-spaces': 'error',
    'no-underscore-dangle': 'error',
    'no-unneeded-ternary': 'error',
    'no-whitespace-before-property': 'error',
    'nonblock-statement-body-position': 'error',
    'object-curly-newline': ['error', {consistent: true}],
    'object-curly-spacing': 'error',
    'object-property-newline': 'error',
    'one-var': [
      'error', {
        initialized: 'never',
        uninitialized: 'always',
      },
    ],
    'one-var-declaration-per-line': 'error',
    'operator-assignment': 'error',
    'operator-linebreak': ['error', 'before'],
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': [
      'error', {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      }, {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*',
      }, {
        blankLine: 'always',
        prev: 'directive',
        next: '*',
      }, {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      }, {
        blankLine: 'any',
        prev: 'directive',
        next: 'directive',
      },
    ],
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single', {avoidEscape: true}],
    'require-jsdoc': [
      'error', {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
        },
      },
    ],
    semi: ['error', 'never'],
    'semi-spacing': 'error',
    'semi-style': 'error',
    // 'sort-keys': ['error', 'asc', {natural: true}],
    'sort-vars': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': 'error',
    'switch-colon-spacing': 'error',
    'template-tag-spacing': 'error',
    'unicode-bom': 'error',
    'wrap-regex': 'error',

    // ----- ECMAScript 6 ------------------------------------------------------

    'arrow-body-style': 'error',
    'arrow-parens': ['error', 'as-needed', {requireForBlockBody: true}],
    'arrow-spacing': [
      'error', {
        before: false,
        after: true,
      },
    ],
    'generator-star-spacing': 'error',
    'no-confusing-arrow': 'error',
    'no-duplicate-imports': 'error',
    // 'no-restricted-imports': [],
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    // 'prefer-destructuring': 'error',
    'prefer-numeric-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'rest-spread-spacing': 'error',
    'sort-imports': 'error',
    'symbol-description': 'error',
    'template-curly-spacing': 'error',
    'yield-star-spacing': 'error',
  },
}
