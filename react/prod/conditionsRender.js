var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function UserGreeting(props) {
    return React.createElement(
        'h1',
        null,
        'Welcome back!'
    );
}

function GuestGreeting(props) {
    return React.createElement(
        'h1',
        null,
        'Please sign up.'
    );
}

// function Greeting (props) {
//     const isLoggedIn = props.isLoggedIn;
//     if (isLoggedIn) {
//         return <UserGreeting />;
//     }
//     return <GuestGreeting />;
// }

var Greeting = function (_React$Component) {
    _inherits(Greeting, _React$Component);

    function Greeting(props) {
        _classCallCheck(this, Greeting);

        var _this = _possibleConstructorReturn(this, (Greeting.__proto__ || Object.getPrototypeOf(Greeting)).call(this, props));

        _this.state = {
            isLoggedIn: props.isLoggedIn
            // console.log(this.isLoggedIn)
            // this.isLoggedIn
        };return _this;
    }

    _createClass(Greeting, [{
        key: 'render',
        value: function render() {
            if (this.props.isLoggedIn) {
                return React.createElement(UserGreeting, null);
            }
            return React.createElement(GuestGreeting, null);
        }
    }]);

    return Greeting;
}(React.Component);

var SetGreeting = function (_React$Component2) {
    _inherits(SetGreeting, _React$Component2);

    function SetGreeting() {
        _classCallCheck(this, SetGreeting);

        var _this2 = _possibleConstructorReturn(this, (SetGreeting.__proto__ || Object.getPrototypeOf(SetGreeting)).call(this));

        _this2.state = {
            isLoggedIn: true
        };
        return _this2;
    }

    _createClass(SetGreeting, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(Greeting, { isLoggedIn: this.state.isLoggedIn }),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            _this3.setState({
                                isLoggedIn: !_this3.state.isLoggedIn
                            });
                        } },
                    'change'
                )
            );
        }
    }]);

    return SetGreeting;
}(React.Component);

function setGreeting(props) {
    var isLoggedIn = props.isLoggedIn;
}

ReactDOM.render(
// Try changing to isLoggedIn={true}:
React.createElement(SetGreeting, null), document.getElementById('root'));

function LoginButton(props) {
    return React.createElement(
        'button',
        { onClick: props.onClick },
        'Login'
    );
}

function LogoutButton(props) {
    return React.createElement(
        'button',
        { onClick: props.onClick },
        'Logout'
    );
}

var LoginControl = function (_React$Component3) {
    _inherits(LoginControl, _React$Component3);

    function LoginControl(props) {
        _classCallCheck(this, LoginControl);

        var _this4 = _possibleConstructorReturn(this, (LoginControl.__proto__ || Object.getPrototypeOf(LoginControl)).call(this, props));

        _this4.state = {
            isLoggedIn: true
        };
        _this4.handleLoginClick = _this4.handleLoginClick.bind(_this4);
        _this4.handleLogoutClick = _this4.handleLogoutClick.bind(_this4);
        return _this4;
    }

    _createClass(LoginControl, [{
        key: 'handleLoginClick',
        value: function handleLoginClick() {
            this.setState({ isLoggedIn: true });
        }
    }, {
        key: 'handleLogoutClick',
        value: function handleLogoutClick() {
            this.setState({ isLoggedIn: false });
        }
    }, {
        key: 'render',
        value: function render() {
            var isLoggedIn = this.state.isLoggedIn;
            var button = void 0;
            if (isLoggedIn) {
                button = React.createElement(LogoutButton, { onClick: this.handleLogoutClick });
            } else {
                button = React.createElement(LoginButton, { onClick: this.handleLoginClick });
            }
            return React.createElement(
                'div',
                null,
                React.createElement(Greeting, { isLoggedIn: isLoggedIn }),
                button
            );
        }
    }]);

    return LoginControl;
}(React.Component);

ReactDOM.render(React.createElement(LoginControl, null), document.getElementById('root'));

function Mailbox(props) {
    var unreadMessages = props.unreadMessages;
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'hello !'
        ),
        unreadMessages.length > 0 && React.createElement(
            'h2',
            null,
            'you have ',
            unreadMessages.length,
            ' unreadMessages.'
        )
    );
}

var messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(React.createElement(Mailbox, { unreadMessages: messages }), document.getElementById('root'));

function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }

    return React.createElement(
        'div',
        { className: 'warning' },
        'Warning!'
    );
}

var Page = function (_React$Component4) {
    _inherits(Page, _React$Component4);

    function Page(props) {
        _classCallCheck(this, Page);

        var _this5 = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

        _this5.state = {
            showWarning: true
        };
        _this5.handleToggleClick = _this5.handleToggleClick.bind(_this5);
        return _this5;
    }

    _createClass(Page, [{
        key: 'handleToggleClick',
        value: function handleToggleClick() {

            this.setState(function (state, props) {
                return {
                    showWarning: !state.showWarning
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(WarningBanner, { warn: this.state.showWarning }),
                React.createElement(
                    'button',
                    { onClick: this.handleToggleClick },
                    this.state.showWarning ? 'Hide' : 'Show'
                )
            );
        }
    }]);

    return Page;
}(React.Component);

ReactDOM.render(React.createElement(Page, null), document.getElementById('root'));