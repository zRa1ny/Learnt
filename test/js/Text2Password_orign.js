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
        let { id, type = 'password', symbol = '*', callback = () => { }, pattern = /([\u4e00-\u9fa5])/g } = opts, _this = this;
        _this.input = document.getElementById(id);
        if(!_this.input ||  _this.input.tagName.toLowerCase() != 'input' || _this.input.type === 'password'){
            throw new Error("请传一个type不为password的input的id属性！");
            return;
        }
        _this.input.valueProxy = "";
        _this.callback = callback;
        _this.type = type;
        _this.symbol = symbol;
        _this.pattern = pattern;
        _this.cursor = 0;
        _this.isInit = false;
        Object.defineProperty(_this, 'value', {
            get () {
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
                this.selectionStart = this.selectionEnd = this.value.length;
            }
            return false
        }
        function _dragleaveHandler (e) {
            e.preventDefault();
            this.warn("_dragleaveHandler")
            this.removeAttribute('readonly')
            return false
        }
        function _dragenterhandlder (e) {
            e.preventDefault();
            this.warn("_dragenterhandlder")
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
            this.warn("start")
        })
        this.input.addEventListener("compositionend", () => {
            this.lock = false;
            this.warn("end");
            this._inputHandler();
        })

        this.input.addEventListener("input", this._inputHandler.bind(this))
        this.input.addEventListener("propertychange", this._inputHandler.bind(this))
    }

    Text2Password.prototype._inputHandler = function () {
        if (this.lock) return;
        if (!this.isInit) {
            this.warn('init')
        } else {
            this.warn('input')
        }

        if (this.type === 'password') {
            this._passwordHandler()
        } else {
            this._textHandler()
        }
        this._showValue()
        this._setCursor()
        typeof this.callback == "function" && this.callback();
    }

    Text2Password.prototype._passwordHandler = function () {
        var _this = this,
            cvalueArr = this._filterCn(this.input.value).split(""),
            ovalueArr = this.input.valueProxy.split(""),
            clen = cvalueArr.length - ovalueArr.length,
            cursor = this.input.selectionStart,
            ccursor = cursor - this.input.value.split("").length + cvalueArr.length,
            sidx = "",
            eidx = "";


        if (clen > 0) {
            var inArr = cvalueArr.join("").replace(/\*/g, "").split("");
            var right = cvalueArr.length - cursor > 0 ? ovalueArr.slice(-(cvalueArr.length - cursor)) : [];
            ovalueArr = [].concat(ovalueArr.slice(0, cursor - inArr.length), inArr, right);
        }

        if (clen < 0) {
            ovalueArr.splice(cursor, Math.abs(clen));
        }

        cvalueArr.forEach(function (value, index) {
            if (value != "*") {
                ovalueArr[index] = value;
            }
        });
        this.input.valueProxy = ovalueArr.join("");
        this.cursor = ccursor;
    }

    Text2Password.prototype._filterCn = function _filterCn (str, repStr) {
        if (!str) return str;
        var pattern = this.pattern,
            repStr = repStr ? repStr : "";
        return str.replace(pattern, repStr);
    }
    Text2Password.prototype._textHandler = function () {
        this.input.valueProxy = this._filterCn(this.input.value);
        this.cursor =   this.input.selectionStart - this.input.value.split("").length +  this.input.valueProxy.split("").length;
    }
    Text2Password.prototype._showValue = function () {
        var str = "";
        if (this.type === 'password') {
            this.value.split("").forEach((val) => {
                str += this.symbol;
            })
        } else {
            str = this.value;
        }
        this.input.value = str;
    }
    Text2Password.prototype._setCursor = function () {
        this.input.selectionStart = this.cursor;
        this.input.selectionEnd = this.cursor;
    }

    Text2Password.prototype.warn = function(msg){
        console.log(msg)
    }    
    Text2Password.prototype.$setValue = function (value) {
        if (value) this.input.value = value;
        this._inputHandler();
    }
    
    Text2Password.prototype.$changeType = function (type) {
        this.type = type;
        this.$setValue(this.value);
    }
    return Text2Password
})



