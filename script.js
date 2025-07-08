const description = document.querySelector('#description');
const amount = document.querySelector('#amount');
const category = document.querySelector('#category');
const form = document.querySelector('form');
const expenseList = document.querySelector('ul');
const total = document.querySelector('#total');
const filtering = document.querySelector('#filteringDiv');
const message = document.querySelector('#message');

const listItemArray = [];

form.addEventListener('submit', handleInput);
//message.style.display = 'none';

function handleInput(event) {
	event.preventDefault();

	handleListItem();
	clearInput();
}

function handleListItem() {
	const newItem = createItem();

	addExpense(newItem);
	renderList(listItemArray);

	if (listItemArray.length === 2) {
		filterSection();
	}
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
			const realIndex = listItemArray.findIndex((el) => el === element);
			listItemArray.splice(realIndex, 1);
			arr.splice(index, 1);
			renderList(arr);
			totalCalc(arr);
		});

		liElement.appendChild(spanElement);
		liElement.appendChild(deleteBtn);
		expenseList.appendChild(liElement);
	});

	totalCalc(arr);
}
const clearInput = function () {
	description.value = '';
	category.value = '';
	amount.value = '';
};

// This function adds and display the total amount of the list items
function totalCalc(whateverArr) {
	let totalPrice = 0;

	for (const i of whateverArr) {
		totalPrice += i.amount;
	}
	total.innerHTML = totalPrice.toFixed(2);
}

function filterExpense() {
	let userFilter = document
		.querySelector('#filterCategory')
		.value.trim()
		.toLowerCase();

	const filteredArr = listItemArray.filter((element) => {
		if (userFilter === element.category.toLowerCase()) return true;
		else if (parseFloat(userFilter) === element.amount) return true;
		else return false;
	});
	//console.log(filteredArr);
	if (userFilter === '') {
		renderList(listItemArray);
	} else if (filteredArr.length === 0) {
		message.style.display = 'inline';
		message.innerHTML = 'Nothing to filter';
	} else renderList(filteredArr);
}

function filterSection() {
	if (document.querySelector('#filterCategory')) return;
	const inputEl = document.createElement('input');
	const userFilterBtn = document.createElement('button');
	userFilterBtn.id = 'filterBtn';
	userFilterBtn.textContent = 'Filter';

	inputEl.type = 'text';
	inputEl.id = 'filterCategory';
	inputEl.placeholder = 'filter by category or amount';

	filtering.appendChild(inputEl);
	filtering.appendChild(userFilterBtn);

	userFilterBtn.addEventListener('click', filterExpense);
	reset();
}

function reset() {
	const resetBtn = document.createElement('button');
	resetBtn.textContent = 'Reset';
	filtering.appendChild(resetBtn);
	resetBtn.addEventListener('click', () => {
		message.style.display = 'none';
		renderList(listItemArray);
	});
}
