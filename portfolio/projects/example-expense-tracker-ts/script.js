var app = new (/** @class */ (function () {
    function class_1() {
        var _this = this;
        this.htmlElements = {
            balance: document.getElementById("balance"),
            moneyDisplayPlus: (document.getElementById("money-plus")),
            moneyDisplayMinus: (document.getElementById("money-minus")),
            list: document.getElementById("list"),
            form: document.getElementById("form"),
            text: document.getElementById("text"),
            amount: document.getElementById("amount"),
        };
        this.localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
        this.transactions = localStorage.getItem("transactions") !== null
            ? this.localStorageTransactions
            : [];
        this.init();
        this.htmlElements.form.addEventListener("submit", function (e) {
            _this.addTransaction(e);
        });
    }
    class_1.prototype.addTransaction = function (e) {
        e.preventDefault();
        if (this.htmlElements.text.value.trim() === "" ||
            this.htmlElements.amount.value.trim() === "") {
            alert("Please add text and amount.");
        }
        else {
            var transaction = {
                id: this.generateId(),
                text: this.htmlElements.text.value,
                amount: Number(this.htmlElements.amount.value),
            };
            this.transactions.push(transaction);
            this.addTransactionDOM(transaction);
            this.updateValues();
            this.updateLocalStorage();
            this.htmlElements.text.value = "";
            this.htmlElements.amount.value = "";
        }
    };
    class_1.prototype.generateId = function () {
        return Math.floor(Math.random() * 1000000000);
    };
    class_1.prototype.updateLocalStorage = function () {
        localStorage.setItem("transactions", JSON.stringify(this.transactions));
    };
    class_1.prototype.init = function () {
        var _this = this;
        this.htmlElements.list.innerHTML = "";
        this.transactions.forEach(function (transaction) {
            _this.addTransactionDOM(transaction);
        });
        this.updateValues();
    };
    class_1.prototype.addTransactionDOM = function (transaction) {
        var sign = transaction.amount < 0 ? "-" : "+";
        var item = document.createElement("li");
        item.classList.add(transaction.amount < 0 ? "minus" : "plus");
        item.innerHTML = "\n      " + transaction.text + " <span>" + sign + Math.abs(transaction.amount) + "</span>\n      <button class=\"delete-btn\" onclick=\"app.removeTransaction(" + transaction.id + ")\">x</button>\n    ";
        this.htmlElements.list.appendChild(item);
    };
    class_1.prototype.removeTransaction = function (id) {
        this.transactions = this.transactions.filter(function (transaction) { return transaction.id !== id; });
        this.updateLocalStorage();
        this.init();
    };
    class_1.prototype.updateValues = function () {
        var amounts = this.transactions.map(function (transaction) { return transaction.amount; });
        var total = amounts.reduce(function (acc, item) { return (acc += item); }, 0).toFixed(2);
        var income = amounts
            .filter(function (item) { return item > 0; })
            .reduce(function (acc, item) { return (acc += item); }, 0)
            .toFixed(2);
        var expense = (amounts
            .filter(function (item) { return item < 0; })
            .reduce(function (acc, item) { return (acc += item); }, 0) * -1).toFixed(2);
        this.htmlElements.balance.innerText = "$" + total;
        this.htmlElements.moneyDisplayPlus.innerText = "$" + income;
        this.htmlElements.moneyDisplayMinus.innerText = "$" + expense;
    };
    return class_1;
}()))();
