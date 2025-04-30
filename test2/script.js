const warning = document.getElementById("warning");

class BankAccount{
    #balance;
    constructor(balance){
        this.#balance = balance;
    }

    deposit(amount){
        if (amount > 0){
            this.#balance += amount;
            console.log(`Deposited ${amount}$, New Balance: ${this.#balance}$`);
        }
        else{
            console.log("Amount must be postive");
        }
    }

    withdraw(amount){
        if(amount > 0 && amount <= this.#balance){
            this.#balance -= amount;
            console.log(`Withdrew ${amount}$, New Balance: ${this.#balance}$`);
        }
        else if(amount <= 0){
            console.log("The amount of money You want to withdraw should exceed 0$");
        }
        else if(amount >= this.#balance){
            warning.textContent = "You don't have enough balance. You Can't proceed with the widthdrawal.";
        }
    }

    getBalance(){
        return this.#balance;
    }
}

const bank1 = new BankAccount(0);
const balanceStr = document.getElementById("balance");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const amount = form.elements.amount.value;
    const operation = form.elements.operation.value;

    if (operation === "d"){
        bank1.deposit(Number(amount));
    } else {
        bank1.withdraw(Number(amount));
    }

    balanceStr.textContent = `Balance: ${bank1.getBalance()}$`
})