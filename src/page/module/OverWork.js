import React from 'react';
import axios from 'axios';

function getNowDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const today = pad(month + 1) + '-' + pad(day);
  return { date, year, month, day, today };
}
function pad(s) {
  return s < 10 ? '' + 0 + s : s
}

class OverWork extends React.Component {
  constructor() {
    super();
    const date = getNowDate();
    this.goWorkTime = new Date(date.year, date.month, date.day, 9, 0, 0);
    this.state = {
      time: Date.now() - this.goWorkTime
    };
    this.date = date;
    this.animate = this.animate.bind(this);
  }

  clock() {
    this.setState({
      time: Date.now() - this.goWorkTime.getTime()
    });
  }

  animate() {
    window.requestAnimationFrame(this.animate);
    this.clock();
  }

  componentDidMount() {
    const me = this;
    const date = this.date;
    const year = date.year;
    const month = date.month;
    const day = date.day;
    const today = date.today;

    const url = 'http://172.16.101.214:8084/overwork?';
    const paramer = `period=${year}-${pad(month + 1)}`;
    axios.get(url + paramer)
      .then(function (res) {
        const data = res.data;
        let time = data[today].slice(0, 5);
        const reg = /(.+):(.+)/;
        if (reg.test(time)) {
          time = time.split(':');
          let goWorkTime = new Date(year, month, day, time[0], time[1], 0);
          const earlyTime = new Date(year, month, day, 8, 30, 0);
          const lateTime = new Date(year, month, day, 9, 0, 0);
          if (goWorkTime > lateTime) {
            goWorkTime = lateTime;
          } else if (goWorkTime < earlyTime) {
            goWorkTime = earlyTime;
          }
          me.goWorkTime = goWorkTime;
          me.animate();
        }
      });
  }

  render() {
    let time = ~~(this.state.time);
    let Time = 9.5 * 60 * 60 * 1000 - time;
    let timeH = ~~(Time / (60 * 60 * 1000));
    let timeM = ~~((Time - timeH * 3600000) / 60000);
    let timeS = ~~((Time - timeH * 3600000 - timeM * 60000) / 1000);
    let timeMM = Time - timeH * 3600000 - timeM * 60000 - timeS * 1000;
    return (
      <div className={'over-work'}>
        <h1>下班剩余时间</h1>
        <div className="clock">
          <div>{pad(timeH)}</div>
          <div>:</div>
          <div>{pad(timeM)}</div>
          <div>:</div>
          <div>{pad(timeS)}</div>
          <div>:</div>
          <div style={{ width: 108 }}>{pad(timeMM)}</div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }
};

export default OverWork;
