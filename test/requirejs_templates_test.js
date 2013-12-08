'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.requirejs_templates = {
  
  setUp: function(done) {
    done();
  },

  default: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/test/fixtures/scripts/default/view.js');
    var expected = grunt.file.read('test/expected/default.js');
    test.equal(actual, expected, 'should convert one file with one template file.');

    test.done();
  },

  more_templates: function(test){

    var actual = grunt.file.read('tmp/test/fixtures/scripts/more_templates/view.js');
    var expected = grunt.file.read('test/expected/more_templates.js');
    test.equal(actual, expected, 'should convert one file with two or more template files.');

    test.done();

  },

  more_files: function(test){

    var actual_1 = grunt.file.read('tmp/test/fixtures/scripts/more_files/view1.js');
    var expected_1 = grunt.file.read('test/expected/more_files_1.js');

    var actual_2 = grunt.file.read('tmp/test/fixtures/scripts/more_files/view2.js');
    var expected_2 = grunt.file.read('test/expected/more_files_2.js');

    test.equal(actual_1, expected_1, 'should convert one file with one template file and...');
    test.equal(actual_2, expected_2, 'should other file with one template file and.');

    test.done();

  }

};
