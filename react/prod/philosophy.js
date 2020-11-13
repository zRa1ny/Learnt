var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// let timer;
// $("input").on('blur', function () {
//     timer = setTimeout(function () {
//         clearTimeout(timer)
//         window.scrollTo(0, document.documentElement.clientHeight);
//     }, 100)
// })

// $("input").on('focus', function () {
//     clearTimeout(timer);
//     $(this)[0].scrollIntoView()
// })
var json = [{ category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" }, { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" }, { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" }, { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" }, { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" }, { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }];
// - FilterableProductTable
//     - SearchBar
//     - ProductTable
//         - ProductCategoryRow
//         - ProductRow
function ProductTable(props) {

    var lastc = void 0,
        rows = [];
    props.data.map(function (value) {
        if (value.category != lastc) {
            rows.push(React.createElement(ProductCategoryRow, { category: value.category, key: value.category }));
            lastc = value.category;
        }

        rows.push(React.createElement(ProductRow, { name: value.name, price: value.price, key: value.price }));
    });
    return React.createElement(
        "table",
        null,
        React.createElement(
            "thead",
            null,
            React.createElement(
                "tr",
                null,
                React.createElement(
                    "th",
                    null,
                    "Name"
                ),
                React.createElement(
                    "th",
                    null,
                    "Price"
                )
            )
        ),
        React.createElement(
            "tbody",
            null,
            rows
        )
    );
}
function ProductCategoryRow(props) {
    return React.createElement(
        "tr",
        null,
        React.createElement(
            "td",
            { colSpan: "2" },
            props.category
        )
    );
}

function ProductRow(props) {
    return React.createElement(
        "tr",
        null,
        React.createElement(
            "td",
            null,
            props.name
        ),
        React.createElement(
            "td",
            null,
            props.price
        )
    );
}

var SearchBar = function (_React$Component) {
    _inherits(SearchBar, _React$Component);

    function SearchBar(props) {
        _classCallCheck(this, SearchBar);

        var _this = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

        _this.changeHandle = function (e) {
            _this.props.set("value", e.target.value);
        };

        _this.boxHandle = function (e) {
            _this.props.set("ischecked", e.target.checked);
        };

        return _this;
    }

    _createClass(SearchBar, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement("input", { type: "text", value: this.props.value, onChange: this.changeHandle }),
                React.createElement(
                    "label",
                    null,
                    React.createElement("input", { type: "checkbox", checked: this.props.ischecked, onChange: this.boxHandle }),
                    "Only show products in stock"
                )
            );
        }
    }]);

    return SearchBar;
}(React.Component);

var FilterableProductTable = function (_React$Component2) {
    _inherits(FilterableProductTable, _React$Component2);

    function FilterableProductTable(props) {
        _classCallCheck(this, FilterableProductTable);

        var _this2 = _possibleConstructorReturn(this, (FilterableProductTable.__proto__ || Object.getPrototypeOf(FilterableProductTable)).call(this, props));

        _this2.setStateHandle = function (name, value) {
            _this2.setState(_defineProperty({}, name, value));
        };

        _this2.state = {
            ischecked: false,
            value: ""
        };
        return _this2;
    }

    _createClass(FilterableProductTable, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            var value = this.state.value;
            var ischecked = this.state.ischecked;
            var data = json.filter(function (value) {
                console.log(value.category.toLocaleLowerCase().indexOf(_this3.state.value.toLocaleLowerCase()) !== -1);
                return (ischecked ? value.stocked : true) && value.name.toLocaleLowerCase().indexOf(_this3.state.value.toLocaleLowerCase()) !== -1;
            });
            return React.createElement(
                "div",
                null,
                React.createElement(SearchBar, { value: value, ischecked: ischecked, set: this.setStateHandle }),
                React.createElement(ProductTable, { data: data })
            );
        }
    }]);

    return FilterableProductTable;
}(React.Component);

ReactDOM.render(React.createElement(FilterableProductTable, null), document.querySelector('#root'));