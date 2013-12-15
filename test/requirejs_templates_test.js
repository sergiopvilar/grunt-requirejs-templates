'use strict';

var grunt = require('grunt');
var requirejs = require('requirejs');
var _ = require('underscore');
var handlebars = require('handlebars');
var ejs = require('ejs');
var dust = require('dustjs-linkedin');

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

  // Tests to check if the file has been processed correctly

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
    test.equal(actual_2, expected_2, 'should other file with one template file.');

    test.done();

  },

  // Tests to check renderization of templates with external libs
  
  render_underscore: function(test){

    // Test the file processing
    var actual = grunt.file.read('tmp/test/fixtures/scripts/render_underscore/view.js');
    var expected = grunt.file.read('test/expected/render_underscore.js');

    test.equal(actual, expected, 'should process a file with a underscore template.');

    // Test the template rendering
    requirejs(['tmp/test/fixtures/scripts/render_underscore/view.js'], function(view){

      var templateData = {
        data: ['item1', 'item2', 'item3']
      };

      var result = _.template(view)(templateData);
      var expected = grunt.file.read('test/expected/engine_expected.html');

      test.equal(result, expected, 'should render a template file with underscore');

      test.done();

    });    

  },
  
  render_handlebars: function(test){

    // Test the file processing
    var actual = grunt.file.read('tmp/test/fixtures/scripts/render_handlebars/view.js');
    var expected = grunt.file.read('test/expected/render_handlebars.js');

    test.equal(actual, expected, 'should process a file with a handlebars template.');

    // Test the template rendering
    requirejs(['tmp/test/fixtures/scripts/render_handlebars/view.js'], function(view){

      var templateData = {
        data: ['item1', 'item2', 'item3']
      };

      var result = handlebars.compile(view)(templateData);
      var expected = grunt.file.read('test/expected/engine_expected.html');

      test.equal(result, expected, 'should render a template file with handlebars');

      test.done();

    });    

  },

  render_ejs: function(test){

    // Test the file processing
    var actual = grunt.file.read('tmp/test/fixtures/scripts/render_ejs/view.js');
    var expected = grunt.file.read('test/expected/render_ejs.js');

    test.equal(actual, expected, 'should process a file with a EJS template.');

    // Test the template rendering
    requirejs(['tmp/test/fixtures/scripts/render_ejs/view.js'], function(view){

      var templateData = {
        data: ['item1', 'item2', 'item3']
      };

      var result = ejs.render(view, templateData);
      var expected = grunt.file.read('test/expected/engine_expected.html');

      test.equal(result, expected, 'should render a template file with EJS');

      test.done();

    });    

  },

  render_dust: function(test){

    // Test the file processing
    var actual = grunt.file.read('tmp/test/fixtures/scripts/render_dust/view.js');
    var expected = grunt.file.read('test/expected/render_dust.js');

    test.equal(actual, expected, 'should process a file with a Dust template.');

    // Test the template rendering
    requirejs(['tmp/test/fixtures/scripts/render_dust/view.js'], function(view){

      var templateData = {
        data: ['item1', 'item2', 'item3']
      };

      var compiled = dust.compile(view, "view");
      dust.loadSource(compiled);

      dust.render("view", templateData, function(err, out){

        if(err){
          throw new Error(err);
        }

        var expected = grunt.file.read('test/expected/engine_expected.html');

        test.equal(out, expected, 'should render a template file with Dust');

        test.done();

      });      

    });    

  }

};
