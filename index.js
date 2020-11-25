const getPixels   = require('get-pixels');
const savePixels  = require('save-pixels');
const fs          = require('fs');
const path        = require('path');
const mkdirp      = require('mkdirp');
const Stream      = require('stream');


module.exports = function trimImage(filename, filenameOut, ...rest) {
  let crop  = typeof rest[0] == 'Function' ? {} : rest[0];
  let cb    = typeof rest[1] == 'Function' ? rest[0] : (rest[1] ? rest[1] : (err) => {});

  crop = Object.assign({
      top: true,
      right: true,
      bottom: true,
      left: true
    }, crop);

  getPixels(filename, (err, pixels) => {
    if (err) {
      cb('Bad image path:', filename);
      return;
    }

    const w = pixels.shape[0];
    const h = pixels.shape[1];

    let i, j, a;

    let cropData = {
      top: 0,
      right: w,
      bottom: h,
      left: 0,
    };

    top:
    if (crop.top) {
      for (j = 0; j < h; j++) {
        cropData.top = j;

        for (i = 0; i < w; i++) {
          a = pixels.get(i, j, 3);

          if (a !== 0) break top;
        }
      }
    }

    right:
    if (crop.right) {
      for (i = w - 1; i >= 0; i--) {
        for (j = h - 1; j >= 0; j--) {
          a = pixels.get(i, j, 3);

          if (a !== 0) break right;
        }

        cropData.right = i;
      }
    }

    bottom:
    if (crop.bottom) {
      for (j = h - 1; j >= 0; j--) {
        for (i = w - 1; i >= 0; i--) {
          a = pixels.get(i, j, 3);

          if (a !== 0) break bottom;
        }

        cropData.bottom = j;
      }
    }

    left:
    if (crop.left) {
      for (i = 0; i < w; i++) {
        cropData.left = i;

        for (j = 0; j < h; j++) {
          a = pixels.get(i, j, 3);

          if (a !== 0) break left;
        }
      }
    }

    // Check error
    if ((cropData.left > cropData.right) || (cropData.top > cropData.bottom)) {
      cb('Crop coordinates overflow:', filename);
    } else {
      if(filenameOut===null) {
        var buf = Buffer.from([]);
        var sink = new Stream.Writable({
          write: function(chunk,encoding,next) {
            buf = Buffer.concat([buf, chunk]);
            next();
          }
        });
        sink.error = (err)=>{
          cb(err);
        }
        sink.end = ()=>{
          cb(false,buf)
        }
        savePixels(pixels.hi(cropData.right, cropData.bottom).lo(cropData.left, cropData.top), 'png').pipe(sink);

      } else {
        const dirname = path.dirname(filenameOut);

        if (!fs.existsSync(dirname)) {
          mkdirp(dirname, function (err) {
            if (err) console.error(err);
          });
        }

        savePixels(pixels.hi(cropData.right, cropData.bottom).lo(cropData.left, cropData.top), 'png').pipe(fs.createWriteStream(filenameOut));
        cb(false);
      }

    }
  });
};
