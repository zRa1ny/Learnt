 const domain = ""
 const staticpath = ""
 const interfacepath = ""

 //接口配置
 const interfaces = {
   rktj: {
     fwry: { //关怀对象
       url: interfacepath + "/person/servicePersonStatistic",
       type: "get",
       url1: staticpath + "/temp/fwry1.json",
       type1: "get1",
     },
     zdry: { //重点人员
       url: interfacepath + "/person/controlPersonStatistic",
       type: "get"
       // url: staticpath + "/temp/zdry.json",
       // type: "get",
     }
   },
 }

 const loaclInterfacesToOnline = (obj) => {
   let type = Object.prototype.toString.call(obj).split(" ")[1].slice(0, -1),
     onlineInterfaces = type === "Array" ? [] : (type === "Object" ? {} : obj);
   if (obj && (type === "Array" || type === "Object")) {
     for (let key in obj) {
       if (key === 'url' || key === 'type') continue;
       if (obj.hasOwnProperty(key)) {
         if (key == "url1") onlineInterfaces['url'] = loaclInterfacesToOnline(obj[key]);
         else if (key == "type1") onlineInterfaces['type'] = loaclInterfacesToOnline(obj[key]);
         else onlineInterfaces[key] = loaclInterfacesToOnline(obj[key]);
       }
     }
   }
   return onlineInterfaces
 }