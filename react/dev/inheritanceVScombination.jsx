function FancyBorder (props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    )
}


function SplitPane (props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">{props.left}</div>
            <div className="SplitPane-right">{props.right}</div>
        </div>
    )
}

function App () {
    function Left () {
        return (
            <div>left</div>
        )
    }

    function Right () {
        return (
            <div>right</div>
        )
    }

    let Left1 = <div>left1</div>;
    let Right1 = <div>Right1</div>;
    console.log(Left1)
    return (
        <div>
            <SplitPane left={<Left />} right={<Right />} />
            <SplitPane left={Left1} right={Right1} />
        </div>

    )
}


function WelcomeDialog () {
    return (
        <Dialog color="blue" title="welcome" message="thank you for visiting our home " />
    )
}

function Dialog (props) {
    return (
        <div color="blue">
            <h1 className="Dialog-title">{props.title}</h1>
            <p className="Dialog-messagge">
               {props.message}
            </p>
            {props.children}
        </div>
    )
}


class SignUpDialog extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            login:""
        }
    }
    handleChange= (e)=>{
        this.setState({
            login:e.target.value
        })
    }
    handleClick=()=>{
        alert(`welcome aboard,${this.state.login}`)
    }
    render(){
        return (
            <Dialog title="title" message="message">
                <input type="text" value={this.state.login} onChange={this.handleChange}/>
                <button onClick={this.handleClick}>sign up</button>
            </Dialog>
        )
    }
}
ReactDOM.render(<SignUpDialog />, document.querySelector('#root'))