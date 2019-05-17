// *********************** 不完全函数编程 *********************** 
function array(a, n) {
  return Array.prototype.slice.call(a, n || 0)
}

function partialLeft(f) {
  var args = arguments; //保存第一次执行传入的实参
  return function () {
    var a = array(args, 1) //第一次传入的第一位为函数,从第二位开始为实际的参数,截取保寸
    a = a.concat(array(arguments)) //将第二次传入的参数和第一次想连接
    return f.apply(this, a)
  }
}

function partiaRight(f) {
  var args = arguments; //保存第一次执行传入的实参
  return function () {
    var a = array(args, 1) //第一次传入的第一位为函数,从第二位开始为实际的参数,截取保存
    var i = 0,
      j = 0;
    for (; i < a.length; i++) {
      if (a[i] === undefined) a[i] = arguments[j++] //将a中的undefined项用第二次传入的参数依次替换
    }
    a = (array(arguments, j)).concat(a) //将第二次传入的参数中 未被替换的进行和第一次想连接
    return f.apply(this, a)
  }
}

function partial(f) {
  var args = arguments; //保存执行函数的参数,如下面例子中的[f,undefined,2]
  return function () {
    var a = array(args, 1); //截取[f,undefined,2]中第一位到最后即[undefined,2]
    var i = 0,
      j = 0;
    for (; i < a.length; i++)
      if (a[i] === undefined) a[i] = arguments[j++]; //从头开始便利a,碰到undefined,则从第二次执行的实参中获取获取对应数据填补上,如下中,a[0]===undefined 则 a[0]=arguments[0]然后j++=>j=1;继续执行.一直到将a中所有的undefined实参用第二次传入的实参替换,并将j更新到替换元素的位置的下标
    //现在将剩下的内部实参都追加进去;
    a = a.concat(array(arguments, j)) //如下 需要从arguments中替换一个元素,所以j=1;即 j=0替换进入了上面的a中;将a和arguments中的第二个元素到末尾的数组合并组成新a
    return f.apply(this, a) //如下 将a作为参数传入f中执行f,此时,f的实参 第一位是来自第二次执行的arguments[0],第二个为第一次传入的第三个,第三个魏第二次传入的第二个;所以实际执行的参数为f(3,2,4)
  }
} //绑定中间的实参

function f(x, y, z) {
  return x * (y - z)
}
// console.log(partialLeft(f, 2)(3, 4))
// console.log(partiaRight(f, 2)(3, 4))
// console.log(partial(f, undefined, 2)(3, 4))
// *********************** 不完全调用函数整合其他高阶函数 *********************** 

// *********************** 调用不完全函数组合在求取平均数和标准差 函数式编程 *********************** 

var reduce = Array.prototype.reduce ? function (a, f, inital) {
  if (arguments.length > 2)
    return a.reduce(f, inital)
  else return a.reduce(f)

} : function (a, f, inital) {
  var i = 0,
    len = a.length,
    accumulator;
  if (arguments.length > 2) accumulator = inital;
  else {
    if (len == 0) throw TypeError();
    while (i < len) {
      if (i in a) {
        accumulator = a[i++];
        break;
      } else i++;
    }
    if (i == len) throw TypeError()
  }

  while (i < len) {
    if (i in a) {
      accumulator = f.call(undefined, accumulator, a[i], i, a);
      i++;
    }
  }
  return accumulator;
}
var data = [1, 1, 3, 5, 5];
var sum = function (x, y) {
  return x + y
}
var product = function (x, y) {
  return x * y
}

var neg = partial(product, -1)
var square = partial(Math.pow, undefined, 2)
var sqrt = partial(Math.pow, undefined, .5)
var reciprocal = partial(Math.pow, undefined, -1)
//计算平均值和标准差,所有的函数调用都不带运算符
// var mean = product(reduce(data, sum), reciprocal(data.length));

// *********************** 函数式编程魂村技巧 "记忆" *********************** 

function memorize(f) {
  var cache = {}; //将值存在闭包中
  return function () {
    var key = arguments.length + Array.prototype.join.call(arguments, ",");
    console.log(cache)
    if (key in cache) return cache[key];
    else return cache[key] = f.apply(this, arguments);
  }
}

//缓存调用
function gcd(a, b) {
  var t;
  if (a < b) t = b, b = a, a = t;
  while (b != o) t = b, b = a % b, a = t; //求最大公约的欧几里得算法
  return a;
}

// var gcdMemo = memorize(gcd);
// gcdMemo(85, 187);
//注意,当我们写一个递归函数时,往往需要实现记忆功能
//我们更希望调用实现了记忆功能的递归函数,而不是原递归函数

// var factorial = memorize(function (n) {
//   return (n <= 1) ? 1 : n * factorial(n - 1)
// })
//factorial =  返回的那个匿名函数 而不是memorize这个函数,可以理解为 factorial函数我这个匿名函数,每次调用这个匿名函数时候外部有一个memorize函数的作用域 内有一个cache 行程闭包
// console.log(factorial(5))