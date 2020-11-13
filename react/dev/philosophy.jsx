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
var json = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];
// - FilterableProductTable
//     - SearchBar
//     - ProductTable
//         - ProductCategoryRow
//         - ProductRow
function ProductTable (props) {

    let lastc, rows = [];
    props.data.map(value => {
        if (value.category != lastc) {
            rows.push(<ProductCategoryRow category={value.category} key={value.category} />)
            lastc = value.category
        }

        rows.push(<ProductRow name={value.name} price={value.price} key={value.price} />)
    })
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}
function ProductCategoryRow (props) {
    return (
        <tr>
            <td colSpan="2">{props.category}</td>
        </tr>
    )
}

function ProductRow (props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.price}</td>
        </tr>
    )
}


class SearchBar extends React.Component {
    constructor(props) {
        super(props)
    }
    changeHandle = (e) => {
        this.props.set("value", e.target.value)
    }
    boxHandle = (e) => {
        this.props.set("ischecked", e.target.checked)
    }
    render () {
        return (
            <div>
                <input type="text" value={this.props.value} onChange={this.changeHandle} />
                <label>
                    <input type="checkbox" checked={this.props.ischecked} onChange={this.boxHandle} />
                    Only show products in stock
                </label>
            </div>
        )
    }
}


class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ischecked: false,
            value: ""
        }
    }
    setStateHandle = (name, value) => {
        this.setState({
            [name]: value
        })
    }
    render () {
        var value = this.state.value;
        var ischecked = this.state.ischecked;
        var data = json.filter(value => {
            console.log(value.category.toLocaleLowerCase().indexOf(this.state.value.toLocaleLowerCase()) !== -1)
            return (ischecked ? value.stocked : true) && value.name.toLocaleLowerCase().indexOf(this.state.value.toLocaleLowerCase()) !== -1
        })
        return (
            <div>
                <SearchBar value={value} ischecked={ischecked} set={this.setStateHandle} />
                <ProductTable data={data} />
            </div>
        )
    }
}

ReactDOM.render(<FilterableProductTable />, document.querySelector('#root'))
