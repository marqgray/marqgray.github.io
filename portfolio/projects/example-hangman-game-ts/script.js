var game = new (/** @class */ (function () {
    function class_1() {
        var _this = this;
        this.htmlElements = {
            word: document.getElementById("word"),
            wrongLetters: document.getElementById("wrong-letters"),
            buttonPlayAgain: document.getElementById("play-button"),
            popup: document.getElementById("popup-container"),
            notification: (document.getElementById("notification-container")),
            finalMessage: document.getElementById("final-message"),
            figureParts: (document.querySelectorAll(".figure-part")),
        };
        this.words = ["application", "programming", "interface", "wizard"];
        this.selectedWord = this.words[Math.floor(Math.random() * this.words.length)];
        this.correctLetters = [];
        this.wrongLetters = [];
        window.addEventListener("keydown", function (e) {
            if (e.keyCode >= 65 && e.keyCode <= 90) {
                var letter = e.key;
                if (_this.selectedWord.indexOf(letter) > -1) {
                    if (!(_this.correctLetters.indexOf(letter) > -1)) {
                        _this.correctLetters.push(letter);
                        _this.displayWord();
                    }
                    else {
                        _this.showNotification();
                    }
                }
                else {
                    if (!(_this.wrongLetters.indexOf(letter) > -1)) {
                        _this.wrongLetters.push(letter);
                        _this.updateWrongLettersElement();
                    }
                }
            }
        });
        this.htmlElements.buttonPlayAgain.addEventListener("click", function (e) {
            _this.correctLetters.splice(0);
            _this.wrongLetters.splice(0);
            _this.selectedWord =
                _this.words[Math.floor(Math.random() * _this.words.length)];
            _this.displayWord();
            _this.updateWrongLettersElement();
            _this.htmlElements.popup.style.display = "none";
        });
        this.displayWord();
    }
    class_1.prototype.updateWrongLettersElement = function () {
        var _this = this;
        this.htmlElements.wrongLetters.innerHTML = "\n      " + (this.wrongLetters.length > 0 ? "<p>Wrong</p>" : "") + "\n      " + this.wrongLetters.map(function (letter) { return "<span>" + letter + "</span>"; }) + "\n    ";
        this.htmlElements.figureParts.forEach(function (part, index) {
            var errors = _this.wrongLetters.length;
            if (index < errors) {
                part.style.display = "block";
            }
            else {
                part.style.display = "none";
            }
        });
        if (this.wrongLetters.length === this.htmlElements.figureParts.length) {
            this.htmlElements.finalMessage.innerText = "Unfortunately, you lost.";
            this.htmlElements.popup.style.display = "flex";
        }
    };
    class_1.prototype.showNotification = function () {
        var _this = this;
        this.htmlElements.notification.classList.add("show");
        setTimeout(function () {
            _this.htmlElements.notification.classList.remove("show");
        }, 2000);
    };
    class_1.prototype.displayWord = function () {
        var _this = this;
        this.htmlElements.word.innerHTML = "" + this.selectedWord
            .split("")
            .map(function (letter) { return "\n      <span class=\"letter\">\n        " + (_this.correctLetters.indexOf(letter) > -1 ? letter : "") + "\n      </span>\n      "; })
            .join("");
        var innerWord = this.htmlElements.word.innerText.replace(/\n/g, "");
        if (innerWord === this.selectedWord) {
            this.htmlElements.finalMessage.innerText = "Congratulations! You won!";
            this.htmlElements.popup.style.display = "flex";
        }
    };
    return class_1;
}()))();
