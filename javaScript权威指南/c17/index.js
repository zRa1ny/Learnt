// *********************** 事件处理 ***********************
//当文档准备就绪时调用函数
var whenReady = (function () {
  var funcs = [] //获得事件时,要运行的函数
  var ready = false

  function handler(e) {
    //如果已经运行一次,只需返回
    if (ready) return
    //如果发生了readystatechange事件
    //但是其状态不是"complete"的话,name文档尚未准备好
    if (e.type === 'readystatechange' && document.readyState !== 'complete')
      return
    //运行注册函数
    //注意每次都要甲酸funcs.length
    //以防这些函数的调用可能会注册更多的函数
    for (var i = 0; i < funcs.length; i++) {
      funcs[i].call(document)
    }
    ready = true
    funcs = null
  }

  //为接收到的任何事件注册处理程序
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', handler, false)
    document.addEventListener('readystatechange', handler, false)
    window.addEventListener('load', handler, false)
  } else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', handler)
    window.attachEvent('onload', handler)
  }
  //返回whenReady()函数
  return function whenReady(f) {
    if (ready) f.call(document)
    else funcs.push(f)
  }
})()
//drag.js
//定义一个drag函数,用于mousedown事件处理程序的调用
//随后的mousemove事件将移动指定元素,mouseup事件将终止拖动
//这些实现能同标准和ie两种事件模型一起工作
//他需要用到本书其他地方的介绍的getScrollOffsets()方法
//elementToDrag:mousedown元素
//它必须是绝对定位的元素
//event:mousedown事件对象
function drag(elementToDrag, event) {
  //初始鼠标位置转为文档坐标
  var scroll = getScrollOffsets() //来自15章的工具函数
  var startX = event.clientX + scroll.x
  var startY = event.clientY + scroll.y
  var origX = elementToDrag.offsetLeft
  var origY = elementToDrag.offsetTop
  var deltaX = startX - origX
  var deltaY = startY - origY
  //注册响应接着mousedown事件发生的mousemove和mouseupshijian的事件处理程序;
  if (document.addEventListener) {
    document.addEventListener('mousemove', moveHandler, true)
    document.addEventListener('mouseup', upHandler, true)
  } else if (document.attachEvent) {
    elementToDrag.setCapture()
    elementToDrag.attachEvent('onmousemove', moveHandler)
    elementToDrag.attachEvent('onmouseup', upHandler)
    elementToDrag.attachEvent('onlosecapture', upHandler) // 将鼠标丢失当做mouseup
  }

  if (event.stopPropagation) event.stopPropagation()
  else event.cancelBubble = true

  if (event.preventDefault) event.preventDefault()
  else event.returnValue = false

  function moveHandler(e) {
    if (!e) e = window.event
    var scorll = getScrollOffsets()
    elementToDrag.style.left = e.clientX + scorll.x - deltaX + 'px'
    elementToDrag.style.top = e.clientY + scorll.y - deltaY + 'px'
    if (e.stopPropagation) e.stopPropagation()
    else e.cancelBubble = false
  }

  function upHandler(e) {
    if (!e) e = window.event
    if (document.removeEventListener) {
      document.removeEventListener('mouseup', upHandler, true)
      document.removeEventListener('mousemove', moveHandler, true)
    } else if (document.detachEvent) {
      elementToDrag.detachEvent('onlosecapture', upHandler)
      elementToDrag.detachEvent('onmouseuo', upHandler)
      elementToDrag.detachEvent('onmousemove', moveHandler)
      elementToDrag.releaseCaptrue()
    }

    if (e.stopPropagation) e.stopPropagation()
    else e.cancelBubble = false
  }
}

//鼠标滑轮事件
function enclose(content, framewidth, frameheight, contentX, contentY) {
  framewidth = Math.max(framewidth, 50)
  frameheight = Math.max(frameheight, 50)
  contentX = Math.min(contentX, 0) || 0
  contentY = Math.min(contentY, 0) || 0

  var frame = document.createElement('div')
  frame.className = 'enclosure'
  frame.style.width = framewidth + 'px'
  frame.style.height = frameheight + 'px'
  frame.style.overflow = 'hidden'
  frame.style.boxSizing = 'border-box'
  frame.style.webkitBoxSizing = 'border-box'
  frame.style.MozBoxSizing = 'border-box'

  content.parentNode.insertBefore(frame, content)
  frame.appendChild(content)

  content.style.position = 'relative'
  content.style.left = contentX + 'px'
  content.style.top = contentY + 'px'

  var isMacWebkit =
    navigator.userAgent.indexOf('Macintosh') !== -1 &&
    navigator.userAgent.indexOf('Webkit') !== -1
  var isFirefox = navigator.userAgent.indexOf('Gecko') !== -1

  frame.onwheel = wheelHandler
  frame.onmousewheel = wheelHandler
  if (isFirefox) frame.addEventListener('DOMMouseScroll', wheelHandler, false)

  function wheelHandler(event) {
    var e = event || window.event
    var deltaX = e.deltaX * -30 || e.wheelDeltaX / 4 || 0
    var deltaY =
      e.deltaY * -30 ||
      e.wheelDeltaY / 4 ||
      (e.wheelDeltaY === undefined && e.wheelDelta / 4) ||
      e.detail * -10 ||
      0
    if (isMacWebkit) {
      deltaX /= 30
      deltaY /= 30
    }

    if (isFirefox && e.type !== 'DOMMouseScroll') {
      frame.removeEventListener('DOMMouseScroll', wheelHandler.false)
    }

    var contentbox = content.getBoundingClientRect()
    var contentwidth = contentbox.right - contentbox.left
    var contentheight = contentbox.bottom - contentbox.top
    if (e.altKey) {
      //按下alt键 调整frame大小
      if (deltaX) {
        framewidth -= deltaX
        framewidth = Math.min(framewidth, contentwidth) //新宽度 但是不能比内容大;
        framewidth = Math.max(framewidth, 50) //也不能大于50
        frame.style.width = framewidth + 'px'
      }

      if (deltaY) {
        frameheight -= deltaY
        frameheight = Math.min(frameheight, contentheight) //新宽度 但是不能比内容大;
        frameheight = Math.max(frameheight - deltaY, 50) //也不能大于50
        frame.style.height = frameheight + 'px'
      }
    } else {
      if (deltaX) {
        var minoffset = Math.min(framewidth - contentwidth, 0)
        contentX = Math.max(contentX + deltaX, minoffset)
        contentX = Math.min(contentX, 0)
        content.style.left = contentX + 'px'
      }
      if (deltaY) {
        var minoffset = Math.min(frameheight - contentheight, 0)
        contentY = Math.max(contentY + deltaY, minoffset)
        contentY = Math.min(contentY, 0)
        content.style.top = contentY + 'px'
      }
    }

    if (e.preventDefault) e.preventDefault()
    if (e.stopPropagation) e.stopPropagation()
    e.cancelBubble = true
    e.returnValue = false
    return false
  }
}
// enclose(document.getElementById('content'), 400, 200, -200, -300)
whenReady(function () {
  var clock = document.getElementById('clock')
  var icon = new Image()
  icon.src = 'http://pic31.nipic.com/20130804/7487939_090818211000_2.jpg'

  function displayTime() {
    var now = new Date()
    var hrs = now.getHours(),
      mins = now.getMinutes()
    if (mins < 10) mins = '0' + mins
    clock.innerHTML = hrs + ':' + mins
    setTimeout(displayTime, 60000)
  }
  displayTime()
  clock.draggable = true
  clock.ondragstart = function (event) {
    var event = event || window.event
    //dataTransfer 属性时拖放api
    var dt = event.dataTransfer
    //把Date()构造函数用作一个返回时间戳字符串的函数
    dt.setData('Text', Date() + '\n') //设置拖拽数据
    // 在支持的浏览器中,告诉它拖动图标来表现时间戳
    //没有这行代码,浏览器也可以使用时钟文本图像作为拖动的值.
    if (dt.setDragImage) dt.setDragImage(icon, 0, 0) //设置拖拽的时候的样式
  }
})
//作为拖放目标和拖放源的列表
//dnd api相当复杂 且浏览器的兼容不完全
//这个例子基本正确,但是每个浏览器会有一点不同,每个似乎都有自身独有bug
//这些代码不会尝试浏览器特有的姐姐也方案
whenReady(function () {
  var lists = document.getElementsByTagName('ul')
  var regexp = /\bdnd\b/
  for (var i = 0; i < lists.length; i++) {
    // if (regexp.test(lists[i].className))
    dnd(lists[i])
  }

  function dnd(list) {
    var original_class = list.className
    var entered = 0
    //当拖放对象首次进入列表的时候调用这个处理程序
    //他会检查拖放对象包含的数据格式它是否能处理
    //如果能,他返回false表示有兴趣反之
    //在这种情况下,他会高亮拖放目标,让用户知道感兴趣
    list.ondragenter = function (e) {
      e = e || window.event
      var from = e.relatedTarget
      //dragenter和dragleave事件冒泡
      //它使得在像ul元素由li子元素的情况下
      //何时显示或者取消高亮显示变得棘手
      //在定义relatedTarget的浏览器中,我们能跟踪它
      //否则,我们需要通过统计进入和离开的次数
      //如果从列表外面进入或者第一次进入
      //name需要做一些处理
      entered++
      if ((from && !ischild(from, list)) || entered == 1) {
        //所有的DnD信息都在dataTransfer对象上
        var dt = e.dataTransfer
        //dt.types对象列出了可用的拖放数据的类型或者格式
        //html5定义了这个对象有contains()方法
        //在一些浏览器中,它是一个由indexOf()方法的数组
        //在ie8以及之前的版本中,他根本不存在
        var types = dt.types //可用数据格式是什么
        //如果没有任何类型的数据或者可用数据是纯文本格式
        //name高亮显示列表让用户知道我们正在监听拖放
        //同事返回false让浏览器知晓
        if (
          !types ||
          (types.contains && types.contains('text/plain')) ||
          (types.indexOf && types.indexOf('text/plain') != -1)
        ) {
          list.className = original_class + ' droppable'
          return false
        }
        //如果无法识别数据
        return
      }
      return false //如果不是第一次进入 我们继续保持兴趣
    }

    //当我们鼠标悬停在列表上的时候,会调用这个处理程序
    //我们必须定义在这个处理程序并返回false,否则这个拖放操作将取消
    list.ondragover = function (e) {
      return false
    }

    //当拖放对象移除列表或从妻子元素移出,会调用这个处理程序
    //如果我们真正离开这个列表(不是仅仅从一个列表项到另一个)
    //name取消高亮显示他
    list.ondragleave = function (e) {
      e = e || window.event
      var to = e.relatedTarget
      //如果我们要到列表意外的元素或者打破离开和进入次数的平衡
      //那么取消高亮显示列表
      entered--
      if ((to && !ischild(to, list)) || entered <= 0) {
        list.className = original_class
        entered = 0
      }
      return false
    }

    //当实际放置的时候,会调用这个程序
    //我们会接手放下的文本并将其放到一个新的li中
    list.ondrop = function (e) {
      e = e || window.event
      //获得放置的纯文本数据
      //Text 是"text/plain"的昵称
      //ie 不支持text/plain 支持text
      var dt = e.dataTransfer
      var text = dt.getData('Text')
      if (Text) {
        var item = document.createElement('li')
        item.draggable = true
        item.appendChild(document.createTextNode(text))
        list.appendChild(item)
        list.className = original_class
        entered = 0
        return false
      }
    }

    //是所有原始列表项都可拖动
    var items = list.getElementsByTagName('li')
    for (var i = 0; i < items.length; i++) {
      items[i].draggable = true
      // console.log(items[i])
    }
    //为拖动列表项注册事件处理程序
    //注意 我们把事件处理程序放在列表上
    //让事件从列表项向上冒泡

    //当在列表中拖动对象,会调用这个处理程序
    list.ondragstart = function (e) {
      var e = e || window.event
      var target = e.target || e.srcElement
      if (target.tagName !== 'LI') return false
      var dt = e.dataTransfer
      var text = dt.setData('Text', target.innerText || target.textContent)
      //设置允许复制和移动这些数据
      dt.effectAllowed = 'copyMove'
    }
    //当成功放置后,将调用这个处理程序
    list.ondragend = function (e) {
      var e = e || window.event
      var target = e.target || e.srcElement
      //如果这个拖放操作是move,name要删除列表项
      //在ie8中将是none,除非在之前ondrop中设置他为move
      //但是ie强制设置move会组织其他浏览器给用户选择复制还是移动的机会
      if (e.dataTransfer.dropEffect === 'move') {
        target.parentNode.removeChild(target)
      }
    }
    //这是在ondragenter和ondragleave使用的工具函数
    //如果a是b的子元素就返回true
    function ischild(a, b) {
      for (; a; a = a.parentNode)
        if (a === b) return true
      return false
    }
  }
})


whenReady(function () {
  var inputelts = document.getElementsByTagName('input');
  for (var i = 0; i < inputelts.length; i++) {
    var elt = inputelts[i];
    if (elt.type != "text" || !elt.getAttribute('data-allowed-chars')) continue;
    if (elt.addEventListener) {
      elt.addEventListener("keypress", filter, false)
      elt.addEventListener("textInput", filter, false)
      elt.addEventListener("textiput", filter, false)
    } else {
      //不支持addlistener
      elt.attachEvent("onkeypress", filter)
    }
  }

  function filter(event) {
    var e = event || window.ondeviceorientation;
    var target = e.target || e.srcElement;
    var text = null;
    if (e.type === "textinput" || e.type === "textInput") text = e.data;
    else {
      var code = e.charCode || e.keyCode;
      if (code < 32 || e.charCode == 0 || e.ctrlKey || e.altKey) return;
      var text = String.fromCharCode(code)
    }
    var allowed = target.getAttribute("data-allowed-chars");
    var messageid = target.getAttribute("data-messageid")
    if (messageid) var messageElement = document.getElementById(messageid);
    for (var i = 0; i < text.length; i++) {
      var c = text.charAt(i);
      if (allowed.indexOf(c) == -1) {
        if (messageElement) {
          messageElement.style.visibility = "visible";
          messageElement.innerHTML = c + "=>不符合监测结果"
        }
        if (e.preventDefault) e.preventDefault()
        if (e.returnValue) e.returnValue = false;
        return false
      }
    }
    if (messageElement) messageElement.style.visibility = "hidden"
  }
})

//使用propertychange事件探测文本输入
function froceToUpperCase(element) {
  if (typeof element === 'string') element = document.getElementById(element);
  element.oninput = upcase;
  element.onpropertychange = upcaseOnPropertyChange;
  //简易按理:用于input事件的处理程序
  function upcase(event) {
    this.value = this.value.toUpperCase();
  }

  function upcaseOnPropertyChange(event) {
    var e = event || window.event;
    if (e.propertyName === "value") {
      //移除onpropertychange处理程序,避免循环调用
      this.onpropertychange = null;
      //改变值
      this.value = this.value.toUpperCase();
      //恢复调用
      this.onpropertychange = upcaseOnPropertyChange;
    }
  }
}

//键盘事件
//This is the constructor function
function Keymap(bindings) {
  this.map = {}; // Define the key identifier->handler map
  if (bindings) { // Copy initial bindings into it
    for (name in bindings) this.bind(name, bindings[name]);
  }
}

// Bind the specified key identifier to the specified handler function
Keymap.prototype.bind = function (key, func) {
  this.map[Keymap.normalize(key)] = func;
};

// Delete the binding for the specified key identifier
Keymap.prototype.unbind = function (key) {
  delete this.map[Keymap.normalize(key)];
};

// Install this Keymap on the specified HTML element
Keymap.prototype.install = function (element) {
  // This is the event-handler function
  var keymap = this;

  function handler(event) {
    return keymap.dispatch(event, element);
  }

  // Now install it
  if (element.addEventListener)
    element.addEventListener("keydown", handler, false);
  else if (element.attachEvent)
    element.attachEvent("onkeydown", handler);
};

// This method dispatches key events based on the keymap bindings.
Keymap.prototype.dispatch = function (event, element) {
  // We start off with no modifiers and no key name
  var modifiers = ""
  var keyname = null;

  // Build the modifier string in canonical lowercase alphabetical order.
  if (event.altKey) modifiers += "alt_";
  if (event.ctrlKey) modifiers += "ctrl_";
  if (event.metaKey) modifiers += "meta_";
  if (event.shiftKey) modifiers += "shift_";

  // The keyname is easy if the DOM Level 3 key property is implemented:
  if (event.key) keyname = event.key;
  // Use the keyIdentifier on Safari and Chrome for function key names
  else if (event.keyIdentifier && event.keyIdentifier.substring(0, 2) !== "U+")
    keyname = event.keyIdentifier;
  // Otherwise, use the keyCode property and the code-to-name map below
  else keyname = Keymap.keyCodeToKeyName[event.keyCode];

  // If we couldn't figure out a key name, just return and ignore the event.
  if (!keyname) return;

  // The canonical key id is modifiers plus lowercase key name
  var keyid = modifiers + keyname.toLowerCase();

  // Now see if the key identifier is bound to anything
  var handler = this.map[keyid];

  if (handler) { // If there is a handler for this key, handle it
    // Invoke the handler function
    var retval = handler.call(element, event, keyid);

    // If the handler returns false, cancel default and prevent bubbling
    if (retval === false) {
      if (event.stopPropagation) event.stopPropagation(); // DOM model
      else event.cancelBubble = true; // IE model
      if (event.preventDefault) event.preventDefault(); // DOM
      else event.returnValue = false; // IE
    }

    // Return whatever the handler returned
    return retval;
  }
};

// Utility function to convert a key identifier to canonical form.
// On non-Macintosh hardware, we could map "meta" to "ctrl" here, so that
// Meta-C would be "Command-C" on the Mac and "Ctrl-C" everywhere else.
Keymap.normalize = function (keyid) {
  keyid = keyid.toLowerCase(); // Everything lowercase
  var words = keyid.split(/\s+|[\-+_]/); // Split modifiers from name
  var keyname = words.pop(); // keyname is the last word
  keyname = Keymap.aliases[keyname] || keyname; // Is it an alias?
  words.sort(); // Sort remaining modifiers
  words.push(keyname); // Add the normalized name back 
  return words.join("_"); // Concatenate them all
};

Keymap.aliases = { // Map common key aliases to their "official" 
  "escape": "esc", // key names used by DOM Level 3 and by 
  "delete": "del", // the key code to key name map below.
  "return": "enter", // Both keys and values must be lowercase here.
  "ctrl": "control",
  "space": "spacebar",
  "ins": "insert"
};

// The legacy keyCode property of the keydown event object is not standardized
// But the following values seem to work for most browsers and OSes.
Keymap.keyCodeToKeyName = {
  // Keys with words or arrows on them
  8: "Backspace",
  9: "Tab",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Esc",
  32: "Spacebar",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "Left",
  38: "Up",
  39: "Right",
  40: "Down",
  45: "Insert",
  46: "Del",

  // Number keys on main keyboard (not keypad)
  48: "0",
  49: "1",
  50: "2",
  51: "3",
  52: "4",
  53: "5",
  54: "6",
  55: "7",
  56: "8",
  57: "9",

  // Letter keys. Note that we don't distinguish upper and lower case
  65: "A",
  66: "B",
  67: "C",
  68: "D",
  69: "E",
  70: "F",
  71: "G",
  72: "H",
  73: "I",
  74: "J",
  75: "K",
  76: "L",
  77: "M",
  78: "N",
  79: "O",
  80: "P",
  81: "Q",
  82: "R",
  83: "S",
  84: "T",
  85: "U",
  86: "V",
  87: "W",
  88: "X",
  89: "Y",
  90: "Z",

  // Keypad numbers and punctuation keys. (Opera does not support these.)
  96: "0",
  97: "1",
  98: "2",
  99: "3",
  100: "4",
  101: "5",
  102: "6",
  103: "7",
  104: "8",
  105: "9",
  106: "Multiply",
  107: "Add",
  109: "Subtract",
  110: "Decimal",
  111: "Divide",

  // Function keys
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  124: "F13",
  125: "F14",
  126: "F15",
  127: "F16",
  128: "F17",
  129: "F18",
  130: "F19",
  131: "F20",
  132: "F21",
  133: "F22",
  134: "F23",
  135: "F24",

  // Punctuation keys that don't require holding down Shift
  // Hyphen is nonportable: FF returns same code as Subtract
  59: ";",
  61: "=",
  186: ";",
  187: "=", // Firefox and Opera return 59,61 
  188: ",",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
};