// *********************** 第九章 类和模块 ***********************

//定义一个 值的范围 类 和  工厂函数
//工厂方法 定义类
function range(from, to) {
  //inherit函数来创建对象,这个对象继承自在下面定义的原型对象
  //原型对象作为函数的一个属性储存,并定义所有范围对象所共享的方法
  var r = inherit(range.methods)
  r.from = from
  r.to = to
  return r
}
range.methods = {
  //如果x在范围内,则返回true,否则返回false
  //这个方法可以比较数字的方位,可以比较字符串和日期的范围
  includes: function (x) {
    return this.from <= x && x < this.to
  },
  //对于范围内的每个整数都调用一次f
  //这个方法只可用做数字范围
  foreach: function (f) {
    for (var x = Math.ceil(this.from); x <= this.to; x++) {
      f(x)
    }
  },
  toString: function () {
    return '(' + this.from + '...' + this.to + ')'
  }
}

// var r = range(1, 3) //创建一个范围对象
// console.log(r.includes(2));
// r.foreach(console.log)
// console.log(r.toString())

//定义构造函数  定义类 =>首字母大写
function Range(from, to) {
  this.from = from
  this.to = to
}
Range.prototype = {
  //如果x在范围内,则返回true,否则返回false
  //这个方法可以比较数字的方位,可以比较字符串和日期的范围
  includes: function (x) {
    return this.from <= x && x < this.to
  },
  //对于范围内的每个整数都调用一次f
  //这个方法只可用做数字范围
  foreach: function (f) {
    for (var x = Math.ceil(this.from); x <= this.to; x++) {
      f(x)
    }
  },
  toString: function () {
    return '(' + this.from + '...' + this.to + ')'
  }
}

// var r = new Range(1, 3) //创建一个范围对象
// Range()构造函数时通过new关键字调用的,所以不必使用inherit()或者其他什么逻辑来创建新对象.Range()构造函数只不过是初始化this而已,构造函数甚至不能返回这个对象,构造函数会自动穿件对象,然后将构造函数作为这个对象的方法来调用一次,最后返回这个新对象.
// console.log(r.includes(2));
// r.foreach(console.log)
// console.log(r.toString())

// 构造函数和类的标识
// 原型对象是类的唯一标识:当且仅当两个对象继承自同一个原型对象时,他们才属于同一个类的实例.而初始化对象的状态的构造函数则不能作为类的标识.
// r instanceof Range // 如果r继承自Range.prototype 则返回true
//实际上 instanceof 运算符并不会检查r是否是由Range()构造函数初始化而来,而会检查r是否继承自Range.prototype

//constructor属性
//热河javascript 函数都可以用作构造函数,并且调用构造函数是需要用到一个prototype属性的,因此,除了(bind返回的函数外)所有的函数都会自动拥有一个prototype属性,这个属性的值时一个对象,包含唯一一个不可枚举的属性constructor,constructor属性的值是一个函数对象:
var F = function () {}
var p = F.prototype
var c = p.constructor
c === F //=>true  对于任意函数 F.prototype.constructor = F
//这意味着对象通常集成的constructor均只带他们的构造函数,由于构造函数是类的"公共标识",因此constructor属性为对象提供了类.
var o = new F()
o.constructor === F //=>true
//实际上 Range 因为我们重写的Rnage.prototype ={},所以不在含有constructor 属性
// 我们可以显式的设置构造函数的反向应用
//Rnage.prototype ={constructor:Range}
//另一种 我们可以添加方法到prototype对象上 而不是重写他
//Rnage.prototype.method1=function(){}
//Rnage.prototype.method2=function(){}

//定义的类的三步
//1. 先顶一个一个构造函数.并设置初始化新对象的实例属性
//2. 给构造函数的prototype对象定义实例的方法
//3. 给构造函数定义类的字段和类属性
//将是三个步骤封装在defineClass()中
function extend(o, p) {
  for (prop in p) { // For all props in p.
    o[prop] = p[prop]; // Add the property to o.
  }
  return o;
}

function defineClass(
  constructor /*用来设置实例的属性的函数 */ ,
  methods /* 实例的方法,复制到原型中 */ ,
  sattics /* 类属性  复制到构造函数中 */
) {
  if (methods) extend(constructor.prototype, methods)
  if (sattics) extend(constructor, sattics)
  return constructor
}
var SimleRange = defineClass(
  function (f, t) {
    this.f = f
    this.t = t
  }, {
    includes: function (x) {
      return this.f < x && this.t > x
    },
    toString: function () {
      return this.f + '...' + this.t
    }
  }, {
    upto: function (t) {
      return new SimleRange(0, t)
    }
  }
)

// var x = new SimleRange(1, 3);
// console.log(x)

// 手动模拟java类--复数的类
function Complex(real, imaginary) {
  if (isNaN(real) || isNaN(imaginary)) throw TypeError()
  this.r = real
  this.i = imaginary
}
//共享方法
Complex.prototype.add = function (that) {
  return new Complex(this.r + that.r, this.i + that.i)
}
Complex.prototype.mul = function (that) {
  return new Complex(
    this.r * that.r - this.i * that.i,
    this.i * this.r + this.r * that.i
  )
}
Complex.prototype.mag = function (that) {
  return Math.sqrt(this.r * this.r, this.i * this.i)
}
//常量
//es5能设置为常量
//大写,约定表明为常量
Complex.ZERO = new Complex(0, 0)
Complex.ONE = new Complex(1, 0)
Complex.I = new Complex(0, 1)
//解析实例对象toString返回的字符串魏一个Complex对象
Complex.parse = function (s) {
  try {
    var m = Complex._format.exec(s) //利用正则表达式进行匹配
    return new Complex(parseFloat(m[1]), parseFloat(m[2]))
  } catch (error) {
    throw new TypeError("Can't parse '" + s + "'as a complex number")
  }
}
//定义类的私有字段,这个字段在Comlex.parse中用到了
//下划线前缀表示它是类的内部使用.而不属于类的共有api部分
// Complex._format = /^\{(^,)+},([^}]+)\}$/;

// //这实力中用到了构造函数,实例字段,实例方法,类字段,类方法
// var c = new Complex(2, 3); //使用构造函数创建新的对象
// var d = new Complex(c.i, c.r) //用到了C的实例属性
// c.add(d).toString(); //"{5,5}":使用了实例的方法
// Complex.parse(c.toString()).add(c.neg()).equals(Complex.ZERO)//   这个稍微复杂的表达式用到类方法和类字段

// 类的扩充 -- js中基于原型的继承机制是动态的:对象从其原型继承属性,如果创建对象之后原型属性发生变化,也会影响到继承这个原型的所有势力对象,所以我们可以通过给原型对象添加新方法来扩充js类.
Complex.prototype.conj = function () {
  return new Complex(this.r, -this.i)
}
//就连js内置的原型对象也一样开放.如果 我给es3添加bind方法
if (!Function.prototype.bind) {
  Function.prototype.bind = function (o) {
    //实现代码
  }
}
//去空格
String.prototype.trim =
  String.prototype.trim ||
  function () {
    if (!this) return this //空字符串不处理
    return this.replace(/^\s+|\s+$/g, '')
  }
//获取函数名称
Function.prototype.getName = function () {
  return this.name || this.toString.match(/function\s*([^(]*)\(/)[1]
}

//可判断值类型的type函数
function type(o) {
  var t, c, n
  //处理null值的特殊情况
  if (o === null) return 'null'
  //另一种特殊情况nan与自身不相等
  if (o !== o) return 'nan'
  //如果typeof的值不是'object',则使用这个值
  //这可以辨别出原始值类型和函数
  if ((t = typeof o) !== 'object') return t
  //返回对象的类型吗 除非值为Object
  //这种方式可以识别出大多数的内置对象
  if ((c = classof(o)) !== 'Object') return c
  //如果对象构造函数的名字存在话,就返回他
  if (
    o.constructor &&
    typeof o.constructor === 'function' &&
    (n = o.constructor.getName())
  )
    return n
  //  其余的类型都无法判别,一律返回"Object""
  return 'Object'
}

function classof(o) {
  return Object.prototype.toString.call(o).slice(-8, -1)
}

// *********************** 鸭式辩型  ***********************
//实现一个函数
//如果o实现了除了第一个参数之外的参数所表示的方法,则返回true
function quacks(o /*,.... */ ) {
  for (var i = 1; i < arguments.length; i++) {
    var arg = arguments[i]
    switch (typeof arg) {
      case 'string':
        if (typeof o[arg] !== 'function') return false //如果是字符串,直接用名字检查是否这个函数
        continue
      case 'function': //检测函数原型对象上的方法
        //如果实参是函数,则使用它的原型
        arg = arg.prototype //进入下一个case
      case 'object': //检车匹配方法
        for (var m in arg) {
          if (typeof arg[m] !== 'function') continue //跳过不是方法额属性
          if (typeof o[m] == 'function') return false
        }
    }
  }

  return true //如果函数能执行到这里,说明函数实现了所有方法
}

// *********************** javascript 中的面向对象技术 ***********************
//实现一个set集合类
function Set() {
  this.values = {}
  this.n = 0
  this.add.apply(this, arguments)
}
//将每个不重合的参数调加到集合中
Set.prototype.add = function () {
  for (var i = 0; i < arguments.length; i++) {
    var val = arguments[i]
    var str = Set._v2s(val) //把它转为字符串
    if (!this.values.hasOwnProperty(str)) {
      this.values[str] = val
      this.n++
    }
  }

  return this
}

// 从集合中删除元素,这些元素通过参数指定
Set.prototype.remove = function () {
  for (var i = 0; i < arguments.length; i++) {
    var str = Set._v2s(arguments[i])
    if (this.values.hasOwnProperty(str)) {
      delete this.values[str]
      this.n--
    }
  }
  return this //支持链式
}

//如果集合包含和这个值,则返回true,否则返回false
Set.prototype.contains = function (value) {
  return this.values.hasOwnProperty(Set._v2s(value))
}
//返回集合的大小
Set.prototype.size = function () {
  return this.n
}
//便利集合中所有的元素,在指定上下文中调用f
Set.prototype.foreach = function (f, context) {
  for (var s in this.values) {
    if (this.values.hasOwnProperty(s)) {
      f.call(context, this.values[s]) //调用f,传入value
    } //忽视继承属性
  }
}

//这是一个内部函数,用以将任意javascript值和唯一字符串对应起来
Set._v2s = function (val) {
  switch (val) {
    case undefined:
      return 'u'
    case null:
      return 'n'
    case true:
      return 't'
    case false:
      return 'f'
    default:
      switch (typeof val) {
        case 'number':
          return '#' + val
        case 'string':
          return '"' + val
        default:
          return '@' + objectId(val)
      }
  }

  function objectId(o) {
    var prop = '|**objectid**|'
    if (!o.hasOwnProperty(prop)) {
      o[prop] = Set._v2s.next++
      return o[prop]
    }
  }
}

Set._v2s.next = 100

//扩充Set,添加基础犯法
extend(Set.prototype, {
  //讲解转化为字符串
  toString: function () {
    var s = '{',
      i = 0
    this,
    foreach(function (v) {
      s += (i++ > 0 ? ',' : '') + v
    })
    return s + '}'
  },
  //将集合中所有值调用toLocalString;
  toLocalString: function () {
    var s = '{',
      i = 0
    this,
    foreach(function (v) {
      if (i++ > 0) s += ','
      if (v == null) s += v
      //null 和undefined
      else s += v.toLocalString() //  其他情况
    })
    return s + '}'
  },
  toArray: function () {
    var a = []
    this.foreach(function (v) {
      a.push(v)
    })
    return a
  }
})

Set.prototype.toJSON = Set.prototype.toArray //对于要从json转为字符串的集合都当做数组来对待

// 枚举类型
//这个函数创建一个新的枚举类型,实参对象表示类的每个实例的名字和值
//返回值是一个构造函数,它表示这个新类
//注意,这个构造函数也会抛出异常,不能用它来创建该类型的新势力
//返回的构造函数包含名/值的映射表
//包括由值组成的数组以及一个foreach()迭代器函数
function enumeration(namesToValues) {
  var enumeration = function () {
    throw "Can't Instantiate Enumerations"
  }
  var proto = (enumeration.prototype = {
    constructor: enumeration,
    toString: function () {
      return this.name
    }, //返回名字
    valueOf: function () {
      return this.value
    }, //返回值
    toJSON: function () {
      return this.name
    }
  })
  enumeration.values = [] //用来存放枚举对象的数组
  for (name in namesToValues) {
    var e = inherit(proto)
    e.name = name
    e.value = namesToValues[name]
    enumeration[name] = e //把e这个对象设置为够咱函数的属性
    enumeration.values.push(e)
  }
  enumeration.foreach = function (f, c) {
    for (var i = 0; i < this.values.length; i++) f.call(c, this.values[i])
  }

  return enumeration //返回新类型的构造函数
}

//使用枚举类型来表示一副扑克牌
function Card(suit, rank) {
  this.suit = suit //花色
  this.rank = rank //点数
}
Card.Suit = enumeration({
  Clues: 1,
  Diamonds: 2,
  Hearts: 3,
  Spades: 4
})
Card.Rank = enumeration({
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
  Six: 6,
  Seven: 7,
  Night: 8,
  Nine: 9,
  Ten: 10,
  Jack: 11,
  Queen: 12,
  King: 13,
  Ace: 14
})
// console.log(Cards.Suit)
Card.prototype.toString = function () {
  return this.rank.toString + 'of' + this.suit.toString()
}
Card.prototype.compareTo = function (that) {
  if (this.rank < that.rank) return -1
  if (this.rank < that.rank) return 1
  return 0
}
Card.orderByRank = function (a, b) {
  return a.compareTo(b)
} // 一玩法负责排序
Card.orderBySuit = function (a, b) {
  if (a.suit < b.suit) return -1
  if (a.suit > b.suit) return 1
  if (a.rank < b.rank) return -1
  if (a.rank > b.rank) return 1
  return 0
}

// 定义用以表示一副标准扑克牌的类
function Deck() {
  var cards = (this.cards = []) //一副牌 就是由牌组成的数组
  Card.Suit.foreach(function (s) {
    console.log(s)
    Card.Rank.foreach(function (r) {
      cards.push(new Card(s, r))
    })
  })
}
//洗牌方法:重新洗牌,并且返回洗好的牌
Deck.prototype.shuffle = function () {
  var deck = this.cards,
    len = deck.length
  for (var i = len - 1; i > 0; i--) {
    var r = Math.floor(Math.random() * (i + 1)),
      temp;
    (temp = deck[i]), (deck[i] = deck[r]), (deck[r] = temp)
  }

  return this
}
//发牌方法:返回牌的数组
Deck.prototype.deal = function (n) {
  if (this.cards.length < n) throw 'Out of cards'
  return this.cards.splice(this.cards.length - n, n)
}
//创建一副新扑克牌,洗牌并发牌
// var deck = (new Deck()).shuffle();
// var hand = deck.deal(2).sort(Card.orderBySuit)
// console.log(deck)
// console.log(hand)

// 比较方法
Range.constructor = Range
Range.prototype.equals = function (that) {
  if (that == null) return false
  if (that.constructor !== Range) return false
  return this.from == that.from && this.to == that.to
}
//给set类定义equals方法稍微有些复杂,不能简单的比较两个集合的values属性,还要进行更深层次的比较.
Set.prototype.equals = function (that) {
  //一些次要情况的快捷处理
  if (this === that) return true
  //如果that对象不是一个集合,他和this不相等
  //我们用到了instanceof,使得整个方法可以用于Set的任何子类
  //如果希望采用鸭式辩型的方法,可以降低检查的严格程度
  //或者可以通过 this.constructor == that.constructor 来加强检查的严格程度
  //注意 , null和 undefined无法使用instanceof运算的
  if (!(that instanceof Set)) return false

  //如果两个集合的大小不一样,则他们不相等
  if (this.size() != that.size()) return false

  //现在检查两个集合中的元素是否完全一样
  //如果两个集合不相等,则通过抛出异常来终止foreach循环
  try {
    this.foreach(function (v) {
      if (!that.contains(v)) throw false
      return true
    })
  } catch (error) {
    if (error === false) return false
    throw error
  }
}

//大小比较
Range.prototype.compareTo = function (that) {
  if (!(that instanceof Range))
    throw new Errorr("Can't campare a Range with " + that)
  var diff = this.from - that.from // 比较下边界
  if (diff == 0) diff = this.to - that.to
  return diff
}
//定义子类

function defineSubclass(superclass, // Constructor of the superclass
  constructor, // The constructor for the new subclass
  methods, // Instance methods: copied to prototype
  statics) // Class properties: copied to constructor
{
  // Set up the prototype object of the subclass
  constructor.prototype = inherit(superclass.prototype);
  constructor.prototype.constructor = constructor;
  // Copy the methods and statics as we would for a regular class
  if (methods) extend(constructor.prototype, methods);
  if (statics) extend(constructor, statics);
  // Return the class
  return constructor;
}

//也可以通过父类的构造函数方法阿莱做到这一点
Function.prototype.extend = function (constructor, methods, statics) {
  return defineSubclass(this, constructor, methods, statics);
};
// Function.prototype.extend = function (constructor, methods, statics) {
//   return defineSubclass(this, constructor, methods, statics);
// };
// *********************** ES5 增加(getter setter 可枚举性,可写性 和可配置性) ***********************
//让属性不可枚举
//通过Object.defineProperty实现
//同时定义一个getter检测对象是否是可扩展的
//将代码包装在一个匿名函数中,这样定义的变量就在这个函数作用域内
;
(function () {
  //顶一个一个不可枚举的属性objectId,他可以被所有对象继承
  //当读取这个属性时调用getter函数
  //他没有定义setter,所他是只读的
  //它是不可以配置的,因此他是不能删除的
  Object.defineProperty(Object.prototype, 'objectId', {
    get: idGetter,
    enumerable: false,
    configurable: false
  })
  //当读取这个objectId的时候直接调用这个getter
  function idGetter() {
    if (!(idprop in this)) {
      //如果对象中不存在id
      if (!Object.isExtensible(this)) {
        //并且能增加属性
        throw Error("Can't define id for nonextensible objects")
      }
      Object.defineProperty(this, idprop, {
        value: nextid++,
        writable: false,
        enumerable: false,
        configurable: false
      })
    }

    return this[idprop]
  }
  var idprop = '|**objectId**|'
  var nextid = 1;
  // var x1 = Object.create({})
  // var x2 = Object.create({})
  // console.log(x1.objectId)
  // x1.objectId = 10;
  // console.log(x1.objectId)
  // console.log(x2.objectId)

})()

//定义不可变的类
//除了设置不可枚举,es5还可以设置属性为只读
//利用Object.defineProperties()和Object.create()定义不可变的类Range,设置原型对象的方法不可枚举+只读+不可删除.类似内置方法
//展示一个有趣的技巧,其中实现构造函数也可以用作工厂函数,这样无论是调用函数还是使用new都可以正确创建实例
function Range(from, to) {
  var props = {
    from: {
      vaule: from,
      enumerable: true,
      writable: false,
      configurable: false
    },
    to: {
      vaule: to,
      enumerable: true,
      writable: false, //写
      configurable: false //配置
    }
  };
  if (this instanceof Range) Object.defineProperty(this, props) //如果作为构造函数来调用,定义属性
  else return Object.create(Range.prototype, props) //否则当做工厂方法来调用 穿件并返回这个新的Range对象

  //如果用同样的方法给Range.prototype对象添加属性
  //那么我们需要给这些属性设置他们的特性
  //因为我们无法识别出他们的可枚举性 可写性或者可配置性,这些属性默认都是false
  Object.defineProperties(Range.prototype, {
    includes: {
      value: function (x) {
        return this.from <= x && this.to >= x;
      }
    },
    foreach: {
      value: function (f) {
        for (var x = Math.ceil(this.from); x <= this.to; x++) f(x)
      }
    },
    toString: {
      vaule: function () {
        return "(" + this.from + "..." + this.to + ")"
      }
    }
  })

}

//Object.defineProperties()和Object.craete()非常强大,但是属性描述符对象让代码可读性变得更差,另一种改进的做法是将修改这个已定义属性的特性的操作定义为一个工具函数.
//属性描述符工具函数
//将o指定名字(或所有)的属性设置不可写和不可配置
function freezeProps(o) {
  var props = (arguments.length == 1) ? Object.getOwnPropertyNames(o) : Array.splice.call(arguments, 1); //两种情概况,传入参数有几个,处理,都返回需要处理的属性name
  props.forEach(function (n) {
    if (!Object.getOwnPropertyDescriptor(o, n).configurable) return; //忽视不可配置的属性
    Object.defineProperty(o, n, {
      writable: false,
      configurable: false
    })
  })

  return o; //所以我们可以继续使用它
}


//将o的指定名字的(或所有)的属性设置为不可枚举的和可配置的
function hideProps(o) {
  var props = (arguments.length == 1) ? Object.getOwnPropertyNames(o) : Array.splice.call(arguments, 1);
  props.forEach(function (n) {
    if (!Object.getOwnPropertyDescriptor(o, n).configurable) return;
    Object.defineProperty(o, n, {
      enumerable: false
    })
  })

  return o;
}

//Object.defineProperty()和Object.definePerperties()可以用来创建新属性,也可以修改已有属性的特性.当用它们来创建新属性时,所有的属性的特性值都是false,当使用它们修改已经存在的属性的特性保持不变.
//利用工具类实现一个简单的不可变的类型
function Range(from, to) {
  this.from = from;
  this.to = to;
  freezeProps(this); //将属性设置为不可变
}
Range.prototype = hideProps({
  constructor: Range,
  includes: function (x) {
    return this.from <= x && this.to >= x
  },
  foreach: function (f) {
    for (var x = Math.ceil(this.from); x < this.to; x++) f(x)
  },
  toString: function () {
    return "(" + this.from + "..." + this.to + ")"
  }
})

//封装对象状态
//  构造函数中的变量和参数可以用他在创建的对象的私有状态.但是该方法在es3中有一个缺点是,访问这些状态私有状态的存取方法是可以替换的,
// 在es5中可以通过定义属性getter和setter方法将状态变量更健壮的封装起来,这两个方法是无法删除.

//这个版本的Range是可变的,但是将端点进行了良好的封装
//但端点的大小顺序还是固定的 from<=to;
function Range(from, to) {
  //如果from大于to
  if (from > to) throw new Error("Range : from must be <= to");
  //定义存取器方法以维持不变
  function getFrom() {
    return from
  }

  function getTo() {
    return to
  }

  function setFrom(f) {
    if (f <= to) from = f;
    else throw new Error("Range : from must be <= to");
  }

  function setTo(t) {
    if (from <= t) to = t;
    else throw new Error("Range : from must be <= to");
  }


  Object.defineProperty(this, {
    from: {
      get: getFrom,
      set: setFrom,
      enumerable: true,
      configurable: false
    },
    to: {
      get: getTo,
      set: setTo,
      enumerable: true,
      configurable: false
    }
  })
}
//可以正常读取属性,设置属性值需要按照规则.
Range.prototype = hideProps({
  constructor: Range,
  includes: function (x) {
    return this.from <= x && this.to >= x
  },
  foreach: function (f) {
    for (var x = Math.ceil(this.from); x < this.to; x++) f(x)
  },
  toString: function () {
    return "(" + this.from + "..." + this.to + ")"
  }
})


//防止类的扩展
//通常认为通过给原型对象调价方法可以动态的对类进行扩展,这是javascript本身的特性.
//es5可以根据需要对此特性加以限制.Object.preventExtensions()可以将对象设置为不可以扩展的,也就是书不能给对象添加任何属性.
//Object.seal()则更加强大,它除了能组织用户给对象添加新属性,还能将当前属性设置为不可配置的,这样就不能删除这些属性(但是不可配置的属性可以是可写的,也可以转换为只读属性)
//可以通过这样一句简单的代码组织对Object.prototype的扩展

//Object.seal(Obbject.prototype);

//js的另一个动态特性是"对象的方法可以随时替换",
var origin_sort_method = Array.prototype.sort;
Array.prototype.sort = function () {
  var start = new Date();
  origin_sort_method.apply(this, arguments);
  var end = new Date();
  console.log("Array sort " + (end - start) + "m")
}
//可以将实例方法设置为只读来防止这类修改,一种是使用上面定义的freezeProps()工具类,另一种是使用Object.freeze(),他的功能金额Object.seal()一样,他统一回吧所有属性设置为只读和不可配置.


// es5属性操作
//给object.prototype定义properties()方法
//这个方法返回一个表示调用他的对象上的属性名列表的对象
//如果不带参数调用它,就表示改对象所有属性
//反对下顶一个了4个有用的方法 toString().descriptors(),hide(),show(),
;
(function namepace() {
  //将所有逻辑闭包在一个私有函数作用域中

  //这个函数成为所有对象的方法
  function properties() {
    var names; //属性名组成的数组
    if (arguments.length == 0) names = Object.getOwnPropertyNames(this); //所有的自身属性
    else if (arguments.length == 1 && Array.isArray(arguments[0])) names = arguments[0] // 名字组成的数组
    else names = Array.prototype.splice.call(arguments, 0) //参数列表本身就是名字
    return new Properties(this, names);
  }
  //将它设置为object.prototype的新的不可枚举的属性
  //这是从私有函数作用域导出的唯一一个值
  Object.defineProperty(Object.prototype, "properties", {
    value: properties,
    enumerable: false,
    writable: true,
    configurable: true
  })

  //这个构造函数由上面的properties()函数调用
  //Properties()类表示一个对象的属性集合
  function Properties(o, names) {
    this.o = o; //属性所属的对象
    this.names = names; //属性的名字
  }
  // 将代表这些属性的对象设置为不可枚举
  Properties.prototype.hide = function () {
    var o = this.o,
      hidden = {
        enumerable: false
      };
    this.names.forEach(function (n) {
      if (o.hasOwnProperty(n)) Object.defineProperty(o, n, hidden);
    })
    return this;
  };
  //将这些属性设置只读和不可配置的
  Properties.prototype.freeze = function () {
    var o = this.o,
      frozen = {
        writable: false,
        enumerable: false
      }
    this.names.forEach(function (n) {
      if (o.hasOwnProperty(n)) Object.defineProperty(o, n, frozen);
    })
    return this;
  }

  //返回一个对象,这个对象是名字奥属性描述符的映射表
  //使用它来复制属性,连同属性的特性一起复制
  //Object.defineProperties(dest,src.properties().description());
  Properties.prototype.description = function () {
    var o = this.o,
      desc = {};
    this.names.forEach(function (n) {
      if (!o.hasOwnProperty(n)) return;
      desc[n] = Object.getOwnPropertyDescriptor(o, n)
    })
    return desc;
  }
  //返回一个格式化良好的属性列表
  //列表中包括名字,值,和属性特性,使用permanent表示不可配置
  //使用readonly表示不可写,使用hidden表示不可枚举
  //普通的可枚举 可写 和 可配置属性不包含特性列表
  Properties.prototype.toString = function () {
    var o = this.o;
    var lines = this.names.map(nameToString)
    return "{\n" + lines.join(",\n") + "\n}"

    function nameToString(n) {
      var s = '',
        desc = Object.getOwnPropertyDescriptor(o, n);
      if (!desc) return "nonexistent" + n + ":undefined";
      if (!desc.configurable) s += "permanent";
      if ((desc.get && desc.set) || !desc.writable) s += "readonly";
      if (!desc.enumerable) s += "hidden";
      if (desc.get || desc.set) s += "accessor" + n;
      else s += n + ":" + ((typeof desc.value === 'function') ? "function" : desc.value)
      return s;
    }
  }
  //最后,将原型对象中的实例方法设置为不可以枚举
  //这里用到刚定义的方法
  Properties.prototype.properties().hide();

})(); //立即执行这个匿名函数

// var x = Object.create({})
// console.log(x)
// x.name = 1;
// x.age = 10;
// console.log(x.properties().toString())


//模块函数中的Set类
//声明全局变量set,使用一个函数的返回值给他赋值
//函数结束时紧跟着一对圆括号说明这个函数定义后立即执行
//它的返回值将赋值给Set,而不是将这个函数赋给Set
//注意它是一个函数表达式,不是一个语句,因此函数"invocation"并没有创建全局变量
var Set = (function invocation() {
  function Set() {
    //这个构造函数是局部变量
    this.values = {}; //这个对象的属性用来保存这个集合
    this.n = 0; //集合中值的个数
    this.add.apply(this, arguments); //将所有的参数都添加至集合中
  }
  //给Set.prototype定义实例方法
  //这里省略了详细代码
  Set.prototype.contains = function (value) {
    //注意我们调用v2s(),而不是调用带有笨重的前缀的set._v2s();
    return this.values.hasOwnProperty(v2s(value))
  };
  Set.prototype.size = function () {
    return this.n
  }
  Set.prototype.add = function () {}
  Set.prototype.remove = function () {}
  Set.prototype.foreach = function (f, context) {}
  //这里是上面的方法用到的一些辅助函数和变量
  //他们不属于模块共有api,但他们都隐藏在这个函数作用域内
  //因此我们不必将他们定义为Set的属性或使用下划线作为其前缀
  function v2s() {}

  function OobjectId() {}
  var nextId = 1;
  //这个模块共有的API是Set()构造函数
  //我们需要吧这个函数从私有命名空间中导出来
  //以便我们在外部也可以使用它,在这种情况下,我们通过返回这个构造函数来导出它
  //它编程第一行代码所致的表达式的值
  return Set;
})(); //定义函数逅立即执行