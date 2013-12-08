/*
 * requirejs-templates
 * https://github.com/sergiovilar/grunt-requirejs-templates
 *
 * Copyright (c) 2013 Sérgio Vilar
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var fs = require('fs');
  var file = require('file');

  grunt.registerMultiTask('requirejs_templates', 'A plugin to insert the content of template files like underscore, handlebars to variables into the javascript code', function() {

    try{

      var options = this.data.options;
  
      // Lê os arquivos 
      file.walkSync(options.scripts, function(path, dirPath, dirs, files){      

        for(var u in dirs){
          
          var data = fs.readFileSync(process.cwd() + '/' + path + '/' + dirs[u], 'utf8');          

          if(data.indexOf('text!templates') > -1){

            var defineHeader_array1 = data.split('define([');
            var defineHeader_array2 = defineHeader_array1[1].split('{');

            var defineHeader = 'define([' + defineHeader_array2[0] + '{';
            var newDefineHeader = defineHeader;

            var templatesList = eval("[" + defineHeader_array2[0].trim().split(']')[0] + "]");
            var variablesList_array1 = defineHeader_array2[0].split(']')[1].split('(')[1].split(')')[0].replace(/\s/g, "").split(',');
            var variablesList = "[";
            
            for(var i in variablesList_array1){
              variablesList += "'" + variablesList_array1[i] + "',";
            }

            variablesList = variablesList.substring(0, variablesList.length - 1);
            variablesList += "]";
            variablesList = eval(variablesList);            

            var templates = [];
            var arr = data.split(' ');
            for(var i in arr){
              if(arr[i].indexOf('text!templates') > -1)
                templates.push(arr[i].trim());                
            }

            for(var i in templates){

              var templateFilePath = extraiPath(templates[i]).replace('text!templates', options.templates);              
              var templateData = fs.readFileSync(process.cwd() + '/' + templateFilePath, 'utf8');
              templateData = templateData.replace(/\n/g, '').trim();

              var index;
              for(var z in templatesList){
                if(templatesList[z] == extraiPath(templates[i])) index = z;
              }

              var quotes = getQuotes(templates[i]);

              var requireStringToReplace = quotes + templatesList[index] + quotes;
              if(newDefineHeader.indexOf(requireStringToReplace+",") > -1)
                requireStringToReplace = requireStringToReplace+",";

              var variableStringToReplace = variablesList[index];
              if(newDefineHeader.indexOf(","+variableStringToReplace) > -1){
                variableStringToReplace = ","+variableStringToReplace;
              }else if(newDefineHeader.indexOf(", "+variableStringToReplace) > -1){
                variableStringToReplace = ", "+variableStringToReplace;
              }

              newDefineHeader = newDefineHeader.replace(requireStringToReplace, '');
              newDefineHeader = newDefineHeader.replace(variableStringToReplace, '');
              newDefineHeader += "\nvar "+variablesList[index] + " = '" + templateData + "';";            
              
            }

            var newFileContent = data.replace(defineHeader, newDefineHeader);            
            fs.writeFileSync(process.cwd() + '/' + path + '/' + dirs[u], newFileContent, 'utf8');            
                  
          }

        }      

      });

    }catch(e){
      grunt.log.writeln("Error: "+e.message);
      console.log(e.stack);
    }      

  });

};

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
  if(singlequotes) quotes = "'";

  return quotes;

}