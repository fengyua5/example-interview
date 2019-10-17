
function debounce(cb, time) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      cb.apply(context, args);
    }, time);
  }
}

function throttle(cb, time) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    if(!timeout){
      timeout = setTimeout(function () {
        timeout = null;
        cb.apply(context, args);
      }, time);
    }

  }
}

function aa(params) {
  console.log(params);
  console.log(1111)
};

function bb(params) {
  console.log('throttle' + params)
  console.log(22222)
};

var b = debounce(aa, 2000);

var c = throttle(bb, 2000);

for(var i = 0; i< 3; i++){
  b('1111111111');
  c('1111111111');
}

