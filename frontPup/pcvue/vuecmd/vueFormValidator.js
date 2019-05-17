
/* 来自vue-validator */
/**
 * build-in validators
 */

/**
 * required
 * This function validate whether the value has been filled out.
 */
function required(val, arg) {
    var isRequired = arg === undefined ? true : arg
    if (Array.isArray(val)) {
        if (val.length !== 0) {
            var valid = true
            for (var i = 0, l = val.length; i < l; i++) {
                valid = required(val[i], isRequired)
                if ((isRequired && !valid) || (!isRequired && valid)) {
                    break
                }
            }
            return valid
        } else {
            return !isRequired
        }
    } else if (typeof val === 'number' || typeof val === 'function') {
        return isRequired
    } else if (typeof val === 'boolean') {
        return val === isRequired
    } else if (typeof val === 'string') {
        return isRequired ? (val.length > 0) : (val.length <= 0)
    } else if (val !== null && typeof val === 'object') {
        return isRequired ? (Object.keys(val).length > 0) : (Object.keys(val).length <= 0)
    } else if (val === null || val === undefined) {
        return !isRequired
    } else {
        return !isRequired
    }
}

/**
 * pattern
 * This function validate whether the value matches the regex pattern
 */
function pattern(val, pat) {
    if (typeof pat !== 'string') { return false }

    var match = pat.match(new RegExp('^/(.*?)/([gimy]*)$'))
    if (!match) { return false }

    return new RegExp(match[1], match[2]).test(val)
}

/**
 * minlength
 * This function validate whether the minimum length.
 */
function minlength(val, min) {
    if (typeof val === 'string') {
        return isInteger(min, 10) && val.length >= parseInt(min, 10)
    } else if (Array.isArray(val)) {
        return val.length >= parseInt(min, 10)
    } else if (val === null) {
        return true;
    } else {
        return false
    }
}

/**
 * maxlength
 * This function validate whether the maximum length.
 */
function maxlength(val, max) {
    if (typeof val === 'string') {
        return isInteger(max, 10) && val.length <= parseInt(max, 10)
    } else if (Array.isArray(val)) {
        return val.length <= parseInt(max, 10)
    } else if (val === null) {
        return true;
    } else {
        return false
    }
}

/**
 * min
 * This function validate whether the minimum value of the numberable value.
 */
function min(val, arg) {
    return val === null || (!isNaN(+(val)) && !isNaN(+(arg)) && (+(val) >= +(arg)))
}

/**
 * max
 * This function validate whether the maximum value of the numberable value.
 */
function max(val, arg) {
    return val === null || (!isNaN(+(val)) && !isNaN(+(arg)) && (+(val) <= +(arg)))
}

/**
 * isInteger
 * This function check whether the value of the string is integer.
 */
function isInteger(val) {
    return /^(-?[1-9]\d*|0)$/.test(val)
}

var validators = Object.freeze({
    required: function (val) {
        var isValid = required(val);
        return {
            isValid: isValid,
            message: "必填项"
        }
    },
    pattern: function (val, arg) {
        var isValid = pattern(val, arg);
        return {
            isValid: isValid,
            message: "不满足正则表达式" + arg.toString()
        }
    },
    minlength: function (val, arg) {
        var isValid = minlength(val, arg);
        return {
            isValid: isValid,
            message: "长度必须大于等于" + arg
        }
    },
    maxlength: function (val, arg) {
        var isValid = maxlength(val, arg);
        return {
            isValid: isValid,
            message: "长度必须小于等于" + arg
        }
    },
    min: function (val, arg) {
        var isValid = min(val, arg);
        return {
            isValid: isValid,
            message: "值必须大于等于" + arg
        }
    },
    max: function (val, arg) {
        var isValid = max(val, arg);
        return {
            isValid: isValid,
            message: "值必须小于等于" + arg
        }
    }
});

class Watcher {
    constructor(formRef,fieldname){
        this._formRef = formRef;
        this._fieldname = fieldname;
        this._validFns = [];
    }
    validate(validFn,arg,message) {
        this._validFns.push([validFn,arg,message])
        return this;
    }
    required(arg,message) {
        return this.validate(validators.required,arg,message)
    }
    pattern(arg,message) {
        return this.validate(validators.pattern,arg,message)
    }
    minlength(arg,message) {
        return this.validate(validators.minlength,arg,message)
    }
    maxlength(arg,message) {
        return this.validate(validators.maxlength,arg,message)
    }
    min(arg,message) {
        return this.validate(validators.min,arg,message)
    }
    max(arg,message) {
        return this.validate(validators.max,arg,message)
    }
    getWatcher(){
        var formRef = this._formRef;
        var fieldname = this._fieldname;
        var validFns = this._validFns;
        return {
            _cigForm: true,
            _fieldname: fieldname,
            handler: function(newVal){
                var form = this.$refs[formRef];
                var isValid = true;
                var message = "";
                for (var i = 0, len = validFns.length; i < len; i++) {
                    let [fn,arg,cusMessage] = validFns[i]
                    var res = fn(newVal,arg);
                    if(!res.isValid) {
                        isValid = false;
                        message = cusMessage ? cusMessage : res.message;
                        break;
                    }
                }
                var state = {};
                if (isValid) {
                state[fieldname] = {};
                }
                else {
                state[fieldname] = {
                    type: "error",
                    message: message
                };
                }
                form.setValidation(state);
            }
        };
    }
}

export default {
    validators,
    newWatcher: function (formRef,fieldname) {
        return new Watcher(formRef,fieldname)
    },
    regexs:{
        phone: "/(^(1[0-9][0-9])\\d{8}$)/",
        cardNum: "/(^(\\d{6})(18|19|20)?(\\d{2})([01]\\d)([0123]\\d)(\\d{3})(\\d|X)$)/"
    },
    regexMsgs:{
        phone: "不是正确的手机号码",
        cardNum: "不是正确的身份证号码",
    }
}