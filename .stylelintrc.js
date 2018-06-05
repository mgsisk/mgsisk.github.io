/* eslint-env node */

module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    // ----- Possible Errors ---------------------------------------------------

    'font-family-no-missing-generic-family-keyword': null,
    'no-unknown-animations': true,
    'property-no-unknown': [true, {ignoreProperties: ['size']}],
    'unit-no-unknown': [true, {ignoreUnits: ['mfs', 'mlh', 'msu', 'vru']}],

    // ----- Limit Language Features -------------------------------------------

    'at-rule-no-vendor-prefix': true,
    'color-named': 'always-where-possible',
    'declaration-block-no-redundant-longhand-properties': true,
    'declaration-no-important': true,
    'function-url-no-scheme-relative': true,
    'max-nesting-depth': 4,
    'media-feature-name-no-vendor-prefix': true,
    'number-max-precision': 5,
    'property-no-vendor-prefix': true,
    'selector-class-pattern': '[a-z](-[a-z0-9]+)*',
    'selector-max-attribute': 4,
    'selector-max-class': 4,
    'selector-max-combinators': 4,
    'selector-max-compound-selectors': 4,
    'selector-max-id': 0,
    'selector-max-pseudo-class': 4,
    'selector-max-specificity': '0,4,4',
    'selector-max-type': 4,
    'selector-max-universal': 1,
    'selector-nested-pattern': '^&.+',
    'selector-no-vendor-prefix': true,
    'shorthand-property-no-redundant-values': true,
    'time-min-milliseconds': 100,
    'value-no-vendor-prefix': true,
    // 'at-rule-blacklist': [],
    // 'at-rule-blacklist': [],
    // 'at-rule-whitelist': [],
    // 'color-no-hex': true,
    // 'comment-word-blacklist': [],
    // 'custom-media-pattern': '',
    // 'custom-property-pattern': '',
    // 'declaration-property-unit-blacklist': [],
    // 'declaration-property-unit-whitelist': [],
    // 'declaration-property-value-blacklist': [],
    // 'declaration-property-value-whitelist': [],
    // 'font-weight-notation': 'named-where-possible',
    // 'function-blacklist': [],
    // 'function-url-scheme-blacklist': [],
    // 'function-url-scheme-whitelist': [],
    // 'function-whitelist': [],
    // 'media-feature-name-blacklist': [],
    // 'media-feature-name-whitelist': [],
    // 'property-blacklist': [],
    // 'property-whitelist': [],
    // 'selector-attribute-operator-blacklist': [],
    // 'selector-attribute-operator-whitelist': [],
    // 'selector-combinator-blacklist': [],
    // 'selector-combinator-whitelist': [],
    // 'selector-id-pattern': '',
    // 'selector-no-qualifying-type': true,
    // 'selector-pseudo-class-blacklist': [],
    // 'selector-pseudo-class-whitelist': [],
    // 'selector-pseudo-element-blacklist': [],
    // 'selector-pseudo-element-whitelist': [],
    // 'unit-blacklist': [],
    // 'unit-whitelist': [],

    // ----- Stylistic Issues --------------------------------------------------

    'at-rule-name-newline-after': 'always-multi-line',
    'at-rule-semicolon-space-before': 'never',
    'block-no-empty': null,
    'block-opening-brace-newline-before': 'never-single-line',
    'declaration-block-semicolon-newline-before': 'never-multi-line',
    // 'font-family-name-quotes': 'always-where-recommended',
    'function-comma-newline-before': 'never-multi-line',
    // 'function-url-quotes': 'never',
    'max-line-length': [120, {ignorePattern: ['/https?://[0-9,a-z]*.*|data:.+/i']}],
    'media-query-list-comma-newline-before': 'never-multi-line',
    'selector-attribute-quotes': 'always',
    'selector-list-comma-newline-before': 'never-multi-line',
    'selector-list-comma-space-after': 'always-single-line',
    'string-quotes': 'single',
    'value-keyword-case': 'lower',
    'value-list-comma-newline-before': 'never-multi-line',
    // 'block-closing-brace-space-after': 'never-multi-line',
    // 'function-whitespace-after': null,

    // ----- Plugins -----------------------------------------------------------

    'order/properties-alphabetical-order': true,
  },
}
