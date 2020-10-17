function ActionLink () {
    function handleClick (e) {
        e.preventDefault();
        console.log('The link was clicked.');
    }

    return (
        <div>
            <a href="#" onClick={handleClick}>Click me</a>
            <Toggle />
            <LoggingButton />
        </div>
    );
}

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };

        // 为了在回调中使用 `this`，这个绑定是必不可少的
        // this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    render () {
        return (
            <button onClick={this.handleClick.bind(this)}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

// class LoggingButton extends React.Component{
//     handleClick = ()=>{
//         console.log('this is',this)
//     }
//     render(){
//         return (
//             <button onClick={this.handleClick}>LoggingButton</button>
//         )
//     }
// }

class LoggingButton extends React.Component {
    constructor() {
        super()
        this.id = "123"
    }
    handleClick (id) {
        console.log('this is', this,id)
        
    }
    render () {
        return (
            <button onClick={(e) => this.handleClick(this.id,e)}>LoggingButton</button>
        )
    }
}



const ReactVm = ReactDOM.render(< ActionLink />, document.querySelector("#root"))