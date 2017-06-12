var colors = require('colors');

var tdoc = require('../src/tdoc.js');
    loadConfig = require('../src/utils/loadConfig.js');

module.exports = function(grunt) {
    grunt.registerMultiTask('tdoc', 'tdoc Builder', function() {
        var cwd = process.cwd(),
            data = this.data || {},
            done = this.async();
        loadConfig(cwd, function(conf) {
            tdoc.build(cwd, conf ? Object.assign(conf, data) : data);
            done();
        });
    });
};
