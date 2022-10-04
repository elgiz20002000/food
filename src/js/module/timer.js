'use strict';
function timer(timeLimiteValue , timerSelector) {
    // Timer

    function timeCalc(time) {
        const t = Date.parse(time) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            t,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function setTime(selector , time) {
        
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds') ,
            timeInterval = setInterval(updateTime , 1000);

            updateTime();

            function zero(num) {
                if(num >= 0 && num < 10){
                    return `0${num}`;
                } else {
                    return num;
                }
            }

            function updateTime() {
                const total = timeCalc(time);
                days.innerHTML = zero(total.days);
                hours.innerHTML = zero(total.hours);
                minutes.innerHTML = zero(total.minutes);
                seconds.innerHTML = zero(total.seconds);

                if(total.total <= 0){
                    clearInterval(timeInterval);
                }

            }
    }
    setTime(timerSelector , timeLimiteValue);
}

export default timer;