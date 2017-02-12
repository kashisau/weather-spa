import React, { Component } from 'react';
import './HourBox.css';

class HourBox extends Component {
  render() {
    return (
      <div className="HourBox">
          <div className="HourBox-temp">
              {this.props.temperature}°C
          </div>
          <div className="HourBox-time">
               {this.props.time}
          </div>
      </div>
    );
  }
}

export default HourBox;
