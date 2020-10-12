// 定义组件
const e = React.createElement;
const domContainer = document.querySelector("#like_button_container")
class MButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: props.state
        }
    }
    render () {
        return <div >
            <button className="haha" onClick={
                () => {
                    this.setState({
                        liked: !this.state.liked
                    })
                }
            } > Like </button>
            <p> {
                this.state.liked ? '否' : '是'
            } </p> </div>
    }
}
const ReactVm = ReactDOM.render(< MButton />, domContainer)
console.log(ReactVm)