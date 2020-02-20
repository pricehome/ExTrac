//  #1 Get DOM Elements
const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

// #2 Dummy Transactions for dev stage
const dummyTransactions = [
	{id: 1, text: 'Flower', amount: -20},
	{id: 2, text: 'Salary', amount: 300},
	{id: 3, text: 'Book', amount: -10},
	{id: 4, text: 'Camera', amount: 150}
]

// #3 Global state for transactions init will use dummy transactions
let transactions = dummyTransactions

//#4 Add transactions to DOM list
function addTransactionDOM(transaction) {
	// Get sign
	const sign = transaction.amount < 0 ? '-' : '+'

	const item = document.createElement('li')

	//  #5 Add class based on value
	item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

	item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(
		transaction.amount
	)}</span> <button class="delete-btn" onclick="removeTransaction(${
		transaction.id
	})">x</button>`

	list.appendChild(item)
}

// #7 Update the balance, income, expense
function updateValues() {
	const amounts = transactions.map(transaction => transaction.amount)

	// console.log(amounts)

	const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

	// console.log(total)

	const income = amounts
		.filter(item => item > 0)
		.reduce((acc, item) => (acc += item), 0)
		.toFixed(2)

	// console.log(income)

	const expense = (
		amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
		-1
	).toFixed(2)

	// console.log(expense)

	balance.innerText = `$${total}`
	money_plus.innerText = `$${income}`
	money_minus.innerText = `$${expense}`
}

//  #6 Init App
function init() {
	list.innerHTML = ''

	transactions.forEach(addTransactionDOM)
	updateValues()
}

init()
