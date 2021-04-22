
class Timer {
  
  constructor(){
    this.endtime = new Date('2021-07-10:15:00');
    this.id = '#timer';
  }

  startLogOutTimer(){
    const tick = () => {
      const labelTimer = document.querySelector(this.id),
            labelSec = labelTimer.querySelector('.seconds span '),
            labelMin = labelTimer.querySelector('.minuts span '),
            labelHours = labelTimer.querySelector('.hours span '),
            labelDays = labelTimer.querySelector('.days span '),
            time =  Date.parse(this.endtime) - Date.parse(new Date()),
            sec = String(Math.floor((time / 1000)  % 60)).padStart(2,0),
            min = String(Math.floor((time / 1000 / 60 ) % 60)).padStart(2,0),
            hours = String(Math.floor((time / (1000 * 60 * 60)) % 24)).padStart(2,0),
            days = String(Math.floor((time / (1000 * 60 * 60 * 24)))).padStart(2,0);

      labelSec.textContent = sec;
      labelMin.textContent = min;
      labelHours.textContent = hours;
      labelDays.textContent = days;

      if (time === 0) {
        clearInterval(timer);
      }
    }
    tick();
    const timer = setInterval(tick, 1000);
    return timer;
  }
}

export default Timer;