import webpack from 'webpack';
webpack.Configuration = {
  mode: 'production',
};

const greeter = require('./Greeter.js');
document.querySelector("#root").appendChild(greeter())