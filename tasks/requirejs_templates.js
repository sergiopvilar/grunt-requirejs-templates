/*
 * requirejs-templates
 * https://github.com/sergiovilar/grunt-requirejs-templates
 *
 * Copyright (c) 2013 Sérgio Vilar
 * Licensed under the MIT license.
 */

/*jshint evil:true */

'use strict';

module.exports = function(grunt) {

  var fs = require('fs');
  var file = require('file');
  var mkdirp = require('mkdirp');

  function extraiPath(string){

    var quotes = getQuotes(string);
    var arr = string.split(quotes);
    return arr[1];

  }

  function getQuotes(string){
    
    var singlequotes = false;
    if(string.indexOf("'") > -1){
      singlequotes = true;
    }else if(string.indexOf('"') > -1){
      singlequotes = false;
    }

    var quotes = '"';
    if(singlequotes){
      quotes = "'";
    }

    return quotes;

  }

  function removeBracketsAndQuotes(string){

    var regex = new RegExp('"', 'g');

    string = string.replace("[","");
    string = string.replace("]","");
    string = string.replace(regex,"");
    string = string.replace(/\\n/g,"\n");

    return string;

  }

  grunt.registerMultiTask('requirejs_templates', 'A plugin to insert the content of template files like underscore, handlebars to variables into the javascript code', function() {

    try{

      var options = this.data.options;    
  
      // Lê os arquivos 
      file.walkSync(options.appDir + '/' + options.scripts, function(path, dirPath, dirs, files){   

        for(var u in dirs){
          
          var data = fs.readFileSync(process.cwd() + '/' + path + '/' + dirs[u], 'utf8');   

          if(data.indexOf('text!' + options.templates) > -1){

            var defineHeader_array1 = data.split('define([');
            var defineHeader_array2 = defineHeader_array1[1].split('{');

            var defineHeader = 'define([' + defineHeader_array2[0] + '{';
            var newDefineHeader = defineHeader;

            var templatesList = eval("[" + defineHeader_array2[0].trim().split(']')[0] + "]");            
            
            var variables = defineHeader_array2[0].split(']')[1].split('(')[1].split(')')[0];
            var requires = defineHeader_array2[0].trim().split(']')[0];

            var variablesList = variables.split(', ');

            var templates = [];
            var require_files = [];
            var arr = requires.split(',');
            for(var i in arr){
              require_files.push(arr[i]);
              if(arr[i].indexOf('text!' + options.templates) > -1){
                templates.push(arr[i].trim());                
              }
            }

            for(var w in templates){

              var templateFilePath = extraiPath(templates[w]).replace('text!' + options.templates, options.appDir + '/' + options.templates);              
              var templateData = fs.readFileSync(process.cwd() + '/' + templateFilePath, 'utf8');
              templateData = templateData.replace(/\n/g, '').trim();

              var index;
              for(var z in templatesList){
                if(templatesList[z] === extraiPath(templates[w])){
                  index = z;
                }
              }

              var templateContent = "\nvar "+variablesList[index] + " = '" + templateData + "';";

              variablesList.splice(index, 1);
              require_files.splice(index, 1);

              newDefineHeader = newDefineHeader.replace(requires, removeBracketsAndQuotes(JSON.stringify(require_files)));
              newDefineHeader = newDefineHeader.replace(variables, removeBracketsAndQuotes(JSON.stringify(variablesList)));

              newDefineHeader += templateContent; 
              
            }

            var newFileContent = data.replace(defineHeader, newDefineHeader);   

            if(options.output){
          
              mkdirp.sync(process.cwd() + '/' + options.output + '/' + path);

              fs.writeFileSync(process.cwd() + '/' + options.output + '/' + path + '/' + dirs[u], newFileContent, 'utf8');
              
            }else{
              fs.writeFileSync(process.cwd() + '/' + path + '/' + dirs[u], newFileContent, 'utf8');            
            }         
            
                  
          }

        }      

      });

    }catch(e){
      grunt.log.writeln("Error: "+e.message);
      console.log(e.stack);
    }      

  });

};