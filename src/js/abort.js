function ajax(po) {
  let abort;
  let abortPromise = new Promise((resolve, reject) => {
    console.log('abort----');
    abort = reject;
  });
  let promise = Promise.race([po, abortPromise]);
  promise.abort = abort;
  return promise;
}

let result = ajax(new Promise((resolve) =>{
  setTimeout(() =>{
    resolve('11111');
  }, 10000)
}));

result.catch(() =>{
  console.log('error');
});

result.abort('reject');