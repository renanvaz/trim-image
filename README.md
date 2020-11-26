# trim-image

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

Property           | Necessary | Type                   | Plugin default value
-------------------|-----------|------------------------|-----------
filename           | yes       | `string`               |
filenameOut        | yes       | `string` or `null`     |
cropInfo           | no        | `object`               | `{ top: true, right: true, bottom: true, left: true, bufferMime: 'image/png' } `
callback           | no        | `function`             | `(err,buffer) => {} `

More detailed explanation is below.

#### filename
The input filename

#### filenameOut
The output filename. If set to `null`, then output is passed as buffer to callback function.

#### cropInfo
Defines which sides will be cut. By default, all sides are started as `true`
If Buffer instance is used instead of path as input, mime-type of buffer needs to be specified in `bufferMime` field, defaults to 'image/png'.

#### callback
The callback function for async flow and error handle

# Usage
## Simple example
```js
const trimImage   = require('trim-image');

trimImage(`images/${filename}`, `out/${filename}`);
```
## Buffer output example
```js
const trimImage   = require('trim-image');
const fs          = require('fs');

trimImage(`images/${filename}`,null, {},(err,buff) => {
  if (err) {
    console.log(err);
    return;
  } else {
    fs.writeFileSync(`out/${filename}`,buf);
  }
});
```
## Buffer input example
```js
const trimImage   = require('trim-image');
const fs          = require('fs');

var buf = fs.readFileSync(`images/inner/test.png`);
/* For buffer as input the mime-type must be specified using bufferMime option */
trimImage(buf, `out/inner/buffer-input-test.png`,{bufferMime:'image/png'}, (err) => {
    if (err) {
      console.log(err);
      return;
    }
});
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
