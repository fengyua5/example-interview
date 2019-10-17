function MyPromise(executor) {
  var _self = this;
  _self.status = 'pending';
  _self.value = void (0);
  _self.onResolvedCallbacks = [];
  _self.onRejectedCallbacks = [];

  function resolve(value) {
    if (_self.status === 'pending') {
      _self.status = 'fulfilled';
      _self.value = value;
      _self.onResolvedCallbacks.forEach(item => item(_self.value))
    }
  }

  function reject(reason) {
    if (_self.status === 'pending') {
      _self.status = 'rejected';
      _self.value = reason;
      _self.onRejectedCallbacks.forEach(item => item(_self.value))
    }
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e);
  }
}

function resolveExecutor(promise2, x, resolve, reject){
  if(typeof x === 'number' || typeof x === 'string'){
    resolve(x);
  }
}

MyPromise.prototype.then = function (onResolve, onReject) {
  var _self = this;
  var promise = undefined;
  var x = undefined;
  if (_self.status === 'pending') {
    promise = new MyPromise(function (resolve, reject) {
      _self.onResolvedCallbacks.push(function () {
        x = onResolve(_self.value);
        resolveExecutor(promise, x, resolve, reject)
      });
      _self.onRejectedCallbacks.push(function (resolve, reject) {
        x = onReject(_self.value);
        resolveExecutor(promise, x, resolve, reject)
      })
    });
  }

  if (_self.status === 'fulfilled') {
    promise = new MyPromise(function (resolve, reject) {
      onResolve(_self.value);
    });

  }

  if (_self.status === 'rejected') {
    promise = new MyPromise(function (resolve, reject) {
      onReject(_self.value);
    });
  }

  return promise;
};

var promise = new MyPromise(function (resolve, reject) {
  setTimeout(function () {
    resolve(111)
  }, 2000)
});

var promise2 = promise.then(function (value) {
  console.log('success---' + value);
  return 1111;
}, function (err) {
  console.log('err---' + err);
});
promise2.then(function (value) {
  console.log(value + 'success----then2')
}, function () {

});



