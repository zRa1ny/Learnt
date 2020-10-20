
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function (number) {
    return number * 2
})
console.log(doubled)
const listItems = numbers.map(number => <li key={number}>{number}</li>)
function UlItem () {
    return (
        <ul>
            {listItems}
        </ul>
    )
}

ReactDOM.render(<UlItem />, document.querySelector("#root"))

function NumbersList (props) {
    const numbers = props.numbers;
    const LiItems = numbers.map(number => <li key={number}>{number}</li>)

    return (
        <ul>
            {numbers.map(number => <li key={number}>{number}</li>)}
        </ul>
    )
}

ReactDOM.render(<NumbersList numbers={numbers} />, document.querySelector("#root"))