/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@minecraft/server$": "<rootDir>/__mocks__/@minecraft/server.js"
  }
};
