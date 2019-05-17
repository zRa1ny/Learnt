// ***********************   脚本化文档 ***********************
var app = document.getElementById('app')
// 每一个web浏览器窗口/标签页和框架由一个Window对象所表示.每一个Window对象有一个document属性引用了Document对象.Document对象表示窗口的内容,它是一个巨大的API的核心对象,叫做文档对象模型(Document Object Model,DOM),他代表和操作文档的内容.
//本章开始部分解释DOM的基本架构
//15.1 Dom 概览
//parentNode
//childNodes
//firstNode,lastNode
//nextSibling,perviourSibling
//nodeTyoe
//nodeValue
//nodeName
//作为元素树的文档
//将文档看做Element对象书
//忽视部分文档:text和Comment节点
// 第一部分是element对象的children属性,类似childnodes,他也是nodelist对象,但是他的类别只包含element对象,并非标准属性,但是他在所有当前的浏览器都实现了.
//注意text和comment没有children属性,所以上述node.parentNode一定是返回element
//基于苏便利api的地部分是element属性,后者类似node对象紫属性和兄弟属性
//firstElementChild.lastElementChild//类似firstChid 和 lastChild 但是代表子Element
//nextElementSibling,pervioursElementSibling
//childElementCount 子元素的数量 === children.length
//可移植的文档便利函数
//返回元素e的第n层祖先元素,如果不存在此类祖先或者祖先不是Element.
//(例如Document或者DocumentFragment)则返回null
//如果n为0,则返回e本身,如果n为1,ze返回其父元素
//如果n为2,ze返回其祖父元素,依次类推.
function parent(e, n) {
  if (e === undefined) n = 1
  while (n-- && e) e = e.parent.Node
  if (!e || e.nodeType !== 1) return null
  return e
}
//返回元素e的第n个兄弟元素
//如果n为正,返回后续的第n个兄弟元素
//如果n为负,返回之前的第n个兄弟元素
//如果n为o,返回本身
function sibling(e, n) {
  while (e && n !== 0) {
    //如果e未定义,即刻返回他
    if (n > 0) {
      if (e.nextElementSibling) {
        e = e.nextElementSibling
      } else {
        for (e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling);
      }
      n--
    } else {
      if (e.previoursElementSibling) e = e.previoursElementSibling
      else {
        for (e.previoursSibling; e && e.nodeType !== 1; e = e.previoursSibling);
      }
    }
  }
  return e
}
//返回元素的第n代子元素,如果不存在则为null
//负值n代表从后往前计数.0表示第一个子元素,er-1代表最后一个,-2代表倒数第二个,以此类推
function child(e, n) {
  if (e.children) {
    if (n < 0) n += e.children.length
    if (n < o) return null
    return e.children[n]
  }
  if (n >= 0) {
    if (e.firstElementChild) e = e.firstElementChild
    else {
      for (e = e.firstChild; e && e.nodeType !== 1; e = e.nextSibling);
    }
    return sibling(e, n)
  } else {
    if (e.lastElementChild) e = e.lastElementChild
    else {
      for (e = e.lastChild; e && e.nodeType !== 1; e = e.previousSibling);
    }
    return sibling(e, n + 1)
  }
}
//模拟兼容children
if (!document.documentElement.children) {
  Element.prototype._defineGetter_('children', function () {
    var kids = []
    for (var c = this.firstChild; c != null; c = c.nextSibling) {
      if (c.nodeType === 1) kids.push(c)
    }
    return kids
  })
}

//15.4 属性
// html元素由一个标签和一组称为属性的名/值对组成.
//hTMLElenmet定义了通用的HTTP属性如果idlang,dir属性,以及事件处理程序属性.特定的Element子类型为其元素定义了特定的属性.
//HTML属性名不缺分大小写,但是js属性名则大小写敏感,从html属性名转换到js属性名应该采用小写,但是属性名包含不止一个单词,则除了将第一个单词外的单词首字母大写.
//有些html属性名是js中的保留字,兑入这些属性为其加前缀"html",如果label的for属性,js中交htmlFor,例外,html的class属性在js中叫做className
//属性方法 setAttribute hasAttribute removeAttribute
//html5  data-xx="s" = > el.dataset={xx:'s'}  删除dataset属性 对应删除dom上的属性
//h5标准化了 outerHTML
// console.log(app.outerHTML)
//H5标准化了ie的特性 insertAdjacentHTML()方法,它将任意html标签字符串插入搭配指定元素相邻的位置,标记是第二参数,第一个参数定义相邻的精确含义."beforebegin","afterbegin","beforeend","afterend",//当前ff不支持
// app.insertAdjacentHTML('beforebegin', '<p>beforebegin</p>')
// app.insertAdjacentHTML('afterbegin', '<p>afterbegin</p>')
// app.insertAdjacentHTML('beforeend', '<p>afterend</p>')
// app.insertAdjacentHTML('afterend', '<p>afterend</p>')
//查询纯文本形式的额元素内容.标准方法使用Node的textContent属性来实现,兼容除ie外所有,可以用ie的Element的innerText的属性来代替,除了ff外都zhic.
//第一个参数,返回元素的textContent或者innerText,两个参数用value设置元素的内容
function textContent(element) {
  var content = element.textContent
  if (value === undefined) {
    if (content !== undefined) return content
    else return element.innerText
  } else {
    if (content !== undefined) element.textContent = value
    else element.innerText = value
  }
}
//script 元素的属性的中文本,内联的js标签(没有src属性的)有一个text属性来获取他们的文本,浏览器不显示js标签元素的内容,并且html解析器忽略脚本中的尖括号和星号,这使得js元素标签用来嵌入任意文本内容的一个理想的地方.简单的吧元素type的属性设置为某些值(如果 text/x-custom-data),就是标记为不可执行的js代码,这样做 js解释器会忽略该标本,但是 钙元素的将任然在文档树种,它的text属性还将返回数据给你,
function textContent(e) {
  var child,
    type,
    s = ''
  for (child = e.firstChild; child != null; child = child.nextsibling) {
    type = child.nodeType
    if (type === 3 || type === 4) {
      //CDATASection
      s += child.nodeValue
    } else if (type === 1) {
      //递归Element节点
      s += textContent(child)
    }
  }

  return s
}
//递归将n是text或cadata节点转为大写形式
function upcase(n) {
  if ((n, nodeType == 3 || n.nodeType == 4)) {
    n.data = n.data.toUpperCase() //格式正确就转化为大写
  } else {
    for (var i = 0; i < n.childNodes.length; i++) {
      upcase(n.childNodes[i])
    }
  }
}
//从指定的url中,异步的加载和执行脚本.
function loadasync(url) {
  var head = document.getElementsByTagName('head')[0]
  var s = document.createElement('script')
  s.src = url
  head.appendChild(s)
}
//  操作多个节点时的一种捷径,使用DocumentFragment.
//15.6.1  创建节点
// var nenode = document.createTextNode('text node content');
//Document 也定义了一些其他的工厂方法,如果不经常使用createComment().在15.6.4中使用了createDocumentFragment()方法.
//15.6.2 插入节点
//appendChild()或者insetBefore();insertBefore类似如已存在的节点,新节点将插入该节点的前面.第一个参数为插入的新节点,第二参数已存在的节点.第二参数为null,类似如appendchild的插入到父元素最后
//都在父元素上调用
// 将child节点插入到parent中,使其成为第n个子节点
function insertAt(parent, child, n) {
  if (n < 0 || n > parent.childNodes.length) throw new Error('invalid index')
  else if (n == parent.childNodes.length) parent.appendChild(child)
  else parent.insertBefore(child, parent.childNodes[n])
}
//如果调用appendChild()或insertBefore()将已存在的文档中的一个节点再次插入,那个节点将自动从替他当前位置上删除,并在新的位置重新插入:没必要显式删除该节点.
//表格的行排序
//根据表格的每行的第N个单元格的值,对弈第一个tbody中行进行拍讯
//如果存在comparator函数则使用它,否则按照字母表顺序进行拍讯
function sortrows(table, n, comparator) {
  var tbody = table.tBodies[0] //第一个tbody,可能是隐式创建的.
  var rows = tbody.getElementsByTagName('tr') //tbody中的所有行
  var rows = Array.prototype.slice.call(rows, 0) //真实数组中的快照
  rows.sort(function (row1, row2) {
    var cell1 = row1.getElementsByTagName('td')[n]
    var cell2 = row2.getElementsByTagName('td')[n]
    var val1 = cell1.textContent || cell1.innerText
    var val2 = cell2.textContent || cell2.innerText
    if (comparator) return comparator(val1, val2)
    if (val1 < val2) return -1
    else if (val1 > val2) return 1
    else return 0
  })
  //在tbody中按照他们的顺序吧行添加到最后
  //这将自动把他们从当前位置一走,故没有必要预先删除它们
  //如果tbody还包含除tr的其他元素,这些元素将会悬浮到顶部位置
  for (var i = 0; i < rows.length; i++) tbody.appendChild(rows[i])
}

//查找表格th假设只有一行,让它们可点击
//以便单机列标题,按该列进行排序
function makeSortable(table) {
  var headers = table.getElementsByTagName('th')
  for (var i = 0; i < headers.length; i++) {
    ;
    (function (n) {
      //闭包
      headers[i].onclick = function () {
        sortrows(table, n)
      }
    })(i)
  }
}
//removeChild() 父元素调用 删除子元素
//replaceChild() 第一个参数是新节点 第二个参数是需要替换的节点
//用innerHTML实现outHTML
//假设浏览器确实支持innerHTML，并且有个可以扩展的Element.prototype
//并且可以定义getter 和 setter
;
(function () {
  function outerHTMLGetter(value) {
    var container = document.createElement('div')
    container.appendChild(this.cloneNode(true))
    return container.innerHTMLl
  }

  function outerHTMLSetter(value) {
    var container = document.createElement('div')
    container.innerHTML = value
    while (container.firstChild)
      this.parentNode.insertBefore(container.firstChild, this)
    this.parentNode.removeChild(this)
  }
  //现在使用这两个函数作为所有elment对象的out特瑞html的属性的getter个setter
  //如果他存在就是用es5的defineProperty
  //否则 退而求其次，使用—_defineGetter_()和_defineSetter_(
  // if (Object.defineProperty) {
  //   Object.defineProperty(Element.prototype, 'outerHTML', {
  //     set: outerHTMLSetter,
  //     get: outerHTMLGetter,
  //     enumerable: false,
  //     configurable: true
  //   })
  // } else {
  //   Element.prototype._defineGetter_('outerHTMl', outerHTMLGetter)
  //   Element.prototype._definesetter_('outerHTMl', outerHTMLSetter)
  // }
})()

//15.6.4 使用DocumentFragment
//DocumentFragment 是一种特殊的Node，他作为其他节点的一个临时容器。
//创建
var frag = document.createDocumentFragment()
//想document系欸但一个一样，DocumentFragment也是独立的，而不是其他文档的一部分，他的父元素总为null但是他可以有人一多的子节点，可以使用appendchild和insertBefore
//DocumentFragment的特殊之处在于它使得一组节点被当作ige节点对待，如果给appendChild的insertBefore或replaceChild传递一个DocumentFragment，其实是将该文档片段的所有子节点插入到文档中，而不是片段本身。（文档片段中所有子节点其实从片段移动到文档中，文档片段清空以便重用）
//下面是倒叙排序
function reverse(n) {
  //川江一个DocumentFragment作为临时容器
  var f = document.createDocumentFragment()
  //从后到前循环子节点，将么一个子节点移动到文档片段中
  //n的最后一个节点变成f的第一个节点，反之亦然
  //注意 给f添加一个节点，该节点惠子哦对那个从n中移除。
  while (n.lastChild) f.appendChild(n.lastChild)
  n.appendChild(f)
}

//使用innerhtml实现insertAdjacentHTMl();
//本模块为不支持他的浏览器定义了element。insertAdhacentHTML
//还定义了一些可以移植的HTML插入函数，他们的名字比他insertAdjacentHTML更符合逻辑
var Insert = function () {
  //如果元素有原声的insertAdjacentHTML
  //在4个函数名更明了的html插入函数中使用他
  if (document.createElement('div').insertAdjacentHTML) {
    return {
      before: function (e, h) {
        e.insertAdjacentHTML('beforebegin', h)
      },
      after: function (e, h) {
        e.insertAdjacentHTML('afterend', h)
      },
      atStart: function (e, h) {
        e.insertAdjacentHTML('afterbegin', h)
      },
      atEnd: function (e, h) {
        e.insertAdjacentHTML('beforeend', h)
      }
    }
  } else {
    //否则无原声的insertAdjacentHTML
    //实现同样的四个插入函数，并且使用它们来定义insertAdjacentHTML
    //首先，定义一个工具函数，传入HTML字符串，返回一个DocumentFragment
    //它包含解析后的html表示
    function fragment(html) {
      var elt = document.createElement('div')
      var frag = document.createDocumentFragment()
      elt.innerHTML = html
      while (elt.firstChild) frag.appendChild(elt.firstChild)
      return frag
    }

    var Insert = {
      before: function (elt, html) {
        elt.parentNode.insertBefore(fragment(html), elt)
      },
      after: function (elt, html) {
        elt.parentNode.insertBefore(fragment(html), elt.nextSibling)
      },
      atStart: function (elt, html) {
        elt.parentNode.insertBefore(fragment(html), elt.firstChild)
      },
      atEnd: function (elt, html) {
        elt.parentNode.appendChild(fragment(html))
      }
    }

    //基于以上的函数实现insertAdjacentHTML
    Element.prototype.insertAdjacentHTML = function (pos, html) {
      switch (pos.toLowerCase()) {
        case 'beforebegin':
          return Insert.before(this, html)
          break
        case 'afterend':
          return Insert.after(this, html)
          break
        case 'afterbegin':
          return Insert.atStart(this, html)
          break
        case 'beforeend':
          return Insert.atEnd(this, html)
          break
        default:
          break
      }
    }
  }
  return Insert
}

//生成目录表
//这个模块注册一个可以页面加载完成后自动运行的匿名函数，当执行时，查找id为toc的语速，如果不存在就创建一个
//生成的toc目录应该具有自己的css央视
//同样为不能层级的目录标题定义不同的样式
//查询窗口滚动条的位置
function getScrollOffsets(w) {
  w = w || window
  //除了Ie8及更早的版本意外，其他浏览器都能用到
  if (w.pageXOffset != null) return {
    x: w.pageXOffset,
    y: pageYOffset
  }
  //对标准模式下的IE（或任何浏览器）
  var d = w.document
  if (document.compatMode == 'CSS1Compat')
    return {
      x: d.documentElement.scrollLeft,
      y: d.documentElement.scrollTop
    }
  return {
    x: d.body.scrollLeft,
    y: d.body.scrollTop
  }
}
//查询窗口的视口大小
function getViewportSize(w) {
  //使用制定的窗口，如果不带参数则使用当前窗口
  w = w || window
  //除了ie8及更早的版本外
  if (w.innerWidth != null) return {
    w: w.innerWidth,
    h: w.innerHeight
  }
  //对于标准模式下的IE及其他
  var d = w.document
  if (document.compatMode == 'CSS1Compat')
    return {
      w: d.documentElement.clientWidth,
      h: d.documentElement.clientHeight
    }
  //对于怪异模式下的浏览器
  return {
    w: d.body.clientWidth,
    h: d.body.clientHeight
  }
}
//查询元素的集合尺寸
// getBoundingClientRect() 返回一个包含padding+border的 矩形区域视口坐标
//getClientRect()  //查询内敛元素每个独立的矩形
//不是实时的，返回的是获取的时候的静态快照，滚动和改变窗口不会更新他们
//判定元素在耨点
//document.elementFromPoint()传递xy坐标（使用视口坐标而非文档坐标）

//滚动
//scroll（）
//scrollTo()
//scrollBy()
//scrollIntoView()

//低版本兼容
//offsetwidth
//offsetHeight
//offsetTop
//offsetLeft
//offsetParent
//clientx4wi
//scrollx4
function getElementPos(elt) {
  var x = 0,
    y = 0
  for (var e = elt; e != null; e = e.offsetParent) {
    x += e.offsetLeft
    y += e.offsetTop
  }
  //循环所有祖先元素，减去滚动的偏移量
  //也减去的主滚动条，并转化为视口坐标
  for (var e = elt.parentNode; e != null && e.nodeType == 1; e = e.parentNode) {
    x -= e.scrollLeft
    y -= e.scrollTop
  }
  return {
    x: x,
    y: y
  }
}
//查询选取的文本
function getSelectedText() {
  if (window.getSelection) return window.getSelection().toString()
  //h5标准
  else if (document.selection) return document.selection.createRange().text //ie特有的技术
}
//收藏书签后 该链接和它包含的javascript url及变成了一个数千工具
/* <a href="javascript:var q;if(window.getSelection)q=window.getSelection().toString();else if (document.selection) q = document.selection.createRange().text;void window.open('http:\\xxx'+q)"> </a> */
//编辑属性 contenteditable和designMode

//定义多行文本编辑命令
//使用Document对象的execCommand（）方法。//参数 "bold" "subscript" "justifycenter" "insertimage" "createlink"
// 理论上 第二参数为true 浏览器回自动提示用输入所需之，但是实际上 为了提高可移植性，你应该主动提示，并将第二个参数设置false，用户输入的值作为第三个参数
function blod() {
  document.execCommand('bold', false, url)
}

function link() {
  var url = prompt('enter link des')
  if (url) document.execCommand('createlink', false, url)
}
//execCommand()所支持的命令通常是由工具栏的按钮触发的
//可以使用document.queryCommandSupport()传递命令名来查询浏览器是否支持该命令
//如 "fontname" ,如果选取区域有多种字体,返回值就不准确,可以使用document.queryCommandIndeterm()来检测这种情况.

//不同的浏览器实现了不同的编辑命令组合,只有一少部分命令得到了很好的支持,如"bold", "italic", "createlink" "undo" "redo".
//H5草案定义了:bold insertLineBreak selectAll createLink insertOrderedList inserOrderedList subscript,delete,insertUnorderedList,superscript,formatBlock,insertParagraph,undo,forwardDelete,insertText,unlink,insertImage,italic,italic,unselect,insertHTML,redo.