let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const endTimeAdjusted = document.querySelector('.display__end-time-adjusted');
const buttons = document.querySelectorAll('[data-time]');

const timer = (seconds) => {
    clearInterval(countDown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft <= 0) {
            clearInterval(countDown)
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
};
const displayTimeLeft = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
    console.log({minutes, remainderSeconds});
};

const displayEndTime = (timestamp) => {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minute = end.getMinutes();
    const seconds = end.getSeconds();
    endTime.textContent = `Time was finished at ${hour}:${minute}:${seconds < 10 ? '0' : ''}${seconds}`;
    endTimeAdjusted.textContent = `Time was finished at ${adjustedHour}:${minute}:${seconds < 10 ? '0' : ''}${seconds}`;


};


function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins   * 60);
    this.reset();
})

