; (function (name, definition) {
    if (typeof define === 'function') {
        define(definition)
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = definition()
    } else {
        this[name] = definition()
    }
})('Text2Password', function () {
    function Text2Password(opts) {
        let { id, callback = () => { } } = opts, input = document.getElementById(id), _this = this;
        _this._value = [], _this.input = input, _this.callback = callback;
        input.addEventListener("copy", Text2Password.preventDefault)
        input.addEventListener("cut", Text2Password.preventDefault)
        input.addEventListener("paste", Text2Password.preventDefault)
        input.addEventListener("compositionstart", function () {
            _this.lock = true;
        })
        input.addEventListener("compositionend", function () {
            this.value = new Array(_this.value.split("").length).fill("*").join("");
            _this.lock = false;
        })

        input.addEventListener("input", _this.passwordHandler.bind(_this))
        input.addEventListener("propertychange", _this.passwordHandler.bind(_this))
        _this.init();
        Object.defineProperty(_this, "value", {
            get: function () {
                return _this._value.join("")
            },
        })
        return this
    }

    Text2Password.preventDefault = function (e) {
        var e = e || window.event;
        e.preventDefault();
    }
    Text2Password.prototype.init = function () {
        this.input.value.split("").forEach(function (value) {
            this._value.push(value)
        }.bind(this))
        this.input.value = new Array(this._value.length).fill("*").join("");
    }
    Text2Password.prototype.passwordHandler = function () {
        if (this.lock)return;

        var cursor = this.input.selectionStart, cvalue = this.input.value.split(''), ovalue = this._value;
        var changeLen = cvalue.length - ovalue.length;
        
        if (changeLen > 0) {
            // changeLen  如果是正数  说明新数据的长度比旧数据长  所以曾嘉乐数据
            ovalue.splice(cursor - 1, 0, ...cvalue.slice(cursor - 1, cursor - 1 + changeLen))
        }
        if (changeLen < 0) {
            // 删除某些元素
            ovalue.splice(cursor, Math.abs(changeLen))
        }
        cvalue.forEach(function (value, index) {
            if (value != "*") {
                ovalue[index] = value;
            }
        })
        this._value=ovalue.join("").replace(/\*/g,"").split("");
        this.input.value = new Array(cvalue.length).fill("*").join("");
        this.input.selectionStart = cursor;
        this.input.selectionEnd = cursor;
        typeof this.callback == "function" && this.callback();
    }
    return Text2Password
})



Vue.component("pass-wrod", {
    template: "#pw",
    props: {
        type: {
            type: String,
            default: 'password'
        },
        value: {
            type: String,
            default: ""
        },
        symbol: {
            type: String,
            default: "*"
        },
        pattern: {
            type: String,
            default: /([\u4e00-\u9fa5])/g
        }
    },
    data() {
        return {
            valueProxy: "",
        }
    },
    computed: {
        showValue() {
            if (this.type != "password") {
                return this.valueProxy
            }
            return this.fillSymbol()
        }
    },
    watch: {
        value() {
            this._initValue()
        }
    },
    mounted() {
        this._initValue()
    },
    methods: {
        _filterCn(str, repStr) {
            var pattern = this.pattern, repStr = repStr ? repStr : "";
            return str.replace(pattern, repStr)
        },
        _initValue() {
            this.valueProxy = this._filterCn(this.value)
            this.$emit('input', this.valueProxy);
        },
        _inputHandler() {
            var cvalueArr = this._filterCn(this.$refs['pw-input'].value).split(""),
                ovalueArr = this.valueProxy.split(""), cursor = this.$refs['pw-input'].selectionStart;
            cvalueArr.forEach((value, index) => {
                if (value !== this.symbol) {
                    ovalueArr.splice(index, 0, value)
                }
            })
            ovalueArr.length = cvalueArr.length;
            if (this.valueProxy == ovalueArr.join("")) {
                this.$forceUpdate();
            } else {
                this.valueProxy = ovalueArr.join("");
            }
            this.$nextTick(() => {
                this.$refs['pw-input'].selectionStart = cursor;
                this.$refs['pw-input'].selectionEnd = cursor;
            })
        },
        cinput() {
            if (this.type != 'password') {
                this.valueProxy = this._filterCn(this.$refs['pw-input'].value);
            } else {
                this._inputHandler();
            }

            this.$emit('input', this.valueProxy)
        },
        fillSymbol() {
            var symbolstr = "";
            for (let i = 0, len = this.valueProxy.length; i < len; i++) {
                symbolstr += this.symbol;
            }
            return symbolstr
        }

    },
})