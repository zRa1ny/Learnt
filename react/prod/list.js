
var numbers = [1, 2, 3, 4, 5];
var doubled = numbers.map(function (number) {
    return number * 2;
});
console.log(doubled);
var listItems = numbers.map(function (number) {
    return React.createElement(
        "li",
        { key: number },
        number
    );
});
function UlItem() {
    return React.createElement(
        "ul",
        null,
        listItems
    );
}

ReactDOM.render(React.createElement(UlItem, null), document.querySelector("#root"));

function NumbersList(props) {
    var numbers = props.numbers;
    var LiItems = numbers.map(function (number) {
        return React.createElement(
            "li",
            { key: number },
            number
        );
    });

    return React.createElement(
        "ul",
        null,
        numbers.map(function (number) {
            return React.createElement(
                "li",
                { key: number },
                number
            );
        })
    );
}

ReactDOM.render(React.createElement(NumbersList, { numbers: numbers }), document.querySelector("#root"));