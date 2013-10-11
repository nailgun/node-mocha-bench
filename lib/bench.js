'use strict';

global.suite = describe;

global.bench = function (description, prepareFunc) {
  createBench(description, prepareFunc, it);
};

bench.only = function (description, prepareFunc) {
  createBench(description, prepareFunc, it.only);
};

bench.skip = function (description, prepareFunc) {
  createBench(description, prepareFunc, it.skip);
};

function createBench (description, prepareFunc, itFunc) {
  describe('', function () {
    this.timeout(30000);

    var measureFunc,
        afterFunc,
        doneIt,
        donePrepare,
        doneAfter;

    var measure = function (_measureFunc_, _afterFunc_) {
      measureFunc = _measureFunc_;
      afterFunc = _afterFunc_;
      donePrepare();
    };

    var done = function () {
      if (doneAfter) {
        doneAfter.apply(this, arguments);
      } else if (doneIt) {
        doneIt.apply(this, arguments);
      } else {
        donePrepare.apply(this, arguments);
      }
    };

    var stop = function () {
      doneIt.apply(this, arguments);
    };

    before(function (_donePrepare_) {
      donePrepare = _donePrepare_;
      prepareFunc(measure, done);
    });

    itFunc(description, function (_doneIt_) {
      doneIt = _doneIt_;
      measureFunc(stop);
    });

    after(function (_doneAfter_) {
      doneAfter = _doneAfter_;
      if (afterFunc) {
        afterFunc();
      } else {
        doneAfter();
      }
    });
  });
};
