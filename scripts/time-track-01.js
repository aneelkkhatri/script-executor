Extension.insertCSS({
    code: `#my-timer-container {
        position: fixed;
        left: 0px;
        top: 0px;
        padding: 6px;
        z-index: 999999;
        color: #00ff00;
    }`
});

var timerContainer = document.createElement("div");
timerContainer.id="my-timer-container";
document.body.appendChild(timerContainer);

var MS_SEC = 1000;
var MS_MIN = MS_SEC * 60;
var MS_HR = MS_MIN * 60;

function renderTimeSpent() {
    var s = " ";
    var t = timeSpent;
    var unit = "secs";
    
    if (t > MS_HR) {
        t = t / MS_HR;
        unit = "hrs";
    }
    else if (t > MS_MIN) {
        t = t / MS_MIN;
        unit = "mins";
    }
    else {
        t = t / MS_SEC
        unit = "secs";
    }
    s += t + " " + unit;
    timerContainer.textContent = s;
}
var timeSpent = 0;
var interval = 1000;
var lastKeyActivityTime = Date.now();
var lastMouseActivityTime = Date.now();
function onKeyActivity() { 
	lastKeyActivityTime = Date.now();
	console.log('k');
}
function onMouseActivity() {
	lastMouseActivityTime = Date.now();
}
document.addEventListener('keydown', onKeyActivity);
document.addEventListener('mousemove', onMouseActivity);
document.addEventListener('mousedown', onMouseActivity);
document.addEventListener('mousewheel', onMouseActivity);
setInterval(function () {
    var now = Date.now();
    if (!document.hidden && (document.hasFocus() || now - lastKeyActivityTime < 5000 || now - lastMouseActivityTime < 5000)) {
        timeSpent += interval;
    }
    renderTimeSpent();
}, interval);
