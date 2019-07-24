import _ from 'lodash';
import printMe from './print.js';
import "./style.css";
import { cube } from './math'

function component () {
  var element = document.createElement('div');
  var btn = document.createElement('button');
  var pre = document.createElement('pre');
  pre.innerHTML = ['hello webpack!', '5 cubed is equal to ' + cube(5)].join("\n\n")
  element.className = "root";
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  btn.innerHTML = 'Click me！';
  btn.onclick = printMe;

  element.appendChild(btn);
  element.appendChild(pre);
  return element;
}

document.body.appendChild(component());

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!')
  })
}