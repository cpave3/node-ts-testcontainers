module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|js)?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[t]sx?$",
};
