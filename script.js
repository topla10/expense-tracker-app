const description = document.querySelector('#description');
const amount = document.querySelector('#amount');
const category = document.querySelector('#category');
const form = document.querySelector('form');
const expenseList = document.querySelector('ul');
const total = document.querySelector('#total');
const filtering = document.querySelector('#filteringDiv');

const listItemArray = [];

form.addEventListener('submit', handleInput);

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
			arr.splice(index, 1);
			renderList(arr);
			totalCalc();
		});
		liElement.appendChild(spanElement);
		liElement.appendChild(deleteBtn);
		expenseList.appendChild(liElement);
	});
	// Hide or show the filtering section based on the length of the list
	// Hide it when the list is reduced to less than 2 items, show it othewise
	if (arr.length < 2 && filtering) {
		filtering.style.display = 'none';
	} else if (filtering) {
		filtering.style.display = 'block';
	}
}
const clearInput = function () {
	description.value = '';
	category.value = '';
	amount.value = '';
};

// This function adds and display the total amount of the list items
function totalCalc() {
	let totalPrice = 0;

	for (const i of listItemArray) {
		totalPrice += i.amount;
	}
	total.innerHTML = totalPrice.toFixed(2);
}

function filterExpense() {
	const userFilter = document.querySelector('#filterCategory');

	const newArray = listItemArray.filter((element) => {
		if (userFilter.value === element.category) return true;
		else if (parseFloat(userFilter.value) === element.amount) return true;
		else return false;
	});
	console.log(newArray);
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
}
