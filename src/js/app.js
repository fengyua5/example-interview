
require.config({
  baseUrl: '../src/js'
});

require(['resume'], function (resume) {
  console.log(resume.hello())
});