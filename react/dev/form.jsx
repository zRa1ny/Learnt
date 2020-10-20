
var ori_from = (
    <form>
        <label>
            名称：
            <input type="text" name="name" />
        </label>
        <input type="submit" value="提交" />
    </form>
)


class NameForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value ? props.value : ""
        }


    }
    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleSubmit = (event) => {
        alert('提交的名字: ' + this.state.value);
        event.preventDefault();
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>{this.state.value}</div>
                <label>
                    名字：
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="提交" />
            </form>
        )
    }
}

ReactDOM.render(<NameForm />, document.querySelector('#root'))


class TextareaControl extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value ? props.value : ""
        }
    }
    handleSubmit = () => {
        alert(this.state.value)
    }
    handleChange = (ev) => {
        this.setState({
            value: ev.target.value
        })
    }
    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>{this.state.value}</div>
                <label>
                    名字：
                <textarea type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="提交" />
            </form>
        )
    }
}

ReactDOM.render(<TextareaControl />, document.querySelector('#root'))


class SelectControl extends TextareaControl {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    选择你喜欢的风味:{this.state.value}
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">葡萄柚</option>
                        <option value="lime">酸橙</option>
                        <option value="coconut">椰子</option>
                        <option value="mango">芒果</option>
                    </select>
                </label>
                <input type="submit" value="提交" />
            </form>
        );
    }
}

ReactDOM.render(<SelectControl />, document.querySelector('#root'))

class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        }
    }
    handleInputChange = (ev) => {
        const target = ev.target;
        const value = target.name === 'isGoing' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
    render () {
        return (
            <form>
                {JSON.stringify(this.state)}
                <label>
                    参与:
          <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    来宾人数:
          <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange} />
                </label>
            </form>
        )
    }
}
ReactDOM.render( <Reservation />,document.querySelector("#root"))
// ReactDOM.render( <input value="hi"  onChange={()=>{}}/>,document.querySelector("#root"))
// setTimeout(function() {
//     ReactDOM.render(<input value={null} onChange={()=>{}} />, document.querySelector("#root"));
//   }, 1000);