module.exports = function(config) {
  config.set({
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["html", "clear-text", "progress", "dashboard"],
    testRunner: "jest",
    transpilers: [],
    coverageAnalysis: "off",
    files: [
      'src/**/*.js',
      '!./src/HttpClient.js' //Mutation tests not necessary for this file
    ]
  });
};
