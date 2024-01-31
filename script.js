const totalBudget = document.getElementById('total-amount');
const userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-erreur");
const productTitleError = document.getElementById("product-title-erreur");
const productCostError = document.getElementById("product-cost-erreur");
const amount = document.getElementById("amount");
const Expenses = document.getElementById("expenses-values");
const Balance = document.getElementById("balance");
const liste = document.getElementById("list");
let pamount = 0;
localStorage.setItem()
// partie budget
totalAmountButton.addEventListener("click", () => {
    pamount = totalBudget.value;
    // au cas ou le budget est negatif ou vide
    if (pamount === "" || pamount < 0) {
        errorMessage.classList.remove("erreur") 
    }else{
        errorMessage.classList.add("erreur");
        // faire un set du budget
        amount.innerHTML = pamount;
        // faire un set de la balance
        Balance.innerText = pamount - Expenses.innerText;
        // vider l'input 
        totalBudget.value ="";
    }
});

// function pour desactiver les boutons edit et delete
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};

// function pour modifier les elements de la liste
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let balanceEnCours = Balance.innerText;
    let ExpensesEnCours = Expenses.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }
    Balance.innerText = parseInt(balanceEnCours) + parseInt(parentAmount)
    Expenses.innerText = parseInt(ExpensesEnCours) - parseInt(parentAmount)
    parentDiv.remove();
};

// function pour creer la list
const listCreation = (expenseName,expenseValue) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content","flex-space");
    liste.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class ="product">${expenseName}</p><p class ="amount">${expenseValue}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid","fa-pen-to-square","edit");
    editButton.style.fontSize = "24px";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid","fa-trash-can","delete");
    deleteButton.style.fontSize = "24px";
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton, true);
    });

    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);
};

// fonction pour ajouter les depenses

checkAmountButton.addEventListener("click", () => {
    // check amount vides
    if (!userAmount.value || !productTitle.value) {
       productTitleError.classList.remove("erreur");
       return false; 
    }
    // buttons desactives
    disableButtons(false);
    // expenses
    let depense = parseInt(userAmount.value);
    // total expenses(existing + new)
    let somme = parseInt(Expenses.innerText) + depense;
    Expenses.innerText = somme;
    // total balance (budget - total expenses)
    const totalBalance = pamount - somme;
    Balance.innerText = totalBalance;
    // create list
    listCreation(productTitle.value, userAmount.value);
    // empty inputs
    productTitle.value = "";
    userAmount.value = "";
});