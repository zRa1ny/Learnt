function UserGreeting (props) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting (props) {
    return <h1>Please sign up.</h1>;
}

// function Greeting (props) {
//     const isLoggedIn = props.isLoggedIn;
//     if (isLoggedIn) {
//         return <UserGreeting />;
//     }
//     return <GuestGreeting />;
// }

class Greeting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: props.isLoggedIn
        }
        // console.log(this.isLoggedIn)
        // this.isLoggedIn
    }
    render () {
        if (this.props.isLoggedIn) {
            return <UserGreeting />;
        }
        return <GuestGreeting />;
    }
}


class SetGreeting extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoggedIn: true
        }
    }
    render () {
        return (
            <div>
                <Greeting isLoggedIn={this.state.isLoggedIn} />
                <button onClick={() => {
                    this.setState({
                        isLoggedIn: !this.state.isLoggedIn
                    })
                }}>change</button>
            </div>
        )
    }
}

function setGreeting (props) {
    const isLoggedIn = props.isLoggedIn;

}


ReactDOM.render(
    // Try changing to isLoggedIn={true}:
    <SetGreeting />,
    document.getElementById('root')
);

function LoginButton (props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}

function LogoutButton (props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: true
        }
        this.handleLoginClick = this.handleLoginClick.bind(this)
        this.handleLogoutClick = this.handleLogoutClick.bind(this)
    }
    handleLoginClick () {
        this.setState({ isLoggedIn: true });
    }

    handleLogoutClick () {
        this.setState({ isLoggedIn: false });
    }

    render () {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }
        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}

ReactDOM.render(
    <LoginControl />,
    document.getElementById('root')
);



function Mailbox (props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>hello !</h1>
            {
                unreadMessages.length > 0 &&
                <h2>
                    you have {unreadMessages.length} unreadMessages.
                  </h2>
            }
        </div>
    )
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
    <Mailbox unreadMessages={messages} />,
    document.getElementById('root')
);


function WarningBanner (props) {
    if (!props.warn) {
        return null
    }

    return (
        <div className="warning">
            Warning! 
        </div>
    )
}

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showWarning: true
        }
        this.handleToggleClick = this.handleToggleClick.bind(this)
    }
    handleToggleClick () {

        this.setState(function(state,props){
            return {
                showWarning:!state.showWarning
            }
        })
    }

    render () {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        );
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('root')
);