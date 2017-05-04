const trimImage     = require('../index');
const fs            = require('fs');
const path          = require('path');

const allFilesSync = (dir, fileList = []) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file)

    fileList.push(
      fs.statSync(filePath).isDirectory()
        ? {[file]: allFilesSync(filePath)}
        : file
    )
  })
  return fileList
}

const images = allFilesSync('images/').filter((filename) => filename.match(/\.png$/));

images.forEach((filename) => {
    trimImage(`images/${filename}`, `out/${filename}`, { top: false, left: false }, (err) => {
        if (err) {
          console.log(err);
          return;
        }
    });
});
