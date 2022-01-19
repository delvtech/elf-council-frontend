import { Config } from "@jest/types";
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const customJestConfig: Config.InitialOptions = {
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,

  // disabled for now, we should turn on in CI
  // collectCoverage: true,

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // An array of directory names to be searched recursively up from the requiring module's location
  // NOTE: if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  // NOTE: <rootDir> is necessary instead of '.' to avoid errors with circular dependencies in node_modules:
  // https://github.com/ethers-io/ethers.js/discussions/1574
  moduleDirectories: ["node_modules", "<rootDir>"],

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>/src"],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: [
    // This will be needed if we upgreade to jest 27.  here's a GH issue that explains it.
    // https://github.com/prisma/prisma/issues/8558
    // '<rootDir>/jest.env.js',
    "@testing-library/jest-dom/extend-expect",
    "@testing-library/react",
  ],

  // The test environment that will be used for testing
  testEnvironment: "<rootDir>/jest-environment-jsdom.js",

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform",
  },
};

export default customJestConfig;
