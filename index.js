var fs = require('fs');
var path = require('path');
var UglifyJS = require("uglify-js");

function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((item) => {
    var fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {   
      readFileList(path.join(dir, item), filesList); //递归读取文件
    } else {        
      filesList.push(item);           
    }    
  });
  return filesList;
}
var filesList = [];
readFileList(path.resolve(__dirname,'./src'),filesList);

filesList.forEach(function(item) {
    var content = String(fs.readFileSync(path.join(path.resolve(__dirname,'./src'),item)))
    var result = UglifyJS.minify(content)
    var name = path.join(path.resolve(__dirname,'./dist'),item.split('.')[0]+'.min.js');
    fs.writeFile(name,result.code,function(error) {
        if (error) {
            return;
        } else {
            console.log('success')
        }
    })
})