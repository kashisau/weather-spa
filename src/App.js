import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HourBox from './HourBox';

class App extends Component {
 constructor(props) {
    super(props);
    this.state = {
        currently: {
          time: normalTime(new Date()),
          temperature: "..."
        },
        hourly: []
    };
 }

  componentDidMount() {
      fetch(`http://localhost:3001/forecast/-33.8700308,151.2116687/hourly`) 
          .then(result => {
            result.json()
              .then((result) => {
                this.setState({
                  currently: {
                    temperature: normalTemp(result.currently.temperature),
                    time: normalTime(result.currently.time)
                  },
                  hourly: result.hourly.map((hour) => {
                    return {
                      temperature: normalTemp(hour.temperature),
                      time: normalTime(hour.time)
                    }
                  })
                });
              })
          });
  }

  render() {
    return (
      <div className="App">
        <div className="CurrentBar">
          <h1>Sydney</h1>
          <div className="CurrentBar-temp">{this.state.currently.temperature}°C</div>
          <div className="CurrentBar-time">{this.state.currently.time}</div>
        </div>
        <div className="HourBar">
          {this.state.hourly.map((hour, key) => <HourBox time={hour.time} temperature={hour.temperature} />)}
        </div>
      </div>
    );
  }
}

function normalTemp(temp) {
  return Math.round(temp*10) / 10;
}

function normalTime(epoch) {
  var time = new Date(epoch * 1000);
  //return time.toLocaleTimeString("en-AU");
  return (
    ("0" + time.getHours()).slice(-2)   + ":" + 
    ("0" + time.getMinutes()).slice(-2)
  );
}

export default App;
