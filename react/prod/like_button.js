var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 定义组件
var e = React.createElement;
var domContainer = document.querySelector("#like_button_container");

var MButton = function (_React$Component) {
    _inherits(MButton, _React$Component);

    function MButton(props) {
        _classCallCheck(this, MButton);

        var _this = _possibleConstructorReturn(this, (MButton.__proto__ || Object.getPrototypeOf(MButton)).call(this, props));

        _this.state = {
            liked: props.state
        };
        return _this;
    }

    _createClass(MButton, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "button",
                    { className: "haha", onClick: function onClick() {
                            _this2.setState({
                                liked: !_this2.state.liked
                            });
                        } },
                    " Like "
                ),
                React.createElement(
                    "p",
                    null,
                    " ",
                    this.state.liked ? '否' : '是',
                    " "
                ),
                " "
            );
        }
    }]);

    return MButton;
}(React.Component);

var ReactVm = ReactDOM.render(React.createElement(MButton, null), domContainer);
console.log(ReactVm);