
; (function (name, definition) {
    if (typeof define === 'function') {
        define(definition);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = definition();
    } else {
        this[name] = definition();
    }
})('PassWordPlugin', function () {
   'use strict';
    return {
        install: function (value) {
            Vue.component("pass-word", {
                template: '<input                            \
                                style="ime-mode:disabled"        \
                                autocomplete="off"               \
                                ref="pw-input"                   \
                                :value="showValue"               \
                                type="text"                      \
                                @input="cinput"                  \
                                @copy.prevent=""                 \
                                @cut.prevent=""                  \
                                @compositionstart.prevent="_compositionstartHandler"              \
                                @compositionend.prevent="_compositionendHandler"                  \
                                @dragenter="_dragenterhandlder"  \
                                @dragleave="_dragleaveHandler"   \
                                @mousedown="_mousedownHandler"   \
                                />',
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
                        type: RegExp,
                        default: function () {
                            return /([\u4e00-\u9fa5])/g
                        }
                    }
                },
                data: function data () {
                    return {
                        valueProxy: ""
                    };
                },
                computed: {
                    showValue: function showValue () {
                        if (this.type != "password") {
                            return this.valueProxy;
                        }
                        return this.fillSymbol();
                    }
                },
                watch: {
                    value: function value (newval) {
                        if (newval != this.valueProxy) this._initValue();
                    }
                },
                mounted: function mounted () {
                    this._initValue();
                },
                methods: {
                    _compositionstartHandler: function () {
                        this.lock = true;
                        console.log("start")
                    },
                    _compositionendHandler: function (e) {
                        this.lock = false;
                        console.log("end")
                        if (e.target.composing === undefined) this.cinput();// 兼容Vue版本 有composing属性的版本会自动触发一次cinput  
                    },
                    _mousedownHandler: function (e) {
                        if (e.button === 0 && (this.$refs['pw-input'].selectionStart != this.$refs['pw-input'].selectionEnd)) {
                            this.$refs['pw-input'].selectionStart = this.$refs['pw-input'].selectionEnd = this.valueProxy.length;
                        }
                        return false
                    },
                    _dragleaveHandler: function (e) {
                        e.preventDefault();
                        // console.log("_dragleaveHandler")
                        this.$refs['pw-input'].removeAttribute('readonly')
                        return false
                    },
                    _dragenterhandlder: function (e) {
                        e.preventDefault();
                        // console.log("_dragenterhandlder")
                        this.$refs['pw-input'].setAttribute('readonly', true)
                        return false
                    },
                    _filterCn: function _filterCn (str, repStr) {
                        if (!str) return str;
                        var pattern = this.pattern,
                            repStr = repStr ? repStr : "";
                        return str.replace(pattern, repStr);
                    },
                    _initValue: function _initValue () {
                        var value = this.value
                        if (value == undefined || value == null) value = "";
                        this.valueProxy = this._filterCn(value);
                        this.$emit('input', this.valueProxy);
                    },
                    _inputHandler: function _inputHandler () {

                        var _this = this;

                        var cvalueArr = this._filterCn(this.$refs['pw-input'].value).split(""),
                            ovalueArr = this.valueProxy.split(""),
                            clen = cvalueArr.length - ovalueArr.length,
                            cursor = this.$refs['pw-input'].selectionStart,
                            ccursor = cursor - this.$refs['pw-input'].value.split("").length + cvalueArr.length,
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

                        if (this.valueProxy == ovalueArr.join("")) {
                            this.$forceUpdate();
                        } else {
                            this.valueProxy = ovalueArr.join("");
                        }

                        this.$nextTick(function () {
                            _this.$refs['pw-input'].selectionStart = ccursor;
                            _this.$refs['pw-input'].selectionEnd = ccursor;
                        });
                    },
                    cinput: function cinput (e) {
                        if (this.lock) return;
                        console.log('input')
                        if (this.type != 'password') {
                            this.valueProxy = this._filterCn(this.$refs['pw-input'].value);
                            this.$forceUpdate();
                        } else {
                            this._inputHandler();
                        }
                        this.$emit('input', this.valueProxy);
                    },
                    fillSymbol: function fillSymbol () {
                        var symbolstr = "";
                        for (var i = 0, len = this.valueProxy.length; i < len; i++) {
                            symbolstr += this.symbol;
                        }
                        return symbolstr;
                    }
                }
            });
        }
    }
})





