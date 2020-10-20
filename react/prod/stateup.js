var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return React.createElement(
            "p",
            null,
            "The water would boil."
        );
    } else {
        return React.createElement(
            "p",
            null,
            "The water would not  boil."
        );
    }
}

// class Calculator extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             temperature: ''
//         }
//     }
//     handleChange = (e) => {
//         this.setState({
//             temperature: e.target.value
//         })
//     }
//     render () {
//         const temperature = this.state.temperature;
//         return (
//             <fieldset>
//                 <legend>Enter temperature in Celsius:</legend>
//                 <input type="text" value={temperature} onChange={this.handleChange} />
//                 <BoilingVerdict celsius={parseFloat(temperature)} />
//             </fieldset>
//         )
//     }
// }


var scaleNames = {
    c: "Celsius",
    f: "Fahrenheit"
};

var TemperatureInput = function (_React$Component) {
    _inherits(TemperatureInput, _React$Component);

    function TemperatureInput(props) {
        _classCallCheck(this, TemperatureInput);

        var _this = _possibleConstructorReturn(this, (TemperatureInput.__proto__ || Object.getPrototypeOf(TemperatureInput)).call(this, props));

        _this.handleChange = function (e) {
            // this.setState({
            //     temperature: e.target.value
            // })
            _this.props.onTemperatureChange(e.target.value, _this.props.scale);
        };

        _this.state = {
            temperature: ""
        };
        return _this;
    }

    _createClass(TemperatureInput, [{
        key: "render",
        value: function render() {
            var temperature = this.props.temperature;
            var scale = this.props.scale;
            return React.createElement(
                "fieldset",
                null,
                React.createElement(
                    "legend",
                    null,
                    "Enter temperature in ",
                    scaleNames[scale],
                    ":"
                ),
                React.createElement("input", { value: temperature,
                    onChange: this.handleChange })
            );
        }
    }]);

    return TemperatureInput;
}(React.Component);

var Calculator = function (_React$Component2) {
    _inherits(Calculator, _React$Component2);

    function Calculator(props) {
        _classCallCheck(this, Calculator);

        var _this2 = _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).call(this, props));

        _this2.onTemperatureChange = function (value, scale) {
            _this2.setState({
                temperature: value,
                scale: scale
            });
        };

        _this2.state = {
            temperature: "",
            scale: ""
        };
        return _this2;
    }

    _createClass(Calculator, [{
        key: "render",
        value: function render() {
            var scale = this.state.scale;
            var temperature = this.state.temperature;
            var celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
            var fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
            return React.createElement(
                "div",
                null,
                React.createElement(TemperatureInput, { scale: "c", onTemperatureChange: this.onTemperatureChange, temperature: celsius }),
                React.createElement(TemperatureInput, { scale: "f", onTemperatureChange: this.onTemperatureChange, temperature: fahrenheit }),
                React.createElement(BoilingVerdict, {
                    celsius: parseFloat(celsius) })
            );
        }
    }]);

    return Calculator;
}(React.Component);

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return celsius * 9 / 5 + 32;
}

function tryConvert(temperature, convert) {
    var input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    var output = convert(input);
    var rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

ReactDOM.render(React.createElement(Calculator, null), document.querySelector("#root"));