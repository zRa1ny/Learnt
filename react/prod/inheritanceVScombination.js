var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function FancyBorder(props) {
    return React.createElement(
        "div",
        { className: 'FancyBorder FancyBorder-' + props.color },
        props.children
    );
}

function SplitPane(props) {
    return React.createElement(
        "div",
        { className: "SplitPane" },
        React.createElement(
            "div",
            { className: "SplitPane-left" },
            props.left
        ),
        React.createElement(
            "div",
            { className: "SplitPane-right" },
            props.right
        )
    );
}

function App() {
    function Left() {
        return React.createElement(
            "div",
            null,
            "left"
        );
    }

    function Right() {
        return React.createElement(
            "div",
            null,
            "right"
        );
    }

    var Left1 = React.createElement(
        "div",
        null,
        "left1"
    );
    var Right1 = React.createElement(
        "div",
        null,
        "Right1"
    );
    console.log(Left1);
    return React.createElement(
        "div",
        null,
        React.createElement(SplitPane, { left: React.createElement(Left, null), right: React.createElement(Right, null) }),
        React.createElement(SplitPane, { left: Left1, right: Right1 })
    );
}

function WelcomeDialog() {
    return React.createElement(Dialog, { color: "blue", title: "welcome", message: "thank you for visiting our home " });
}

function Dialog(props) {
    return React.createElement(
        "div",
        { color: "blue" },
        React.createElement(
            "h1",
            { className: "Dialog-title" },
            props.title
        ),
        React.createElement(
            "p",
            { className: "Dialog-messagge" },
            props.message
        ),
        props.children
    );
}

var SignUpDialog = function (_React$Component) {
    _inherits(SignUpDialog, _React$Component);

    function SignUpDialog(props) {
        _classCallCheck(this, SignUpDialog);

        var _this = _possibleConstructorReturn(this, (SignUpDialog.__proto__ || Object.getPrototypeOf(SignUpDialog)).call(this, props));

        _this.handleChange = function (e) {
            _this.setState({
                login: e.target.value
            });
        };

        _this.handleClick = function () {
            alert("welcome aboard," + _this.state.login);
        };

        _this.state = {
            login: ""
        };
        return _this;
    }

    _createClass(SignUpDialog, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Dialog,
                { title: "title", message: "message" },
                React.createElement("input", { type: "text", value: this.state.login, onChange: this.handleChange }),
                React.createElement(
                    "button",
                    { onClick: this.handleClick },
                    "sign up"
                )
            );
        }
    }]);

    return SignUpDialog;
}(React.Component);

ReactDOM.render(React.createElement(SignUpDialog, null), document.querySelector('#root'));