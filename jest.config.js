
const jestConfig = {
  roots: ['<rootDir>'],
  testEnvironment: "node",
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/inner-types.ts',
  ],
  setupFilesAfterEnv: [
  ],
  testMatch: [
    '<rootDir>/test/**/*.ts',
    // '<rootDir>/test/api.ts',
    // '<rootDir>/test/array-base/map.ts',
    // '<rootDir>/test/array-base/copyWithin.ts',
    // '<rootDir>/test/array-base/fill.ts',
    // '<rootDir>/test/array-base/shift.ts',
    // '<rootDir>/test/array-base/sort.ts',
    // '<rootDir>/test/array-base/forEach.ts',
    // '<rootDir>/test/array-other/object-item.ts',
    // '<rootDir>/test/array-other/object-item-nested.ts',
    // '<rootDir>/test/array-other/object-item-2.ts',
    // '<rootDir>/test/array-other/object-item-3.ts',
    // '<rootDir>/test/map-other/case-nested-object.ts',
    // '<rootDir>/test/map-other/case1.ts',
    // '<rootDir>/test/map-base/get.ts',
    // '<rootDir>/test/map-base/forEach.ts',
    // '<rootDir>/test/set-base/forEach.ts',
    // '<rootDir>/test/set-other/update-object-item.ts',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/test/_util.ts',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/fileTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
  ],
  modulePaths: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'ts', 'json'],
  collectCoverage: true,
};

const { testMatch } = process.env;
if (testMatch) {
  console.log('------ found customized testMatch, start compute ------');
  let prefixedTestMatch = testMatch;

  // 改写前缀
  if (!testMatch.startsWith('<rootDir>')) {
    if (testMatch.startsWith('/')) prefixedTestMatch = `<rootDir>${testMatch}`;
    else prefixedTestMatch = `<rootDir>/${testMatch}`;
  }
  jestConfig.testMatch = [prefixedTestMatch];
  console.log(`computed testMatch: ${JSON.stringify(jestConfig.testMatch)}`);
} else {
  console.log('Start loading the jest configuration file. If it is executed locally and you want to narrow the scope of a single test, you can add the testmatch prefix to execute it, such as');
  // testMatch='test/yyy.ts' npm run test
  console.log('testMatch=\'test/yyy.ts\' npm run test');
}

module.exports = jestConfig;
