module.exports = {
  testEnvironment: 'jest-fixed-jsdom',
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  moduleNameMapper: {
    "^axios$": "jest-mock-axios",
    "\\.(css|scss|sass)$": "identity-obj-proxy" 
  },
  transformIgnorePatterns: ["node_modules/(?!(axios)/)"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"]
};
