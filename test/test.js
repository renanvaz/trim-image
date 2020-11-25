const trimImage     = require('../index');
const fs            = require('fs');

trimImage(`images/inner/test.png`, `out/inner/test.png`, (err) => {
    if (err) {
      console.log(err);
      return;
    }
});

trimImage(`images/inner/test.png`, null,(err,buf) => {
    if (err) {
      console.log(err);
      return;
    } else {
      fs.writeFileSync(`out/inner/buf-test.png`,buf);
    }
});

trimImage(`images/inner/test.png`, `out/inner/test1.png`, { top: false }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
});

trimImage(`images/inner/test.png`, `out/inner/test2.png`, { right: false }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
});

trimImage(`images/inner/test.png`, `out/inner/test3.png`, { bottom: false }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
});

trimImage(`images/inner/test.png`, `out/inner/test4.png`, { left: false }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
});
