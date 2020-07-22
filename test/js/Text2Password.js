; (function (name, definition) {
    if (typeof define === 'function') {
        define(definition);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = definition();
    } else {
        this[name] = definition();
    }
})('Text2Password', function () {
    "use strict";

    function _toConsumableArray (arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

    function _nonIterableSpread () { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

    function _unsupportedIterableToArray (o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

    function _iterableToArray (iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

    function _arrayWithoutHoles (arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

    function _arrayLikeToArray (arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; };
    function Text2Password (opts) {
        var id = opts.id,
            _opts$callback = opts.callback,
            callback = _opts$callback === void 0 ? function () { } : _opts$callback,
            input = document.getElementById(id),
            _this = this;

        _this._value = [], _this.input = input, _this.callback = callback;
        input.addEventListener("copy", Text2Password.preventDefault);
        input.addEventListener("cut", Text2Password.preventDefault);
        input.addEventListener("paste", Text2Password.preventDefault);
        input.addEventListener("compositionstart", function () {
            _this.lock = true;
        });
        input.addEventListener("compositionend", function () {
            this.value = new Array(_this.value.split("").length).fill("*").join("");
            _this.lock = false;
        });
        input.addEventListener("input", _this.passwordHandler.bind(_this));
        input.addEventListener("propertychange", _this.passwordHandler.bind(_this));

        _this.init();

        Object.defineProperty(_this, "value", {
            get: function get () {
                return _this._value.join("");
            }
        });
        return this;
    }

    Text2Password.preventDefault = function (e) {
        var e = e || window.event;
        e.preventDefault();
    };

    Text2Password.prototype.init = function () {
        this.input.value.split("").forEach(function (value) {
            this._value.push(value);
        }.bind(this));
        this.input.value = new Array(this._value.length).fill("*").join("");
    };

    Text2Password.prototype.passwordHandler = function () {
        if (this.lock) return;
        var cursor = this.input.selectionStart,
            cvalue = this.input.value.split(''),
            ovalue = this._value;
        var changeLen = cvalue.length - ovalue.length;

        if (changeLen > 0) {
            // changeLen  如果是正数  说明新数据的长度比旧数据长  所以曾嘉乐数据
            ovalue.splice.apply(ovalue, [cursor - 1, 0].concat(_toConsumableArray(cvalue.slice(cursor - 1, cursor - 1 + changeLen))));
        }

        if (changeLen < 0) {
            // 删除某些元素
            ovalue.splice(cursor, Math.abs(changeLen));
        }

        cvalue.forEach(function (value, index) {
            if (value != "*") {
                ovalue[index] = value;
            }
        });
        this._value = ovalue.join("").replace(/\*/g, "").split("");
        this.input.value = new Array(cvalue.length).fill("*").join("");
        this.input.selectionStart = cursor;
        this.input.selectionEnd = cursor;
        typeof this.callback == "function" && this.callback();
    };

    return Text2Password;
});



Array.prototype.fill = Array.prototype.fill ? Array.prototype.fill : function (value) {

    // Steps 1-2.
    if (this == null) {
        throw new TypeError('this is null or not defined');
    }

    var O = Object(this);

    // Steps 3-5.
    var len = O.length >>> 0;

    // Steps 6-7.
    var start = arguments[1];
    var relativeStart = start >> 0;

    // Step 8.
    var k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

    // Steps 9-10.
    var end = arguments[2];
    var relativeEnd = end === undefined ?
        len : end >> 0;

    // Step 11.
    var final = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

    // Step 12.
    while (k < final) {
        O[k] = value;
        k++;
    }

    // Step 13.
    return O;
};