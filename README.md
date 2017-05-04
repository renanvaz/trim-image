# trimImage

> Remove transparent pixels from image borders

## Installation

Install with [npm](https://npmjs.org/package/trim-image):
```
npm install --save trim-image
```

# Params

```
trimImage(filename, filenameOut [, cropInfo|callback [, callback]]);

trimImage(filename, filenameOut);
trimImage(filename, filenameOut, cropInfo);
trimImage(filename, filenameOut, callback);
trimImage(filename, filenameOut, cropInfo, callback);
```

Property           | Necessary | Type         | Plugin default value
-------------------|-----------|--------------|-----------
filename           | yes       | `string`     |
filenameOut        | yes       | `string`     |
cropInfo           | no        | `object`     | `{ top: true, right: true, bottom: true, left: true } `
callback           | no        | `function`   | `(err) => {} `

More detailed explanation is below.

#### filename
The input filename

#### filenameOut
The output filename

#### cropInfo
Defines which sides will be cut. By default, all sides are started as `true`

#### callback
The callback function for async flow and error handle

# Usage
## Simple example
```js
const trimImage   = require('trim-image');
const fs          = require('fs');

trimImage(`images/${filename}`, `out/${filename}`);
```

## Complete example
```js
const trimImage     = require('trim-image');
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
```
