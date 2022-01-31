var currencyElementOne = (document.getElementById("currency-one"));
var amountElementOne = (document.getElementById("amount-one"));
var currencyElementTwo = (document.getElementById("currency-two"));
var amountElementTwo = (document.getElementById("amount-two"));
var rateElement = document.getElementById("rate");
var swap = document.getElementById("swap");
var calculate = function () {
    var currencyOne = currencyElementOne.value;
    var currencyTwo = currencyElementTwo.value;
    fetch("https://v6.exchangerate-api.com/v6/27c9f4cf9d5b967c980b0e5e/latest/" + currencyOne)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        var rate = Number(data.conversion_rates[currencyTwo]);
        rateElement.innerText = amountElementOne.value + " " + currencyOne + " = " + rate + " " + currencyTwo;
        amountElementTwo.value = (Number(amountElementOne.value) * rate).toFixed(2);
    });
};
currencyElementOne.addEventListener("change", calculate);
amountElementOne.addEventListener("input", calculate);
currencyElementTwo.addEventListener("change", calculate);
amountElementTwo.addEventListener("input", calculate);
swap.addEventListener("click", function () {
    var temp = currencyElementOne.value;
    currencyElementOne.value = currencyElementTwo.value;
    currencyElementTwo.value = temp;
    calculate();
});
calculate();
//# sourceMappingURL=script.js.map