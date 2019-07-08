import _ from "lodash";
import './style.css'
import Data from './data.xml';
const greeter = require('./Greeter.js');
document.querySelector("#root").appendChild(greeter(Data))