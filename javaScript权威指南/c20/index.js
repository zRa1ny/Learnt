// ***********************  客户端储存  *********************** 
{
  // cookies
  //以名/值的形式储存cookie
  //同时采用encodeURIComponent()函数进行编码,来转义分号,逗号和空白符
  //如果daysToLive是一个数字,设置max-age为该数值表示cookie直到指定的天数
  //到了才会国企,如果daysToLive是0就表示删除cookie
  function setcookie(name, value, daysToLive) {
    var cookie = name + "=" + encodeURIComponent(value);
    // ";path="+path
    // ";domain="+domain
    // ;secure
    if (typeof daysToLive === "number") {
      cookie += ";max-age=" + (daysToLive * 60 * 60 * 24)
    }
    document.cookie = cookie;
  }
  // setcookie("haha", "xxx", 10)

  function getcookie() {
    var cookies = {};
    var all = document.cookie;
    if (all === "") return cookies;
    var list = all.split(";");
    for (var i = 0; i < list.length; i++) {
      var cookie = list[i];
      var p = cookie.indexOf("=")
      var name = cookie.substring(0, p)
      var value = cookie.substring(p + 1);
      value = decodeURIComponent(value);
      cookies[name] = value;
    }
    return cookies;
  }
}

{
  // 实现cookieStorage.js
  function cookieStorage(maxage, path) {
    var cookie = (function () {
      var cookies = {};
      var all = document.cookie;
      if (all === "") return cookies;
      var list = all.split(";");
      for (var i = 0; i < list.length; i++) {
        var cookie = list[i];
        var p = cookie.indexOf("=")
        var name = cookie.substring(0, p)
        var value = cookie.substring(p + 1);
        value = decodeURIComponent(value);
        cookies[name] = value;
      }
      return cookies;
    })()

    //将所有的cookie的名字储存在一个数组中
    var keys = [];
    for (var key in cookie) keys.push(key);
    //现在定义储存api的公共api的属性和方法
    //储存的cookie的个数
    this.length = keys.length;
    //返回第n个的名字,如果n越界就返回nll
    this.key = function (n) {
      if (n < o || n >= keys.length) return null;
      return keys[n];
    }
    //返回指定名字的cookie,如果不存在则返回null
    this.getcookie = function (name) {
      return cookie[name] || null;
    }
    //储存cookie值
    this.setItem = function (key, value) {
      if (!key in coookie) {
        keys.push(key);
        this, length++;
      }
      cookie[key] = value

      //正式设置cookie

      var newCookie = key + "=" + encodeURIComponent(valu);
      if (maxage) cookie += ";max-age=" + maxage;
      if (path) cookie += ";path=" + path;
      document.cookie = newCookie;
    }

    this.removeItem = function (key) {
      if (!(key in cookie)) return;
      delete cookie[key];

      for (var i = 0; i < keys.length; i++) {
        if (keys[i] === key) {
          keys.slice(i, 1)
          break;
        }
      }

      this.length--;
      document.cookie = key + "=;max-age=0"
    }
    this.clear = function () {
      for (var i = 0; i < keys.length; i++) {
        document.cookie = keys[i] + "=;max-age=0";
        cookie = {};
        keys = [];
        this.length = 0;
      }
    }
  }
}


{
  // //ie userData持久化数据
  // var memory = document.createElement('div')
  // memory.id = "_memory"
  // memory.style.display = "none"
  // memory.style.behavior = "url('#default#userData')" //附件userData行为
  // document.body.appendChild(memory)

  // memory.load("myStoredData"); //根据指定名称载入对应数据
  // var name = memory.getAttribute("username"); //获取税局片段
  // if (!name) {
  //   name = prompt("what is your name?")
  //   memory.setAttribute("username ", name)
  //   memory.save("myStoredData")
  // }

  function UserDataStorage(maxage) {


    var memory = document.createElement("div");
    memory.style.display = "none";
    memory.style.behavior = "url('#default#userData')";
    document.body.appendChild(memory);

    if (maxage) {
      var now = new Date().getTime();
      var expires = now + maxage * 1000;
      memory.expires = new Date(expires).toUTCString();
    }


    memory.load("UserDataStorage");
    this.getItem = function (key) {
      return memory.getAttribute(key) || null;
    };
    this.setItem = function (key, value) {
      memory.setAttribute(key, value);
      memory.save("UserDataStorage");
    };
    this.removeItem = function (key) {
      memory.removeAttribute(key);
      memory.save("UserDataStorage");
    };
  }

}

{


  //载入的时候，检查该清单文件。
  window.applicationCache.onchecking = function () {
    return false;
  }
  //如果清单文件没有动，同时应用程序也已经缓存了，该事件执行。
  window.applicationCache.onnoupdate = function () {
    return false;
  }
  //如果还未缓存应用程序，或者清单有改动
  window.applicationCache.ondownloading = function () {
    window.progresscount = 0; //在下面的事件中用到
    return false;
  }
  //下载过程不断调用progress事件，通常在每个文件下载完的时候。
  window.applicationCache.onprogress = function (e) {
    var progress = "";
    if (e && e.lengthComputable) {
      progress = "" + Math.round(100 * e.loaded / e.total) + "%"; //计算下载完成比例
    } else {
      progress = "(" + ++progresscount + ")"; //输出调用次数。
    }
    return false;
  }
  //当下载完成并且首次将应用程序下载到缓存中时
  window.applicationCache.oncached = function () {
    return false;
  }
  //下载完成并且首次将应用程序下载到缓存中。
  window.applicationCache.oncached = function () {
    return false;
  };
  //下载完成并缓存的程序更新后触发，注意触发此事件时，用户任然看到老版本，只有当用户再次载入时才会访问最新版。
  window.applicationCache.onupdateready = function () {
    return false;
  };
  //处于离线时，检擦清单失败触发。

  window.applicationCache.onerror = function () {
    return false;
  };

  //程序引用一个不存在的清单文件触发，同时将应用从缓存中删除。
  window.applicationCache.onobsolete = function () {

    return false;
  };

}