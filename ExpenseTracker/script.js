const balance = document.getElementById('balance-value');
const incomeValue = document.getElementById('income-value');
const expenseValue = document.getElementById('expense-value');
const transactionList = document.getElementById('transaction-list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Event Listeners
form.addEventListener('submit', addTransaction);

// Add Transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please enter both text and amount.');
        return;
    }

    const transaction = {
        id: generateID(),
        text: text.value,
        amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionToDOM(transaction);
    updateBalance();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// Add Transaction to DOM
function addTransactionToDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
        ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    transactionList.appendChild(item);
}

// Update Balance, Income, and Expense
function updateBalance() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1
    ).toFixed(2);

    balance.innerText = total;
    incomeValue.innerText = income;
    expenseValue.innerText = expense;
}

// Remove Transaction
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}

// Update Local Storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Initialize the App
function init() {
    transactionList.innerHTML = '';

    transactions.forEach(addTransactionToDOM);
    updateBalance();
}

init();
