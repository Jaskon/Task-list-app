var ng2TemplateParser = require('gulp-inline-ng2-template/parser');
var through = require('through2');
var options = {target: 'es2015'};
 
module.exports = function (file) {
  console.log(file);
  return through(function (buf, enc, next){
    ng2TemplateParser({contents: buf, path: file}, options)((err, result) => {
      this.push(result);
      process.nextTick(next);
    });
  });
};