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
}