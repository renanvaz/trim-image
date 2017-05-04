const trimImage     = require('../index');
const fs            = require('fs');

trimImage(`images/test.png`, `out/test.png`, (err) => {
    if (err) {
      console.log(err);
      return;
    }
});

trimImage(`images/test.png`, `out/test1.png`, { top: false}, (err) => {
    if (err) {
      console.log(err);
      return;
    }
});

trimImage(`images/test.png`, `out/test2.png`, { right: false }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
});

trimImage(`images/test.png`, `out/test3.png`, { bottom: false }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
});

trimImage(`images/test.png`, `out/test4.png`, { left: false }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
});
