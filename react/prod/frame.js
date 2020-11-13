var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function RenderDTDD(props) {
    return React.createElement(
        React.Fragment,
        null,
        props.list.map(function (value) {
            return React.createElement(
                React.Fragment,
                { key: value.title },
                React.createElement(
                    "dt",
                    null,
                    value.title
                ),
                React.createElement(
                    "dd",
                    null,
                    value.text
                )
            );
        })
    );
}

var DlComponent = function (_React$Component) {
    _inherits(DlComponent, _React$Component);

    function DlComponent(props) {
        _classCallCheck(this, DlComponent);

        return _possibleConstructorReturn(this, (DlComponent.__proto__ || Object.getPrototypeOf(DlComponent)).call(this, props));
    }

    _createClass(DlComponent, [{
        key: "render",
        value: function render() {
            var list = [{ title: "1", text: "1" }, { title: "2", text: "1" }, { title: "3", text: "1" }];
            return React.createElement(
                "dl",
                null,
                React.createElement(RenderDTDD, { list: list })
            );
        }
    }]);

    return DlComponent;
}(React.Component);

ReactDOM.render(React.createElement(DlComponent, null), document.querySelector('#root'));