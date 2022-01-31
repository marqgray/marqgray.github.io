var app = new (/** @class */ (function () {
    function class_1() {
        var _this = this;
        this.htmlElements = {
            musicContainer: document.getElementById("music-container"),
            playButton: document.getElementById("play"),
            previousButton: document.getElementById("prev"),
            nextButton: document.getElementById("next"),
            audio: document.getElementById("audio"),
            progress: document.getElementById("progress"),
            progressContainer: (document.getElementById("progress-container")),
            title: document.getElementById("title"),
            cover: document.getElementById("cover"),
        };
        this.songs = ["hey", "summer", "ukulele"];
        this.songIndex = 2;
        this.loadSong(this.songs[this.songIndex]);
        this.htmlElements.playButton.addEventListener("click", function () {
            var isPlaying = _this.htmlElements.musicContainer.classList.contains("play");
            if (isPlaying) {
                _this.pauseSong();
            }
            else {
                _this.playSong();
            }
        });
        this.htmlElements.previousButton.addEventListener("click", function () {
            _this.previousSong();
        });
        this.htmlElements.nextButton.addEventListener("click", function () {
            _this.nextSong();
        });
        this.htmlElements.audio.addEventListener("timeupdate", function (e) {
            _this.updateProgress(e);
        });
        this.htmlElements.progressContainer.addEventListener("click", function (e) {
            _this.setProgress(e);
        });
        this.htmlElements.audio.addEventListener("ended", function () {
            _this.nextSong();
        });
    }
    class_1.prototype.loadSong = function (song) {
        this.htmlElements.title.innerText = song;
        this.htmlElements.audio.src = "music/" + song + ".mp3";
        this.htmlElements.cover.src = "images/" + song + ".jpg";
    };
    class_1.prototype.playSong = function () {
        this.htmlElements.musicContainer.classList.add("play");
        this.htmlElements.playButton
            .querySelector("https://marqgray.github.io/portfolio/projects/example-web-music-player-ts/i.fas")
            .classList.remove("fa-play");
        this.htmlElements.playButton
            .querySelector("i.fas")
            .classList.add("fa-pause");
        this.htmlElements.audio.play();
    };
    class_1.prototype.pauseSong = function () {
        this.htmlElements.musicContainer.classList.remove("play");
        this.htmlElements.playButton
            .querySelector("i.fas")
            .classList.add("fa-play");
        this.htmlElements.playButton
            .querySelector("i.fas")
            .classList.remove("fa-pause");
        this.htmlElements.audio.pause();
    };
    class_1.prototype.previousSong = function () {
        this.songIndex--;
        if (this.songIndex < 0) {
            this.songIndex = this.songs.length - 1;
        }
        this.loadSong(this.songs[this.songIndex]);
        this.playSong();
    };
    class_1.prototype.nextSong = function () {
        this.songIndex++;
        if (this.songIndex > this.songs.length - 1) {
            this.songIndex = 0;
        }
        this.loadSong(this.songs[this.songIndex]);
        this.playSong();
    };
    class_1.prototype.updateProgress = function (e) {
        var _a = e.target, duration = _a.duration, currentTime = _a.currentTime;
        var progressPercent = (currentTime / duration) * 100;
        this.htmlElements.progress.style.width = progressPercent + "%";
    };
    class_1.prototype.setProgress = function (e) {
        var target = e.target;
        var width = target.clientWidth;
        var clickX = e.offsetX;
        var duration = this.htmlElements.audio.duration;
        this.htmlElements.audio.currentTime = (clickX / width) * duration;
    };
    return class_1;
}()))();
