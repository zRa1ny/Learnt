var editor, stateline, savebutton, idletimer;
//首次载入应用
window.onload = function () {
  //第一次载入时
  if (localStorage.note == null) localStorage.note = "";
  if (localStorage.lastModified == null) localStorage.lastModified = "";
  if (localStorage.lastSaved == null) localStorage.lastSaved = "";
  //查找编辑器ui元素 并初始化全局变量
  editor = document.getElementById('editor');
  stateline = document.getElementById('statusline')
  savebutton = document.getElementById('savebutton')

  editor.value = localStorage.note; //初始化编辑器,将保存的笔记数据填充为其内容
  editor.disabled = true;
  editor.addEventListener("input", function (e) {
    localStorage.note = editor.value;
    localStorage.lastModified = Date.now();
    if (idletimer) clearTimeout(idletimer)
    idletimer = setTimeout(save, 5000);
    savebutton.disabled = false;
  }, false)
  //每次载入应用程序时,尝试同步服务器
  sync();
}


//离开页面钱保存数据到服务器
window.onbeforeunload = function () {
  if (localStorage.lastModified > localStorage.lastSaved) save();
}

//离线时候通知用户
window.onoffline = function () {
  status("Offline")
}

//再次返回在线状态时,进行同步
window.ononline = function () {
  sync();
}

//当有新版本应用的时候,提醒用户
window.applicationCache.onupdateready = function () {
  status("A new version of this application is available.Reload to run it ")
}

//当没有新版本的时候也通知用户
window.applicationCache.onnoupdate = function () {
  status("you are running the latest version of the application.")
}

//用于在状态栏中显示状态详细的一个函数
function status(msg) {
  stateline.innerHTML = msg
}
//每次笔记内容更新,如果用户停止编辑超过5分钟
//就会自动将笔记本上传到服务器(在线状态下)
function save() {
  if (idletimer) clearTimeout(idletimer);
  idletimer = null;
  if (navigator.onLine) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/note");
    xhr.send(editor.value);
    xhr.onload = function () {
      localStorage.lastSaved = Date.now();
      savebutton.disabled = true;
    }
  }
}
//检查服务端是否有新版本的笔记
//如果没有,则将当前版本保存在服务器端
function sync() {
  if (navigator.onLine) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "/note");
    xhr.send();
    xhr.onload = function () {
      var remoteModTime = 0;
      if (xhr.status == 200) {
        remoteModTime = xhr.getResponseHeader("Last-Modified");
        remoteModTime = new Date(remoteModTime).getTime()
      }
      if (remoteModTime > localStorage.lastModified) {
        status("newer note found on server.")
        var useit = confirm("there is a newer version of the note\n" + "on the server.Click Ok to use that version\n" + "or Click Cancel to continue editing this\n" + "version and overwrite the server")
        var now = Date.now();
        if (useit) {
          editor.value = localStorage.note = xhr.responseText;
          localStorage.lastSaved = now;
          status("newest version downloaded")
        } else {
          status("you are editing the current version of the note ")
        }
        if (localStorage.lastModified > localStorage.lastSaved) {
          save()
        }
        editor.disabled = false;
        editor.focus();
      }
    }
  } else {
    status("can't sync while offline");
    editor.disabled = false;
    editor.focus();
  }
}