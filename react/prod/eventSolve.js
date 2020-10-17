var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function ActionLink() {
    function handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
    }

    return React.createElement(
        'div',
        null,
        React.createElement(
            'a',
            { href: '#', onClick: handleClick },
            'Click me'
        ),
        React.createElement(Toggle, null),
        React.createElement(LoggingButton, null)
    );
}

var Toggle = function (_React$Component) {
    _inherits(Toggle, _React$Component);

    function Toggle(props) {
        _classCallCheck(this, Toggle);

        var _this = _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this, props));

        _this.state = { isToggleOn: true };

        // 为了在回调中使用 `this`，这个绑定是必不可少的
        // this.handleClick = this.handleClick.bind(this);
        return _this;
    }

    _createClass(Toggle, [{
        key: 'handleClick',
        value: function handleClick() {
            this.setState(function (state) {
                return {
                    isToggleOn: !state.isToggleOn
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'button',
                { onClick: this.handleClick.bind(this) },
                this.state.isToggleOn ? 'ON' : 'OFF'
            );
        }
    }]);

    return Toggle;
}(React.Component);

// class LoggingButton extends React.Component{
//     handleClick = ()=>{
//         console.log('this is',this)
//     }
//     render(){
//         return (
//             <button onClick={this.handleClick}>LoggingButton</button>
//         )
//     }
// }

var LoggingButton = function (_React$Component2) {
    _inherits(LoggingButton, _React$Component2);

    function LoggingButton() {
        _classCallCheck(this, LoggingButton);

        var _this2 = _possibleConstructorReturn(this, (LoggingButton.__proto__ || Object.getPrototypeOf(LoggingButton)).call(this));

        _this2.id = "123";
        return _this2;
    }

    _createClass(LoggingButton, [{
        key: 'handleClick',
        value: function handleClick(id) {
            console.log('this is', this, id);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'button',
                { onClick: function onClick(e) {
                        return _this3.handleClick(_this3.id, e);
                    } },
                'LoggingButton'
            );
        }
    }]);

    return LoggingButton;
}(React.Component);

var ReactVm = ReactDOM.render(React.createElement(ActionLink, null), document.querySelector("#root"));