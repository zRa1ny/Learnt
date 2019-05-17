// *********************** web浏览器中的 JavaScript  *********************** 
// window 对象
//14.1 使用setTimeout() 和setInterval() 
//14.2  使用lacation属性
//14.3 介绍historty属性
//使用navigator获取浏览器厂商和版本信息,以及使用screen属性查询窗口尺寸
//14.5 展示了使用alert(),prompt(),confirm()方法显示简单的文本对话框,以及使用showModaldialog()显示html对话框
//14.6节 讲解如何注册onerror处理法
//14.7 讲解元素的id和name作为window对象的属性来使用
//14.8 讲解如何打开和关闭浏览器创客,以及如何编写可以在多个窗口和嵌套窗口中工作的js代码


//14.1 计时器
//14.2  window.loacation
//这个对象有其他属性 --protocol , host , hostname , prot , pathnamw 和search,href,hash
function urlArgs() {
  var args = {};
  var query = location.search.substring(1) //去除?
  var pairs = query.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pos = pairs[i].indexOf("=");
    if (pos == -1) continue; //没有找到=,跳过
    var name = pairs[i].substring(0, pos)
    var value = pairs[i].substring(pos + 1)
    value = decodeURIComponent(value);
    args[name] = value;
  }
  return args;
}
//location 对象的assign()方法可以使窗口载入并显示你指定的url中文档,replace()的方法也类似.,但是它在载入之前会从浏览的历史中把当前的文档删除.
//如果浏览器不支持某些功能特性,就是replace重定向到一个不需要ajax的静态页面
//reload()方法,可以让浏览器重新载入当前文档
//还可以将url直接付给loaction属性进行跳转
//纯粹的片段标识符是相对url的一种类型,他不会让浏览器载入新文档,但是会使他滚到文档的某个位置.如果location="#top",会滚到top的id的元素处.
//location的分解属性时可写的,对他们重新复制会改变url的位置,并导致浏览器载入一个新的文档.(如果改变的是hash属性,则在当前文档中进行跳转)
//loaction.search  = "?page="+(pagenum+1);//载入下一页页面

//14.3 浏览历史 history

//14.4 浏览器和屏幕信息
//window对象的navigator和screen属性.
//navigator对象的命名是为了纪念netscape之后navigator浏览器,不过所有其他浏览器都支持他(ie还支持clientInformation属性)
//appName  web浏览器的全称 在ie中 "Microsoft Internet Explorer",在火狐中 该属性魏"Netscape",为了兼容现存的浏览器嗅探代码,其他浏览器通常也取值为 "Netscape"
//appVersion 此属性通常以数字开始,并且包含浏览器厂商和版本的详细字符串.字符串通常是4.0 5.0,表示它是第四和第五代兼容的浏览器.没有标准格式
//userAgent 浏览器在他的USER-AGENT HTTP头部中发送的字符串,这个属性通常包括appVersion中的所有信息,并且长城也可能包含其他的细节,和appVersion一样没有标准格式.由于这个额属性包含绝大部分信息,因此浏览器嗅探代码通常用它来进来嗅探.
//platform  在其上运行浏览器的操作系统(并且用可能是硬件)的字符串.
//onLine 如果存在的话,表示浏览器当期是否连接到网络,应用程序可能希望在离线状态下把状态保存在本地.
//geolacation 用于确定用户地理位置的信息接口
//javaEnabled()   一个非标准的方法,当浏览器可以运行java小程序时返回true
//cookieEnable() 非标准方法,如果浏览器可以保存永久的cookie时 返回true 当cookie配置为是具体情况而定时可能返回不正确的值
//Screen对象
//提供有关窗口显示的大小和可用的颜色数量的信息.
//属性width和height指定的是以像素为单位的窗口大小.
//availWidth和availHeight指定的实际可用的显示大小
//属性colorDepth指定的是显示BPP(bits-per-pixel)值,典型的值有16,24,32.
//window.screen属性和它引用的screen对象都是非标准但是广泛实现的,可以用screen对象来确定web应用是否运行在一个小屏幕的设备上,比如上网本.
//14.5 对话框
//对话框 alert()  confirm() prompt()
// do {
//   var name = prompt('what is your name?') //得到一个字符串的输入
//   var correct = confirm("you entered '" + name + "'.\n Click Okay to peoceed or Cancel to re-enter") //得到一个布尔值

// } while (!correct) {
//   alert("hello," + name) //输出纯文本消息
// }
// confirm和prompt是阻塞的,而且大部分浏览器alert也是阻塞的.
//除了此之外还有一个更复杂的方法 showModalDialog(),显示一个包含hrml格式的 "模态对话框",可以给他传入参数以及从对话框中返回值.
//第一个参数是指定提供对话框的html内容的url,第二只是一个任意值(数组和对象均可),这个值在对话框里的脚本可以通过window.dialogArguments属性访问.第三个参数一个非标准的列表,包括以分好隔开的name=valued对,如果提供了这个参数,可以胚子对话框的尺寸或其他属性.用 "dialogwidth" 和 "dialogheight"来设置对话框口大小,用 "resizable=yes"来允许用户改变窗口大小.
//用这个方法显示的窗口是模态的,知道窗口关闭之前不会反悔,当窗口关闭后,window.returnValue属性的值就是这个方法返回值.
// var p = showModalDialog("multiprompt.html", ["Enter 3D ponit cooradinates", "x", "y", "z"], "dialogwidth:400;dialogheight:300;resizable:yes")
// var p = window.open("c14/multiprompt.html", ["Enter 3D ponit cooradinates", "x", "y", "z"], "dialogwidth:400;dialogheight:300;resizable:yes")
//demo.html+test.html
//14.6 错误处理
//Window对象的onerror是一个错误处理郑旭,当未捕获的异常传到调用栈上时就会调用他,并把错误消息输出到浏览器的javascript控制台上.如果给这个属性赋予一个函数,name只要这个窗口中发生了js错误,就会调用该函数,他就成了窗口的错误处理程序.
//由于历史原因,onerror的事件处理函数的调用通过三个字符串参数,而不是通过通常传递的一个事件对象.window.onerror第一个参数描述错误的一条消息,第二个参数一个字符串,他存放应发错误的js代码所在文档的url第三个参数是发生错误的行数.
//除了这是哪个参数外,onerror处理程序的返回值也很重要,如果返回false,他通知浏览器事件处理程序已经处理了错误,不需要其他操作了,换句话说,浏览器不应该显示它自己的错误消息.遗憾的是,火狐的错误处理程序需要返回true来表示它已经处理了错误.
//
//14.7 作为window对象属性的文档元素
//如果html中用id来为元素命名,并且如果window对象没有这个名字的属性,window对象会赋予一个属性,他的名字是id属性的值,而他们的值执行表示文档员的htmlElement对象

//14.8.1 打开和关闭窗口
//是通open()方法打开一个新的浏览器窗口或者标签页,载入指定url到新的或者已经存在的窗口中,并返回代表那个窗口的window的对象.
//有四个可选参数,open的第一个参数是要新窗口中显示的文档的url,如果这个参数省略了也可以是空字符串,name会使用口感也的url about:black
//第二个参数是新打开窗口的名字(并且脚本允许跳转到那个窗口),会直接使用已存在的窗口.否则会打开时新窗口.并且将这个指定的名字付给.如果省略次参数,会使用指定的名字_blank打开一个新的未命名的窗口
//需要注意的,脚本无法通过简单的猜测窗口的名字来操控这个窗口中的web应用,只有设置了允许导航才可以.宽泛的讲,当且仅当窗口包含的文档来自相同的源或者是这个脚本打开了那个窗口(或者递归地打开了窗口中打开的窗口),监本才能通过名字来指定存在的窗口,还有如果一个窗口是内嵌在另一个窗口里的窗体,他们的脚本之间就可以相互导航.这种情况可是用保留字名字 "_top"(d顶级祖先窗口)和 "_parent"(直接父级窗口)来获取浏览上下文.
// window.onbeforeunload = function () {
//   alert("===onbeforeunload===");
//   if (event.clientX > document.body.clientWidth && event.clientY < 0 || event.altKey) {
//     alert("你关闭了浏览器");
//   } else {
//     alert("你正在刷新页面");
//   }
// }