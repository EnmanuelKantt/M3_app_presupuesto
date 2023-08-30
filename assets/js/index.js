//funcion constructora
class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

  //submit presupuesto
  submitBudgetForm() {
    const value = this.budgetInput.value;
    if (value == "" || value < 0) {
      this.budgetFeedback.classList.add("showItem");
      this.budgetFeedback.innerHTML =
        "<p>El valor ingresado no puede ser nulo o negativo</p>";
      const self = this;

      setTimeout(function () {
        self.budgetFeedback.classList.remove("showItem");
      }, 4000);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = "";
      this.showBalance();
    }
  }
  showBalance() {
    const expense = this.totalExpense();
    const total = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = total;
    if (total < 0) {
      this.balance.classList.remove("showGreen", "showBlack");
      this.balance.classList.add("showRed");
    }
    if (total > 0) {
      this.balance.classList.remove("showRed", "showBlack");
      this.balance.classList.add("showGreen");
    }
    if (total === 0) {
      this.balance.classList.remove("showRed", "showBlack");
      this.balance.classList.add("showRed");
    }
  }

  //sbmt xpns tstmp 55
  submitExpenseform() {
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;
    if (expenseValue === "" || amountValue < 0) {
      this.expenseFeedback.classList.add("showItem");
      this.expenseFeedback.innerHTML =
        "<p> El valor ingresado no es correcto</p>";

      setTimeout(function () {
        self.expenseFeedback.classList.remove("showItem");
      }, 4000);
    } else {
      let amount = parseInt(amountValue);
      this.expenseInput.value = "";
      this.amountInput.value = "";

      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount,
      };

      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();
    }
  }

  //add xpns 104
  addExpense(expense) {
    const div = document.createElement("div");
    div.classList.add("expense");
    div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">
        
        <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
        <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

        <div class="expense-icons list-item">
            <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
                <i class="fas fa-edit"></i>
                </a>
            <a href="#" class="delete-icon" data-id="${expense.id}">
                <i class="fas fa-trash"></i>
                </a>
            </div>      
        </div>`;

    //15230

    this.expenseList.appendChild(div);
  }

  //ttl xpns tstmp 4735
  totalExpense() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce((acc, curr) => {
        return acc += curr.amount;
      }, 0);
    }
    this.expenseAmount.textContent = total;
    return total;
  }

  //edit expense 124
  editExpense(element) {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    //rm
    this.expenseList.removeChild(parent);
    //dom rm
    let expense = this.itemList.filter(function (item) {
      return item.id === id;
    });

    //show vl 125
    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;

    //rm from li 126
    let tempList = this.itemList.filter(function (item) {
      return item.id !== id;
    });

    this.itemList = tempList;
    this.ShowBalanace();
  }

  //del expns

  deleteExpense(element) {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;

    //rm
    this.expenseList.removeChild(parent);

    //dom rm
    let expense = this.itemList.filter(function (item) {
      return item.id === id;
    });

    //rm from li 126
    let tempList = this.itemList.filter(function (item) {
      return item.id !== id;
    });

    this.itemList = tempList;
    this.ShowBalanace();
  }
}

//dom
function eventListeners() {
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");

  const ui = new UI();

  budgetForm.addEventListener("submit", function (event) {
    event.preventDefault();
    ui.submitBudgetForm();
  });

  expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();
    ui.submitExpenseform();
  });

  expenseList.addEventListener("click", function (event) {
    if (event.target.parentElement.classList.contains("edit-icon")) {
      ui.editExpense(event.target.parentElement);
    }

    if (event.target.parentElement.classList.contains("delete-icon")) {
      ui.deleteExpense(event.target.parentElement);
    }
    //event.preventDefault();
    //ui.submitBudgetForm();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  eventListeners();
});
