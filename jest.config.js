module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Allow to use 'app/' import in tests
  modulePaths: ['src'],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|png)$': 'jest-css-modules-transform',
  },

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // coverage information will be collected for it even if no tests exist for this file
  // collectCoverageFrom: ['src/**/*.js'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['html'],

  // Indicates whether each individual test should be reported during the run
  verbose: false,

  // Avoid to print errors in console during test
  silent: true,
};