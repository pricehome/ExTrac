//  #1 Get DOM Elements
const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

// #2 Dummy Transactions for dev stage
// const dummyTransactions = [
// 	{id: 1, text: 'Flower', amount: -20},
// 	{id: 2, text: 'Salary', amount: 300},
// 	{id: 3, text: 'Book', amount: -10},
// 	{id: 4, text: 'Camera', amount: 150}
// ]

// #14 Local Storage
const localStorageTransactions = JSON.parse(
	localStorage.getItem('transactions')
)

let transactions =
	localStorage.getItem('transactions') !== null ? localStorageTransactions : []

//  #9 Function for Add Transaction (#8)
function addTransaction(e) {
	e.preventDefault()

	if (text.value.trim() === '' || amount.value.trim() === '') {
		alert('Please add a text and amount')
	} else {
		const transaction = {
			id: generateID(),
			text: text.value,
			amount: +amount.value
		}

		// console.log(transaction)
		transactions.push(transaction)
		addTransactionDOM(transaction)
		updateValues()

		// #16 Local Storage
		updateLocalStorage()

		text.value = ''
		amount.value = ''
	}
}

//  #10 Function to generateID()
function generateID() {
	return Math.floor(Math.random() * 100000000)
}

// #3 Global state for transactions init will use dummy transactions
// let transactions = dummyTransactions

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

// #13 Remove transaction by ID
function removeTransaction(id) {
	transactions = transactions.filter(transaction => transaction.id !== id)

	// #17 Remove transaction Local Storage
	updateLocalStorage()

	init()
}

// #15 Local Storage: Update local storage transactions
function updateLocalStorage() {
	localStorage.setItem('transactions', JSON.stringify(transactions))
}

//  #6 Init App
function init() {
	list.innerHTML = ''

	transactions.forEach(addTransactionDOM)
	updateValues()
}

init()

// #8 Event Listener Submit
form.addEventListener('submit', addTransaction)
