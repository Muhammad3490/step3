let stepCount = 0;
let isCounting = false;
let lastAcceleration = 0;
let accelerationThreshold = 15;

function updateStepCount() {
    document.getElementById('stepCount').textContent = stepCount;
}

function startCounting() {
    if (!isCounting) {
        window.addEventListener('devicemotion', countSteps);
        isCounting = true;
        document.getElementById('startButton').disabled = true;
        document.getElementById('stopButton').disabled = false;
    }
}

function stopCounting() {
    if (isCounting) {
        window.removeEventListener('devicemotion', countSteps);
        isCounting = false;
        document.getElementById('startButton').disabled = false;
        document.getElementById('stopButton').disabled = true;
    }
}

function countSteps(event) {
    const acceleration = event.acceleration;
    const totalAcceleration = Math.sqrt(
        acceleration.x * acceleration.x +
        acceleration.y * acceleration.y +
        acceleration.z * acceleration.z
    );

    if (totalAcceleration > accelerationThreshold && lastAcceleration <= accelerationThreshold) {
        stepCount++;
        updateStepCount();
    }

    lastAcceleration = totalAcceleration;
}

document.getElementById('startButton').addEventListener('click', startCounting);
document.getElementById('stopButton').addEventListener('click', stopCounting);
