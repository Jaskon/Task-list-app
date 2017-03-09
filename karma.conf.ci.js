var baseConfig = require('./karma.conf.js');

module.exports = function (config) {
    // Load base config
    baseConfig(config);

    // Override base config
    config.set({
        singleRun: true,
        colors:    false,
        autoWatch: false,
        reporters: ['progress', 'sonarqubeUnit', 'coverage'],
        preprocessors:    { 
            'app/bundled/app.js':   ['coverage']
        },
        browsers:  ['Chrome'],
        sonarQubeUnitReporter: {
            useBrowserName: false,
            outputDir: 'reports/junit',
            outputFile: 'TESTS-xunit.xml',
        },
        plugins: ['karma-chrome-launcher', 'karma-coverage','karma-jasmine','karma-sonarqube-unit-reporter'],
        coverageReporter: {
            type:   'lcov',
            dir:    'reports',
            subdir: 'coverage'
        }
    });
};