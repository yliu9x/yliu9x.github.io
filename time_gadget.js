'use strict';

class TimeGadget extends React.Component {
    constructor(props) {
        super(props);
        this.calcTime = function (city, offset) {
            // create Date object for current location
            var d = new Date();

            // convert to msec
            // subtract local time zone offset
            // get UTC time in msec
            var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

            // create new Date object for different city
            // using supplied offset
            var nd = new Date(utc + (3600000*offset));

            // return time as a string
            return nd.toLocaleString();
        }
        this.state = { time: this.calcTime('Beijing', 8) };
    }

    tick() {
        this.setState(state => ({
            time: this.calcTime('San Francisco', -7)
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return React.createElement(
            'p',
            null,
            'San Francisco time: ',
            this.calcTime('San Francisco', -7)
        );
    }
}

const domContainer = document.querySelector('#timeGadget');
ReactDOM.render(React.createElement(TimeGadget, null), domContainer);