// ***********************  html5Api  *********************** 
//地理位置
{
  // navigator.geolocation.getCurrentPosition() //获取用户当前坐标位置 接收回调
  // navigator.geolocation.watchPosition() //获取当前位置,并且不断监视当前位置,一旦用户位置发生变化,就会调用指定的回调函数.接收回调
  // navigator.geolocation.clearWatch() //停止关闭
  // navigator.geolocation.getCurrentPosition(pos => {
  //   console.log(pos)
  // })
  document.body.appendChild(getmap())

  function getmap() {
    //检查是否支持地理adpi
    if (!navigator.geolocation) throw "Geolocation not supported"
    //串讲一个新的img元素,并开始请求地理位置
    //img元素显示包含当前位置的地图,然后再将返回该图片
    var image = document.createElement("img");
    navigator.geolocation.getCurrentPosition(setMapURL)
    return image

    function setMapURL(pos) {
      var latitude = pos.coords.latitude; //经度
      var longitude = pos.coords.longitude; //伟度
      var accuracy = pos.coords.accuracy; //米
      //狗仔一个url  用于请求一张显示抢位置的静态Google地图
      // var url = "http://maps.geogle.com/maps/staticmap?center="  "&size=640x640&sensor=true";
      // var url = "http://api.map.baidu.com/staticimage/v2?ak=IWG1zGktnr14Zyy5yynIoU5UDxrpcqzq&mcode=666666&center=" + latitude + "," + longitude + "&width=300&height=200&zoom=11  "
      var url = "http://api.map.baidu.com/staticimage?width=400&height=300&center=" + longitude + "," + latitude
      var zoomlevel = 20;
      if (accuracy > 80) {
        //在低精度的情况下进行放大
        zoomlevel -= Math.round(Math.log(accuracy / 50) / Math.LN2)
        url += "&zoom=" + zoomlevel;
      }
      image.src = url;
    }
  }
}


//历史记录器
{
  //比较简单的历史记录管理技术
  //利用location.hash 和 hashchange
  //复杂的h5方法 history.pushState()和popstate事件   replaceState()
  //实现一个数字的小游戏
  var state, ui
  newgame()

  function newgame(playagain) {
    ui = {
      heading: null,
      prompt: null,
      input: null,
      low: null,
      mid: null,
      high: null,
    }

    for (var id in ui) ui[id] = document.getElementById(id);
    ui.input.onchange = handleGuess;
    window.onpopstate = popState;
    //生成一个随机的数字并初始化游戏状态
    state = {
      n: Math.floor(99 * Math.random()) + 1,
      low: 0,
      high: 100,
      guessnum: 0,
      guess: undefined
    }

    //修改文档内容来显初始状态
    display(state)
    if (playagain === true) save(state) //游戏结束开始新游戏 , 保存当前游戏状态 
  }

  function save(state) {
    if (!history.pushState) return; //如果pushState没有定义的话,则什么都不做
    var url = "#guess" + state.guessnum;
    //保存状态对象额url
    history.pushState(state, //要保存的状态对象
      "", //状态标题:当前六七会互虐他
      url) //状态url:对数钱是没有用的
  }

  //onpopstate事件处理程序,用于恢复历史状态
  function popState(event) {
    if (event.state) {
      //如果事件有一个状态对象,则恢复该状态
      //要注意 event.state是对以保存的对象的深拷贝
      //因此无改变保存至就可以修改该状态
      state = event.state; //恢复历史状态
      display(state)
    } else {
      //当第一次载入页面,会触发一个没有状态的popState事件
      //用正式状态吧bull一换掉
      //这里不用disolay方法
      history.replaceState(state, "", "#guess" + state.guessnum)
    }
  }
  //  用户每猜测一次都回调用这个事件处理程序
  //此处理程序用于更新游戏状态,保存游戏状态, 并显示游戏状态
  function handleGuess() {
    //从input字段中获取用户猜测是数字
    var g = parseInt(this.value);
    if ((g > state.low) && (g < state.high)) {
      if (g < state.n) state.low = g;
      else if (g > state.n) state.high = g;
      state.guess = g;
      state.guessnum++;
      save(state);
      display(state);
    } else {
      alert("Please enter a number greater than " + state.low +
        " and less than " + state.high);
    }
  }

  function display(state) {
    // Display document heading and title
    ui.heading.innerHTML = document.title =
      "I'm thinking of a number between " +
      state.low + " and " + state.high + ".";

    // Display a visual representation of the range of numbers using a table
    ui.low.style.width = state.low + "%";
    ui.mid.style.width = (state.high - state.low) + "%";
    ui.high.style.width = (100 - state.high) + "%";

    // Make sure the input field is visible, empty, and focused
    ui.input.style.visibility = "visible";
    ui.input.value = "";
    ui.input.focus();

    // Set the prompt based on the user's most recent guess
    if (state.guess === undefined)
      ui.prompt.innerHTML = "Type your guess and hit Enter: ";
    else if (state.guess < state.n)
      ui.prompt.innerHTML = state.guess + " is too low. Guess again: ";
    else if (state.guess > state.n)
      ui.prompt.innerHTML = state.guess + " is too high. Guess again: ";
    else {
      // When correct, hide the input field and show a Play Again button.
      ui.input.style.visibility = "hidden"; // No more guesses now
      ui.heading.innerHTML = document.title = state.guess + " is correct! ";
      ui.prompt.innerHTML =
        "You Win! <button onclick='newgame(true)'>Play Again</button>";
    }
  }
}
//postMessage
{
  twitterSearch()

  function twitterSearch() {
    var origin = "http://127.0.0.1:5500/"; // Gadget origin
    var gadget = "/c22/twitterSearch.html"; // Gadget path
    var iframe = document.createElement("iframe"); // Create the iframe
    iframe.src = origin + gadget; // Set its URL
    iframe.width = "250"; // 250 pixels wide
    iframe.height = "100%"; // Full document height
    iframe.style.cssFloat = "right"; // Flush right

    // Insert the iframe at the start of the document
    document.body.insertBefore(iframe, document.body.firstChild);

    // Now find all links and hook them up to the gadget
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
      // addEventListener doesn't work in IE8 and before
      links[i].addEventListener("mouseover", function () {
        // Send the url as the search term, and only deliver it if the
        // iframe is still displaying a document from davidflanagan.com
        iframe.contentWindow.postMessage(this.href, origin);
      }, false);
    }
  }
}


{
  // var myWorker = new Worker('c22/work.js')
  // myWorker.postMessage("file.txt")
  // myWorker.onmessage = function (e) {
  //   var message = e.data
  // }
  // myWorker.onerror = function (e) {
  //   console.log(e.filename + e.lineno + e.message)
  // }
  // myWorker.terminate()  //强制结束一个worker线程

  function smear(img) {
    // Create an offscreen <canvas> the same size as the image
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image into the canvas, then extract its pixels
    var context = canvas.getContext("2d");
    context.drawImage(img, 0, 0, canvas.width, canvas.height);

    var pixels = context.getImageData(0, 0, img.width, img.height)

    // Send the pixels to a worker thread
    var worker = new Worker('c22/work.js') // Create worker
    worker.postMessage(pixels); // Copy and send pixels

    // Register a handler to get the worker's response
    worker.onmessage = function (e) {
      var smeared_pixels = e.data; // Pixels from worker
      console.log(smeared_pixels)
      context.putImageData(smeared_pixels, 0, 0); // Copy them to the canvas
      img.src = canvas.toDataURL(); // And then to the img
      worker.terminate(); // Stop the worker thread
      canvas.width = canvas.height = 0; // Don't keep pixels around
    }
  }
}

{
  //类型化数组 高效
  //使用埃拉托色尼帅选耍法 返回一个小于n的最大素数
  //素数即质数定义为在大于1的自然数中，除了1和它本身以外不再有其他因数。
  function sieve(n) {
    var a = new Int8Array(n + 1);
    var max = Math.floor(Math.sqrt(n)) //sqrt() 方法可返回一个数的平方根。123都是素数
    var p = 2;
    while (p <= max) {
      //2 manx 4
      for (var i = 2 * p; i <= n; i += p) { //将p的倍数都标记为合数
        //2 4
        a[i] = 1;
      }
      p++;
      // while (a[++p]); //下一个未标题的索引值是素数
    }

    while (a[n]) n--;
    console.log(a)
    console.log(max)
    console.log(n)
    return n;
  }
  // sieve(16)
}
//blob  二进制大文件对象
{
  // file一个多了name和lastModifiedData属性的blob对象
  // 输出选中文件的列表的相关系西
  function fileinfo(files) {
    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      console.log(f.name, f.type, f.size, f.lasrModifiedDate)
    }
  }
  //构造一个blob
  // var bb = new BlobBuilder(); //创建一个新的BlobBuilder  已替换 new Blob()
  // var bb = new Blob()
  //吧一个字符春追加到blob中,并一个nul字符标记字符串结束
  // bb.append("this blob contains this txt ande 10bige endian 32-bit signed ints.");
  // bb.append("\0"); //以NUL结束符表示字符串结束
  //将数据储存到ArrayBuffer中
  var ab = new ArrayBuffer(4 * 10); //不透明的字节块,不是类型化数组
  // console.log(ab.byteLength) //此视图字节长
  // console.log(ab.buffer) //但是基本缓冲区的长度 
  var dv = new DataView(ab)
  for (var i = 0; i < 10; i++) dv.setInt32(i * 4, i)
  //将ArratBuffer添加到blob中 
  // bb.append(ab)
  //现在从builder中获取blob,并制定MIME类型
  // var blob = bb.getBlob("x-optional/mime-type-here")
  var bb = new Blob([ab])
  // console.log(bb.size)
  drapBlob()

  function drapBlob() {
    var droptarget = document.getElementById("droptarget");

    // When the user starts dragging files over the droptarget, highlight it.
    droptarget.ondragenter = function (e) {
      // If the drag is something other than files, ignore it.
      // The HTML5 dropzone attribute will simplify this when implemented.
      var types = e.dataTransfer.types;
      if (!types ||
        (types.contains && types.contains("Files")) ||
        (types.indexOf && types.indexOf("Files") != -1)) {
        droptarget.classList.add("active"); // Highlight droptarget
        return false; // We're interested in the drag
      }
    };
    // Unhighlight the drop zone if the user moves out of it
    droptarget.ondragleave = function () {
      droptarget.classList.remove("active");
    };

    // This handler just tells the browser to keep sending notifications
    droptarget.ondragover = function (e) {
      return false;
    };

    // When the user drops files on us, get their URLs and display thumbnails.
    droptarget.ondrop = function (e) {
      var files = e.dataTransfer.files; // The dropped files
      for (var i = 0; i < files.length; i++) { // Loop through them all
        var type = files[i].type;
        if (type.substring(0, 6) !== "image/") // Skip any nonimages
          continue;
        var img = document.createElement("img"); // Create an <img> element
        img.src = getBlobURL(files[i]); // Use Blob URL with <img>
        img.onload = function () { // When it loads
          this.width = 100; // adjust its size and
          document.body.appendChild(this); // insert into document.
          revokeBlobURL(this.src); // But don't leak memory!
        }
      }

      droptarget.classList.remove("active"); // Unhighlight droptarget
      return false; // We've handled the drop
    }
  }


  // var fs = requestFileSystemSync(PERSISTENT, 1024 * 1024)
}
//客户端数据库
{
  //web sql
  //IndexDB   对象数据库 作用域限制在文档源中 两个同源的web页面相互之间可以访问对方的数据,但是非同源的不行;每个源都可以与任意数目的indexDB数据库,但是名字必须是惟一的.
  indexDB()

  function indexDB() {

    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;
    var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
    var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

    function logerr(e) {
      console.log("IndexedDB error :" + e.code + ":" + e.message)
    }
    //次函数异步的获取数据对象(需要的时候,用于穿件和初始化数据)
    //然后将其传递给f()函数
    withDB()

    function withDB() {
      var request = indexedDB.open('zipcodes', 1); //获取储存邮政编码的数据库
      request.onerror = logerr;

      request.onsuccess = function () {
        var db = request.result;

        console.log(db)
        //即使数据路不存在,也总能够打开它
        //通过检查版本号来确定数据库是否已经创建或者初始化
        //如果没有,就做响应的穿件和初始化工作
        //如果db已经存在,就只需要把它传递给回调函数f
        f(db);
      }
      request.onupgradeneeded = function () {
        var db = request.result;
        initdb(db, f)
      }
    }

    function initdb(db, f) {
      var statusline = document.createElement('div');
      statusline.style.cssText = "position:fixed; left:0px; top:0px; width:100%;" +
        "color:white; background-color: black; font: bold 18pt sans-serif;" +
        "padding: 10px;text-align:center ";
      document.body.appendChild(statusline);

      function status(msg) {
        statusline.innerHTML = msg.toString()
      }
      status('Initializing zipcod datebase')

      // var request = db.setVersion('1.0.0');

      //这里邮政编码数据只包含一个对象存储区
      //该存储区包含如下形式的对象{
      //   zipcode: "02134",
      //   city: "Allston",
      //   state: "MA",
      //   latitude: "42.355167",
      //   longitude: "-71.13164"
      // }
      //使用对象的zipcode属性来作为数据库的键
      //同时 使用城市名称来创建索引
      //如果生虐键路径,indexedDB会定义他自己的唯一的整形键
      var store = db.createObjectStore("zipcodes", //储存区的名字
        {
          keyPath: "zipcode"
        })
      //通过城市名一级邮政编码来索引对象存储区
      //是通此方法,表示检录的字符串要直接穿进去
      //并且是作为必须的参数而不是可选对象的一部分
      store.createIndex("cities", "city")
      //现在 需要下载邮政编码数据,将他们解析为对象
      //并将他们存在到之前创建的对象存储区中
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "./c22/db.json")
      xhr.send()
      console.log('x')
      xhr.onerror = status;
      var lastChar = 0,
        numlines = 0;
      xhr.onprogress = xhr.onload = function (e) {
        var lastNewline = xhr.responseText.indexOf("\n");
        if (lastNewline > lastChar) {
          var chunk = xhr.responseText.substring(lastChar, lastNewline)
          lastChar = lastNewline + 1;
          var lines = chunk.split('\n');
          numlines += lines.length;
          //将数据春村到数据库中
          //这里需要食物
          //在盖茨函数返回
          //浏览器返回时间循环时,向数据提交所有使用该对象进行的所有数据库出入操作
          //要创建事务对象,需要制定要使用的对象存储区
          //并且告诉该对象存储区
          //需要对象数据进行写操作 而不只是读操作
          var transaction = db.transaction(['zipcodes'], //对象存储区
            IDBTransaction.READ_WRITE)
          var store = transaction.objectStore("zipcodes") //从事务中获取对象存储区
          for (var i = 0; i < lines.length; i++) {
            var fields = lines[i].split(","); // Comma-separated values
            var record = { // This is the object we'll store
              zipcode: fields[0], // All properties are string
              city: fields[1],
              state: fields[2],
              latitude: fields[3],
              longitude: fields[4]
            };
            //IndexedDB最好的部分就对象存储区真的非常简单
            //下面就在数据库中增肌俺一跳记录的方式
            store.put(record) //或者使用add避免覆盖
          }
          status("Initalizing zipcode database:loaded:" + numlines + "records")
        }
        if (e.type == "load") {
          //如果是最后的载入时间
          //就将所有数据发给数据库
          //但是刚刚处理了4w数据,可能他还在处理中
          //所以做个简单查询
          //当查询成功了,就代表数据库已经就绪了
          //就可以吧状态条移除
          //最后调动此前传递withDB的f()函数
          lookupCity("02134", function (s) {
            document.body.removeChild(statusline)
            withDB(f)
          })
        }
      }
      xhr.onsuccess = function () {}

    }
  }
}