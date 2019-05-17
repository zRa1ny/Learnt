var OPENFILETYPE = {
    OnlyRead: 1,
    ReadWrite: 2
};
function OpenTextFile() {
    // https://wenku.baidu.com/view/4f47893243323968011c92b1.html
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var ts = fso.OpenTextFile("D:/zzmm.txt", OPENFILETYPE.OnlyRead);
    var s = ts.ReadLine();
    alert(s)
    ts.Close()
}

function RunShell(path,name) {
    var shell = new ActiveXObject("wscript.shell");
//    shell.run('"C:/Program Files (x86)/Tencent/QQ/Bin/QQ.exe"')
    try {
        shell.run(path) 
    } catch (error) {
        firm(name);
    }
    
}
//弹出一个询问框，有确定和取消按钮  
function firm(name) {  
    //利用对话框返回的值 （true 或者 false）  
    if (confirm("未找到应用程序，需要重新设置工作目录吗?")) {  
        addWorkFiles(function(){
            openexe(name);
        });
    }  
    else {  
        console.log("取消了设置");
    }  

}  
//RunShell()

function FtpDownload(download,sources) {
    //  download='wx001';
    //  sources=['需要安装的软件.zip','11.txt'];
    if(!download){
        console.log("目录不能为空！");
        return;
    }
    if(!sources){
        console.log("下载资源不能为空！");
        return;
    }
    var exePath="";
    if(getCookie("exePath")){
        exePath=getCookie("exePath");
    }else{
        addWorkFiles(function(){
            //打开
            exePath=getCookie("exePath");
        });
    }
    console.log(exePath);
    //return;
    var taskDir = exePath+"/";
    // https://www.jb51.net/article/33787.htm
    // var taskDir = "f:/tasks/";
    var id = "1";
    var ftpFile = taskDir + "ftp_" + id + ".ftp"
    var batFile = taskDir + "ftp_" + id + ".bat"
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var ftp_cmd = fso.CreateTextFile(ftpFile, true);
    ftp_cmd.WriteLine("open 192.168.1.190")
    ftp_cmd.WriteLine("anonymous")
    ftp_cmd.WriteLine("anonymous")
    ftp_cmd.WriteLine("cd "+download)
    for(j = 0; j < sources.length; j++) {
        var param="get "+sources[j]+" "+taskDir+download+"/"+sources[j];
        //var param="get "+sources[j]+" "+taskDir+"download"+"/"+sources[j];
        //ftp_cmd.WriteLine("get Shadowsocks.zip f:/tasks/download/Shadowsocks.zip ")
        ftp_cmd.WriteLine(param)
    } 
    ftp_cmd.WriteLine("close")
    ftp_cmd.WriteLine("bye")
    ftp_cmd.Close()

    var ftp_bat = fso.CreateTextFile(batFile, true);
    ftp_bat.WriteLine('@echo off')
    ftp_bat.WriteLine('ftp -i -s:"' + ftpFile + '"')
    //ftp_bat.WriteLine('del/f/s/q "' + ftpFile.split("/").join("\\") + '"')
    //ftp_bat.WriteLine('del/f/s/q "' + batFile.split("/").join("\\")+ '"')
    //ftp_bat.WriteLine('pause')
    ftp_bat.Close();
    var shell = new ActiveXObject("wscript.shell");
    shell.run('"' + batFile + '"');
    //新增下载记录
    var datav= JSON.stringify({
        sources:sources
    });
    $.ajax({
        url:"/dxjcbackend/system/attachmentDownload/downloadRecord",
        data:datav,
        type:"post",
        contentType: 'application/json;charset=UTF-8',
        success:function(res){
          console.log("下载成功");
          console.log(res);
        },
        error:function(){},
    })
    
}
//FtpDownload()

function setCookie(objName,objValue,objDays){
    var str = objName + "=" + escape(objValue);
    if(objDays > 0){
    var date = new Date();
    var ms = objDays*24*3600*1000;
    date.setTime(date.getTime() + ms);
    str += "; expires=" + date.toGMTString();
    }
    if(objDays===Infinity){
      str += "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    }    
    str += "; path=/";
    document.cookie = str;
}

// function setCookie(key, value, t) {
//     if (t > 0) {
//         var oDate = new Date();
//         oDate.setDate(oDate.getDate() + t);
//         document.cookie = key + "=" + value + "; expires=" + oDate.toDateString();
//     }
// }

function getCookie(key) {
    var arr1 = document.cookie.split("; ");//由于cookie是通过一个分号+空格的形式串联起来的，所以这里需要先按分号空格截断,变成[name=Jack,pwd=123456,age=22]数组类型；
    for (var i = 0; i < arr1.length; i++) {
        var arr2 = arr1[i].split("=");//通过=截断，把name=Jack截断成[name,Jack]数组；
        if (arr2[0] == key) {
            return unescape(arr2[1]);
        }
    }
}

//封装一个移除cookie的函数
function removeCookie(key) {
    setCookie(key, "", -1);//把cookie设置为过期
}

//选择工作目录
function addWorkFiles(fun2) {
    var objShell = new ActiveXObject("Shell.Application")
    var objFolder=objShell.BrowseForFolder(0,"选择一个工作目录：",0,"")
    if(objFolder&&objFolder.Self&&objFolder.Self.Path){
        // console.log(objFolder.Self.Path);
        var exePath=objFolder.Self.Path;
        if(exePath){
            setCookie("exePath",exePath,Infinity);
        }
    }
    if (fun2 && typeof(fun2) === "function") {
        fun2();
    }  
   
}

function openexe(name) {
    if(name){
        if(getCookie("exePath")){
            var exePath=getCookie("exePath");
            exePath="\""+exePath+"/"+name+"\"";
            RunShell(exePath,name);
        }else{
            addWorkFiles(function(){
                //打开
                openexe(name);
            });
        return;
        }  
    }else{
        return;
    }
}