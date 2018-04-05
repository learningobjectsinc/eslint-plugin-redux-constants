const rule = require('../../lib/rules/redux-constants');

const ruleTester = new (require('eslint')).RuleTester({
  parserOptions: {
    ecmaVersion: 2016,
  },
});

ruleTester.run('redux-constants', rule, {
  valid: [
    { code: "const MY_REDUX_ACTION = 'MY_REDUX_ACTION';" },
    { code: "const MY_MESSAGE = 'hello!';" },
    { code: "const i18nKey = 'KEY_THIS';" },
    { code: "const MY_OWN_LENGTH = 'MY_OWN_LENGTH'.length();" },
  ],

  invalid: [
    {
      code: "const MY_REDUX_ACTION = 'MY_REDXU_ACTION';",
      errors: [{
        message: "action constant mismatch: expected MY_REDUX_ACTION; got MY_REDXU_ACTION"
      }]
    },
    {
      code: "let MY_REDUX_ACTION = 'MY_REDUX_ACTION';",
      errors: [{
        message: "action constant declared with let (use const instead!)"
      }]
    },
    {
      code: "var MY_REDUX_ACTION = 'MY_REDUX_ACTION';",
      errors: [{
        message: "action constant declared with var (use const instead!)"
      }]
    },
  ]
});
