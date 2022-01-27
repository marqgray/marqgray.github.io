var app = new (/** @class */ (function () {
    function class_1() {
        var _this = this;
        this.htmlElements = {
            search: document.getElementById("search"),
            submit: document.getElementById("submit"),
            random: document.getElementById("random"),
            mealsElement: document.getElementById("meals"),
            resultHeading: document.getElementById("result-heading"),
            singleMealElement: document.getElementById("single-meal"),
        };
        this.htmlElements.submit.addEventListener("submit", function (e) {
            return _this.searchMeal(e);
        });
        this.htmlElements.random.addEventListener("click", function () {
            return _this.getRandomMeal();
        });
        this.htmlElements.mealsElement.addEventListener("click", function (e) {
            var mealInfo = e.path.find(function (item) {
                if (item.classList) {
                    return item.classList.contains("meal-info");
                }
                else {
                    return false;
                }
            });
            if (mealInfo) {
                var mealID = mealInfo.getAttribute("data-mealid");
                _this.getMealById(mealID);
            }
        });
    }
    class_1.prototype.getRandomMeal = function () {
        var _this = this;
        this.htmlElements.mealsElement.innerHTML = "";
        this.htmlElements.resultHeading.innerHTML = "";
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then(function (res) { return res.json(); })
            .then(function (data) {
            var meal = data.meals[0];
            _this.addMealToDom(meal);
        });
    };
    class_1.prototype.getMealById = function (mealId) {
        var _this = this;
        fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId)
            .then(function (res) { return res.json(); })
            .then(function (data) {
            var meal = data.meals[0];
            _this.addMealToDom(meal);
        });
    };
    class_1.prototype.addMealToDom = function (meal) {
        var ingredients = [];
        for (var i = 1; i <= 20; i++) {
            if (meal["strIngredient" + i]) {
                ingredients.push(meal["strIngredient" + i] + " - " + meal["strMeasure" + i]);
            }
            else {
                break;
            }
        }
        this.htmlElements.singleMealElement.innerHTML = "\n      <div class=\"single-meal\">\n        <h1>" + meal.strMeal + "</h1>\n        <img src=\"" + meal.strMealThumb + "\" alt=\"" + meal.strMeal + "\">\n        <div class=\"single-meal-info\">\n            " + (meal.strCategory ? "<p>" + meal.strCategory + "</p>" : "") + "\n            " + (meal.strArea ? "<p>" + meal.strArea + "</p>" : "") + "\n        </div>\n        <div class=\"main\">\n            <p>" + meal.strInstructions + "</p>\n            <h2>Ingredients</h2>\n            <ul>\n              " + ingredients
            .map(function (ingredient) { return "<li>" + ingredient + "</li>"; })
            .join("") + "\n            </ul>\n        </div>\n      </div>\n    ";
    };
    class_1.prototype.searchMeal = function (e) {
        var _this = this;
        e.preventDefault();
        this.htmlElements.singleMealElement.innerHTML = "";
        var term = this.htmlElements.search.value;
        if (term.trim()) {
            fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term)
                .then(function (res) { return res.json(); })
                .then(function (data) {
                _this.htmlElements.resultHeading.innerHTML = "<h2>Search results for \"" + term + "\":</h2>";
                if (data === null) {
                    _this.htmlElements.resultHeading.innerHTML = "<p>There are no search results. Try again!</p>";
                }
                else {
                    _this.htmlElements.mealsElement.innerHTML = data.meals
                        .map(function (meal) { return "\n              <div class=\"meal\">\n                <img src=\"" + meal.strMealThumb + "\" alt=\"" + meal.strMeal + "\">\n                <div class=\"meal-info\" data-mealID=\"" + meal.idMeal + "\">\n                    <h3>" + meal.strMeal + "</h3>\n                </div>\n              </div>"; })
                        .join("");
                }
            });
            this.htmlElements.search.value = "";
        }
        else {
            alert("Please enter a search term");
        }
    };
    return class_1;
}()))();
//# sourceMappingURL=script.js.map