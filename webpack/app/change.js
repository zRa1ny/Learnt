// import 'lodash';
// import numRef from './ref.json';
// console.log(_);
// import { file, parse } from './globals.js';
console.log(this);
// export function numToWord (num) {
//   return _.reduce(numRef, (accum, ref) => {
//     return ref.num === num ? ref.word : accum;
//   }, '');
// };

// export function wordToNum (word) {
//   return _.reduce(numRef, (accum, ref) => {
//     return ref.word === word && word.toLowerCase() ? ref.num : accum;
//   }, -1);
// };

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => {
    console.log('We retrieved some data! AND we\'re confident it will work on a variety of browser distributions.')
    console.log(json)
  })
  .catch(error => console.error('Something went wrong when fetching this data: ', error))