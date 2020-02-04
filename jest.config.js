module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>/src/__tests__/setup.js'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/src/__tests__/setup.js',
    '<rootDir>/src/index.js',
    '<rootDir>/src/serviceWorker.js',
    '<rootDir>[/\\\\](build|docs|node_modules|scripts|dist)[/\\\\]'
  ]
};
