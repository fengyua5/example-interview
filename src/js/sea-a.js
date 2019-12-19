
define(function(require, exports, module){

  var example = require('./seajs-example');

  exports.sayHello = function (text) {
    console.log('Hello' + text);
  };
});