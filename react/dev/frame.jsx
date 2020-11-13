function RenderDTDD (props) {
    return (
        <React.Fragment >
            {
                props.list.map(value => (
                    <React.Fragment  key={value.title}>
                    <dt>{value.title}</dt>
                    <dd>{value.text}</dd>
                    </React.Fragment >
                     )
                )
            }
        </React.Fragment >
    )
}

class DlComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        let list = [{title:"1",text:"1"},{title:"2",text:"1"},{title:"3",text:"1"}]
        return (
            <dl>
                <RenderDTDD list={list}></RenderDTDD>
            </dl>
        )
    }
}

ReactDOM.render(<DlComponent />,document.querySelector('#root'))