module.exports = {
  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'

  ],

  coverageDirectory: 'coverage',

  roots: [
    '<rootDir>/src'
  ],

  testEnvironment: 'jest-environment-node',

  transform: {
    '.+\\.ts$': 'ts-jest'
  },

  preset: '@shelf/jest-mongodb'
}
