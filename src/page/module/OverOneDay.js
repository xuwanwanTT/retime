import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      time: new Date()
    };
    this.decrease();
  };

  clock() {
    this.setState({
      time: new Date()
    });
  };

  decrease() {
    let time = this.state.time;
    let Time = 86400 - 3600 * time.getHours() - 60 * time.getMinutes() - time.getSeconds();
    let timeH = ~~(Time / 3600);
    let timeM = ~~((Time - timeH * 3600) / 60);
    let timeS = Time - timeH * 3600 - timeM * 60;
    return (
      <div className="clock">
        <span>{this.pad(timeH)}</span><span>:</span><span>{this.pad(timeM)}</span><span>:</span><span>{this.pad(timeS)}</span>
      </div>
    )
  };

  pad(s) {
    return s < 10 ? '' + 0 + s : s
  }

  render() {
    return (
      <div className="over-one-day">
        <h1>今日剩余时间</h1>
        {this.decrease()}
      </div>
    );
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.clock();
      this.decrease();
    }, 1000)
  };

  componentWillUnmount() {
    clearInterval(this.timer)
  };
}

export default App;
