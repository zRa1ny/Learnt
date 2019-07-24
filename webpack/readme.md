## webpack笔记

---
###  exports &  module.exports 和 export & export default &区别
#### CommonJs规范：module.exports、exports
1. exports：本身是一个变量（对象），他不是module的引用，他是{}的引用，他只想module.exports的{}模块，所以exports只能使用.的语法，向外部暴露他的内部变量
`exports.xxx=xxx` 可以多次使用。
`import {xxx} from 'xxxx' ` //xxx代表属性名称，必须和exports.xxx对应
2.  module.exports既可以通过点语法，也可以直接赋值一个对象    
    ```
    例  module.exports.xxx=xxx
    例  module.exports={}

    ```

3. export defalut 和exprot 区别
   - export
     - 每个文件中可使用多次export命令
     - import的时候需要知道所加载的变量名称或者函数名称
     - import 需要加{}
   -  export defalut
      -  每个文件中只有一次
      -  直接暴露一个对象
      -  import时直接获取整个对象，可以指定任意名称
 ```
   //a.js
   export const name = 'tom'
   export function say() {
     console.log(name)
   }
   //b.js
   import {name,say} from './a.js'

 ```
 ```
   //a.js
   let obj = {
      name: 'tom',
      say() {
        console.log(this.name)
      }
   }
   export default obj
   //b.js
   import name from './a.js' // name可以自由指定
   name.name === 'tom' 
   name.say()

 ```






