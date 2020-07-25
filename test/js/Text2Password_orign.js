; (function (name, definition) {
    if (typeof define === 'function') {
        define(definition)
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = definition()
    } else {
        this[name] = definition()
    }
})('Text2Password', function () {
    function Text2Password (opts) {
        let { id,type = 'text', symbol = '*',callback = () => { } } = opts, _this = this;
        _this.input = document.getElementById(id);
        _this.input.valueProxy = "";
        _this.callback = callback;
        _this.type = type;
        _this.symbol = symbol;
        _this.isInit = false;
        Object.defineProperty(_this,'value',{
            get(){
                return _this.input.valueProxy
            }
        })
        _this.init();
        return _this
    }


    Text2Password.prototype.init = function () {
        this.$setValue();// 设置初始值
        this._preventDefaultEvent();//阻止input type=text 的默认操作 使其比较相似与password
        this._bindEvent();// 绑定事件 转化数据 =》 符号


        this.isInit = true;
    }
   
    // 阻止复制 剪切  拖拽进入 拖拽离开
    Text2Password.prototype._preventDefaultEvent = function (e) {
        function _preventDefaultHandler () {
            var e = e || window.event;
            e.preventDefault();
        }
        function _mousedownHandler (e) {
            if (e.button === 0 && (this.selectionStart != this.selectionEnd)) {
                this.selectionStart = this.selectionEnd = this.valueProxy.length;
            }
            return false
        }
        function _dragleaveHandler (e) {
            e.preventDefault();
            console.log("_dragleaveHandler")
            this.removeAttribute('readonly')
            return false
        }
        function _dragenterhandlder (e) {
            e.preventDefault();
            console.log("_dragenterhandlder")
            this.setAttribute('readonly', true)
            return false
        }

        this.input.addEventListener("copy", _preventDefaultHandler);
        this.input.addEventListener("cut", _preventDefaultHandler);
        this.input.addEventListener("dragenter", _dragenterhandlder);
        this.input.addEventListener("dragleave", _dragleaveHandler);
        this.input.addEventListener("mousedown", _mousedownHandler);

    }

    Text2Password.prototype._bindEvent = function () {

        this.input.addEventListener("compositionstart", () => {
            this.lock = true;
            console.log("start")
        })
        this.input.addEventListener("compositionend", () => {
            this.lock = false;
            console.log("end");
            this._inputHandler();
        })

        this.input.addEventListener("input", this._inputHandler.bind(this))
        this.input.addEventListener("propertychange", this._inputHandler.bind(this))
    }

    Text2Password.prototype._inputHandler = function () {
        if (this.lock) return;
        if(!this.isInit){
            console.log('init')
        }else{
            console.log('input')
        }
        
        if(this.type === 'password'){
            this._passwordHandler()
        }else{
            this._textHandler()
        }
        this._showValue()
        this._setCursor()
        typeof this.callback == "function" && this.callback();
    }

    Text2Password.prototype._passwordHandler = function(){}
    Text2Password.prototype._textHandler = function(){
        this.input.valueProxy = this.input.value;
    }
    Text2Password.prototype._showValue = function(){
        var str  = "";
        if(this.type === 'password'){
            this.value.split("").forEach((val)=>{
                str += this.symbol;
            })
        }else{
            str = this.value;
        }
        this.input.value  = str;
    }
    Text2Password.prototype._setCursor = function(){}
    Text2Password.prototype.$setValue = function (value) {
        if (value) this.input.value = value;
        this._inputHandler();
    }
   
    Text2Password.prototype.$changeType = function(type){
        this.type = type;
        this.$setValue(this.value);
    }
    return Text2Password
})



