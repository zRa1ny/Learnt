// ***********************  JavaScript  ---  jquery类库  *********************** 
{
  //处理初始赋值
  let a = $.extend({
    a: ''
  }, {
    a: 1,
    b: 2
  }, {
    c: 2
  })

  // console.log(a)

  let b = $.extend(true, {}, {
    a: 1
  })

  // console.log(b)

  let cArr = [11, 21, 31]
  let c = $.grep(cArr, function (value, index) {
    return value > 20
  })
  // console.log(c)


}