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
    //  './src/Api/JetpackApi.js'
      '!./src/HttpClient.js'
    ],
    thresholds: {
      break: 50
      // ..
    }
  });
};
