const EventEmitter = require('events');

let emitter = new EventEmitter();

emitter.on('myEvent', function sth () {
  emitter.on('myEvent', sth);
  console.log('hi');
});

emitter.emit('myEvent');

let fn = new Promise((resolve) =>{
  console.log('fn -----');
  resolve('111')
});

fn.then((value) =>{
  console.log('fn first then---', value);
  return value;
});

setTimeout(() =>{
  fn.then((value) =>{
    console.log('fn setTimeout then---', value)
  });
});