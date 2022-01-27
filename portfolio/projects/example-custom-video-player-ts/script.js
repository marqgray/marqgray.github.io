var idDefinitions = {
    video: "video",
    play: "play",
    stop: "stop",
    progress: "progress",
    timestamp: "timestamp",
};
var htmlElements = {
    video: document.getElementById(idDefinitions.video),
    play: document.getElementById(idDefinitions.play),
    stop: document.getElementById(idDefinitions.stop),
    progress: document.getElementById(idDefinitions.progress),
    timestamp: document.getElementById(idDefinitions.timestamp),
};
var toggleVideoStatus = function () {
    if (htmlElements.video.paused) {
        htmlElements.video.play().then(function () { });
    }
    else {
        htmlElements.video.pause();
    }
};
var updatePlayIcon = function () {
    if (htmlElements.video.paused) {
        htmlElements.play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    }
    else {
        htmlElements.play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
};
var updateProgress = function () {
    htmlElements.progress.value = String((htmlElements.video.currentTime / htmlElements.video.duration) * 100);
    var minutes = String(Math.floor(htmlElements.video.currentTime / 60));
    if (Number(minutes) < 10) {
        minutes = "0" + minutes;
    }
    var seconds = String(Math.floor(htmlElements.video.currentTime % 60));
    if (Number(seconds) < 10) {
        seconds = "0" + seconds;
    }
    htmlElements.timestamp.innerHTML = minutes + ":" + seconds;
};
var stopVideo = function () {
    htmlElements.video.currentTime = 0;
    htmlElements.video.pause();
};
var setVideoProgress = function () {
    htmlElements.video.currentTime =
        (+htmlElements.progress.value * htmlElements.video.duration) / 100;
};
htmlElements.video.addEventListener("click", toggleVideoStatus);
htmlElements.video.addEventListener("play", updatePlayIcon);
htmlElements.video.addEventListener("pause", updatePlayIcon);
htmlElements.video.addEventListener("timeupdate", updateProgress);
htmlElements.play.addEventListener("click", toggleVideoStatus);
htmlElements.stop.addEventListener("click", stopVideo);
htmlElements.progress.addEventListener("change", setVideoProgress);
