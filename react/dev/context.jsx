// const ThemeContext = React.createContext('22')
// ThemeContext.displayName = 'MyDisplayName';
// function TestProvider (props) {
//     return (
//         <ThemeContext.Provider value={props.value}>
//             <TestConsumer></TestConsumer>
//             <TestClass />
//         </ThemeContext.Provider>
//     )
// }
// function TestConsumer (props) {

//     return (
//         <ThemeContext.Consumer>
//             {value => <div>{value}</div>}
//         </ThemeContext.Consumer>

//     )
// }

// class TestClass extends React.Component {
//     static contextType = ThemeContext
//     render () {
//         return <div>{this.context}</div>
//     }
// }

// class MyControl extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             value1: "1"
//         }
//     }
//     changeHandle = () => {
//         this.setState({
//             value1: 12
//         })
//     }
//     render () {
//         return (
//             <div>
//                 <ThemeContext.Consumer>
//                     {value => <div>{value}</div>}
//                 </ThemeContext.Consumer>
//                 <TestProvider value={this.state.value1} />
//                 <div>{this.state.value1}</div>
//                 <button onClick={this.changeHandle}> change </button>
//             </div>

//         )
//     }
// }

// function Parent(){
//     return <TestChilren name={'子组件name'}>
//           <TestGrandson name={'孙组件name'}></TestGrandson>
//     </TestChilren>
// }

// function TestChilren(props){
//     return <div> <p>子组件：{props.name}</p> {props.children}</div>
// }
// function TestGrandson(props){
//     return <div> <p>孙组件：{props.name}</p></div>
// }
const themes = {
    light:{
        fontgorund:'#000000',
        background:'#eeeeee'
    },
    dark:{
        fontgorund:'#ffffff',
        background:'#222222'
    }
}

const ThemesContext = React.createContext(
    themes.dark
)

class ThemeButton extends React.Component{
    static contextType = ThemesContext
    render(){
        let props = this.props;
        let theme = this.context
        return (
            <button style={{backgroundColor:theme.background}}>
                {props.children}
            </button>
        )
    }
}

function Toolbar (props){
    return (
        <ThemeButton onClick={props.changeTheme}>
            changeTheme
        </ThemeButton>
    )
}


class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            theme:themes.light
        }

        this.toggleTheme = () => {
            this.setState(state =>({
                theme:state.theme === themes.dark ? themes.light : this.dark
            }))
        }
    }

    render() {
        // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
        // 而外部的组件使用默认的 theme 值
        return (
          <div>
            <ThemesContext.Provider value={this.state.theme}>
              <Toolbar changeTheme={this.toggleTheme} />
            </ThemesContext.Provider>
            <div>
              <ThemeButton />
            </div>
          </div>
        );
      }
}
ReactDOM.render(<App />, document.querySelector('#root'))