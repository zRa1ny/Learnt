
function BoilingVerdict (props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>
    } else {
        return <p>The water would not  boil.</p>
    }
}


// class Calculator extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             temperature: ''
//         }
//     }
//     handleChange = (e) => {
//         this.setState({
//             temperature: e.target.value
//         })
//     }
//     render () {
//         const temperature = this.state.temperature;
//         return (
//             <fieldset>
//                 <legend>Enter temperature in Celsius:</legend>
//                 <input type="text" value={temperature} onChange={this.handleChange} />
//                 <BoilingVerdict celsius={parseFloat(temperature)} />
//             </fieldset>
//         )
//     }
// }




const scaleNames = {
    c: "Celsius",
    f: "Fahrenheit"
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            temperature: ""
        }
    }

    handleChange = e => {
        // this.setState({
        //     temperature: e.target.value
        // })
        this.props.onTemperatureChange(e.target.value, this.props.scale)
    }

    render () {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                    onChange={this.handleChange} />
            </fieldset>
        )
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            temperature: "",
            scale: ""
        }
    }
    onTemperatureChange = (value, scale) => {
        this.setState({
            temperature: value,
            scale: scale
        })
    }
    render () {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <div>
                <TemperatureInput scale="c" onTemperatureChange={this.onTemperatureChange} temperature={celsius} />
                <TemperatureInput scale="f" onTemperatureChange={this.onTemperatureChange} temperature={fahrenheit} />
                <BoilingVerdict
                    celsius={parseFloat(celsius)} />
            </div>
        );
    }
}

function toCelsius (fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit (celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert (temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

ReactDOM.render(<Calculator />, document.querySelector("#root"))