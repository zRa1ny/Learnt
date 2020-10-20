var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ori_from = React.createElement(
    "form",
    null,
    React.createElement(
        "label",
        null,
        "\u540D\u79F0\uFF1A",
        React.createElement("input", { type: "text", name: "name" })
    ),
    React.createElement("input", { type: "submit", value: "\u63D0\u4EA4" })
);

var NameForm = function (_React$Component) {
    _inherits(NameForm, _React$Component);

    function NameForm(props) {
        _classCallCheck(this, NameForm);

        var _this = _possibleConstructorReturn(this, (NameForm.__proto__ || Object.getPrototypeOf(NameForm)).call(this, props));

        _this.handleChange = function (event) {
            _this.setState({ value: event.target.value });
        };

        _this.handleSubmit = function (event) {
            alert('提交的名字: ' + _this.state.value);
            event.preventDefault();
        };

        _this.state = {
            value: props.value ? props.value : ""
        };

        return _this;
    }

    _createClass(NameForm, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { onSubmit: this.handleSubmit },
                React.createElement(
                    "div",
                    null,
                    this.state.value
                ),
                React.createElement(
                    "label",
                    null,
                    "\u540D\u5B57\uFF1A",
                    React.createElement("input", { type: "text", value: this.state.value, onChange: this.handleChange })
                ),
                React.createElement("input", { type: "submit", value: "\u63D0\u4EA4" })
            );
        }
    }]);

    return NameForm;
}(React.Component);

ReactDOM.render(React.createElement(NameForm, null), document.querySelector('#root'));

var TextareaControl = function (_React$Component2) {
    _inherits(TextareaControl, _React$Component2);

    function TextareaControl(props) {
        _classCallCheck(this, TextareaControl);

        var _this2 = _possibleConstructorReturn(this, (TextareaControl.__proto__ || Object.getPrototypeOf(TextareaControl)).call(this, props));

        _this2.handleSubmit = function () {
            alert(_this2.state.value);
        };

        _this2.handleChange = function (ev) {
            _this2.setState({
                value: ev.target.value
            });
        };

        _this2.state = {
            value: props.value ? props.value : ""
        };
        return _this2;
    }

    _createClass(TextareaControl, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { onSubmit: this.handleSubmit },
                React.createElement(
                    "div",
                    null,
                    this.state.value
                ),
                React.createElement(
                    "label",
                    null,
                    "\u540D\u5B57\uFF1A",
                    React.createElement("textarea", { type: "text", value: this.state.value, onChange: this.handleChange })
                ),
                React.createElement("input", { type: "submit", value: "\u63D0\u4EA4" })
            );
        }
    }]);

    return TextareaControl;
}(React.Component);

ReactDOM.render(React.createElement(TextareaControl, null), document.querySelector('#root'));

var SelectControl = function (_TextareaControl) {
    _inherits(SelectControl, _TextareaControl);

    function SelectControl(props) {
        _classCallCheck(this, SelectControl);

        return _possibleConstructorReturn(this, (SelectControl.__proto__ || Object.getPrototypeOf(SelectControl)).call(this, props));
    }

    _createClass(SelectControl, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { onSubmit: this.handleSubmit },
                React.createElement(
                    "label",
                    null,
                    "\u9009\u62E9\u4F60\u559C\u6B22\u7684\u98CE\u5473:",
                    this.state.value,
                    React.createElement(
                        "select",
                        { value: this.state.value, onChange: this.handleChange },
                        React.createElement(
                            "option",
                            { value: "grapefruit" },
                            "\u8461\u8404\u67DA"
                        ),
                        React.createElement(
                            "option",
                            { value: "lime" },
                            "\u9178\u6A59"
                        ),
                        React.createElement(
                            "option",
                            { value: "coconut" },
                            "\u6930\u5B50"
                        ),
                        React.createElement(
                            "option",
                            { value: "mango" },
                            "\u8292\u679C"
                        )
                    )
                ),
                React.createElement("input", { type: "submit", value: "\u63D0\u4EA4" })
            );
        }
    }]);

    return SelectControl;
}(TextareaControl);

ReactDOM.render(React.createElement(SelectControl, null), document.querySelector('#root'));

var Reservation = function (_React$Component3) {
    _inherits(Reservation, _React$Component3);

    function Reservation(props) {
        _classCallCheck(this, Reservation);

        var _this4 = _possibleConstructorReturn(this, (Reservation.__proto__ || Object.getPrototypeOf(Reservation)).call(this, props));

        _this4.handleInputChange = function (ev) {
            var target = ev.target;
            var value = target.name === 'isGoing' ? target.checked : target.value;
            var name = target.name;
            _this4.setState(_defineProperty({}, name, value));
        };

        _this4.state = {
            isGoing: true,
            numberOfGuests: 2
        };
        return _this4;
    }

    _createClass(Reservation, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                null,
                JSON.stringify(this.state),
                React.createElement(
                    "label",
                    null,
                    "\u53C2\u4E0E:",
                    React.createElement("input", {
                        name: "isGoing",
                        type: "checkbox",
                        checked: this.state.isGoing,
                        onChange: this.handleInputChange })
                ),
                React.createElement("br", null),
                React.createElement(
                    "label",
                    null,
                    "\u6765\u5BBE\u4EBA\u6570:",
                    React.createElement("input", {
                        name: "numberOfGuests",
                        type: "number",
                        value: this.state.numberOfGuests,
                        onChange: this.handleInputChange })
                )
            );
        }
    }]);

    return Reservation;
}(React.Component);

ReactDOM.render(React.createElement(Reservation, null), document.querySelector("#root"));
// ReactDOM.render( <input value="hi"  onChange={()=>{}}/>,document.querySelector("#root"))
// setTimeout(function() {
//     ReactDOM.render(<input value={null} onChange={()=>{}} />, document.querySelector("#root"));
//   }, 1000);