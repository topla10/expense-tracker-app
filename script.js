const description = document.querySelector('#description');
const amount = document.querySelector('#amount');
const category = document.querySelector('#category');
const form = document.querySelector('form');
const expenseList = document.querySelector('ul');
const userFilter = document.querySelector('#filterCategory');
const total = document.querySelector('#total');
const filterBtn = document.querySelector('#filterBtn');

const listItemArray = [];

form.addEventListener('submit', handleInput);
filterBtn.addEventListener('click', filterExpense);

function handleInput(event) {
	event.preventDefault();

	handleListItem();
	clearInput();
}

function handleListItem() {
	const newItem = createItem();
	addExpense(newItem);
	renderList(listItemArray);
	totalCalc();
}

function createItem() {
	return {
		description: description.value,
		amount: parseFloat(amount.value),
		category: category.value,
	};
}

function addExpense(newItem) {
	listItemArray.push(newItem);
}

function renderList(arr) {
	expenseList.innerHTML = '';
	arr.forEach((element, index) => {
		const liElement = document.createElement('li');
		const spanElement = document.createElement('span');
		const deleteBtn = document.createElement('button');
		deleteBtn.className = 'delete';
		spanElement.textContent = `${element.description} (${element.category}): $${element.amount}`;
		deleteBtn.textContent = 'delete';
		deleteBtn.addEventListener('click', () => {
			arr.splice(index, 1);
			renderList(arr);
			totalCalc();
		});
		liElement.appendChild(spanElement);
		liElement.appendChild(deleteBtn);
		expenseList.appendChild(liElement);
	});
}
const clearInput = function () {
	description.value = '';
	category.value = '';
	amount.value = '';
};

function totalCalc() {
	let totalPrice = 0;

	for (const i of listItemArray) {
		totalPrice += i.amount;
	}
	total.innerHTML = totalPrice.toFixed(2);
}

function filterExpense() {
	const newArray = listItemArray.filter((element) => {
		if (userFilter.value === element.category) return true;
		else if (parseFloat(userFilter.value) === element.amount) return true;
		else return false;
	});
	console.log(newArray);
}
