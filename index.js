module.exports = {
  rules: {
    'redux-constants/redux-constants': require('./lib/rules/redux-constants'),
  },
  configs: {
    recommended: {
      rules: {
        'redux-constants/redux-constants': 2,
      },
    },
  },
};

