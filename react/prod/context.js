var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const ThemeContext = React.createContext('22')
// ThemeContext.displayName = 'MyDisplayName';
// function TestProvider (props) {
//     return (
//         <ThemeContext.Provider value={props.value}>
//             <TestConsumer></TestConsumer>
//             <TestClass />
//         </ThemeContext.Provider>
//     )
// }
// function TestConsumer (props) {

//     return (
//         <ThemeContext.Consumer>
//             {value => <div>{value}</div>}
//         </ThemeContext.Consumer>

//     )
// }

// class TestClass extends React.Component {
//     static contextType = ThemeContext
//     render () {
//         return <div>{this.context}</div>
//     }
// }

// class MyControl extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             value1: "1"
//         }
//     }
//     changeHandle = () => {
//         this.setState({
//             value1: 12
//         })
//     }
//     render () {
//         return (
//             <div>
//                 <ThemeContext.Consumer>
//                     {value => <div>{value}</div>}
//                 </ThemeContext.Consumer>
//                 <TestProvider value={this.state.value1} />
//                 <div>{this.state.value1}</div>
//                 <button onClick={this.changeHandle}> change </button>
//             </div>

//         )
//     }
// }

// function Parent(){
//     return <TestChilren name={'子组件name'}>
//           <TestGrandson name={'孙组件name'}></TestGrandson>
//     </TestChilren>
// }

// function TestChilren(props){
//     return <div> <p>子组件：{props.name}</p> {props.children}</div>
// }
// function TestGrandson(props){
//     return <div> <p>孙组件：{props.name}</p></div>
// }
var themes = {
    light: {
        fontgorund: '#000000',
        background: '#eeeeee'
    },
    dark: {
        fontgorund: '#ffffff',
        background: '#222222'
    }
};

var ThemesContext = React.createContext(themes.dark);

var ThemeButton = function (_React$Component) {
    _inherits(ThemeButton, _React$Component);

    function ThemeButton() {
        _classCallCheck(this, ThemeButton);

        return _possibleConstructorReturn(this, (ThemeButton.__proto__ || Object.getPrototypeOf(ThemeButton)).apply(this, arguments));
    }

    _createClass(ThemeButton, [{
        key: 'render',
        value: function render() {
            var props = this.props;
            var theme = this.context;
            return React.createElement(
                'button',
                { style: { backgroundColor: theme.background } },
                props.children
            );
        }
    }]);

    return ThemeButton;
}(React.Component);

ThemeButton.contextType = ThemesContext;


function Toolbar(props) {
    return React.createElement(
        ThemeButton,
        { onClick: props.changeTheme },
        'changeTheme'
    );
}

var App = function (_React$Component2) {
    _inherits(App, _React$Component2);

    function App(props) {
        _classCallCheck(this, App);

        var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this2.state = {
            theme: themes.light
        };

        _this2.toggleTheme = function () {
            _this2.setState(function (state) {
                return {
                    theme: state.theme === themes.dark ? themes.light : _this2.dark
                };
            });
        };
        return _this2;
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
            // 而外部的组件使用默认的 theme 值
            return React.createElement(
                'div',
                null,
                React.createElement(
                    ThemesContext.Provider,
                    { value: this.state.theme },
                    React.createElement(Toolbar, { changeTheme: this.toggleTheme })
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(ThemeButton, null)
                )
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.querySelector('#root'));