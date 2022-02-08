/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@/router': '"<rootDir>/src/router',
    '@/api//(.*)': '<rootDir>/src/api//$1',
    '@/libs/(.*)': '<rootDir>/src/router/$1',
    '@/prisma/(.*)': '<rootDir>/src/libs/prisma/$1',
    '@/lib/(.*)': '<rootDir>/src/ibs/lib/$1',
  },
}
