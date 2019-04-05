module.exports = {
  preset: "jest-expo",
  moduleFileExtensions: ['js','jsx','json', 'ts', 'tsx'],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  testMatch: [
    "**/*.test.ts?(x)"
  ],
  snapshotSerializers: [
    "enzyme-to-json/serializer"
  ],
  setupFilesAfterEnv: [
    "<rootDir>test/setupTests.ts"
  ],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|react-clone-referenced-element|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|sentry-expo|native-base))"
  ]
};