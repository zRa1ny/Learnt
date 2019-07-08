module.exports = function (msg) {
  if (typeof msg === 'object') {
    msg = JSON.stringify(msg)
  }
  var greet = document.createElement('div');
  greet.textContent = msg
  return greet;
}