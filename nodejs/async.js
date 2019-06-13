var async = require("async")
var task1 = function (callback) {

  console.log("task1");
  callback(null, "task1")
}

var task2 = function (callback) {
  console.log("task2");

  setTimeout(() => {
    callback("err", "task2")
  }, 3000);
}

var task3 = function (callback) {

  console.log("task3");
  callback(null, "task3")
}

// async.series([task1, task2, task3], function (err, result) {

//   console.log("series");

//   if (err) {
//     console.log(err);
//   }

//   console.log(result);
// })

// console.time("parallel方法");

// async.parallel([task1, task2, task3], function (err, result) {
//   console.log("parallel");
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
//   console.timeEnd("parallel方法");
// })

console.time("auto方法");
async.auto({
  fn1(callback, results) {
    console.log('fn1')
    callback(null, "abc", "bbc")
  },
  fn2(callback, results) {
    console.log('fn2')
    callback(null, "abc", "bbc")
  }
})