$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger,.header__menu,.header__link').toggleClass('active');
		$('body').toggleClass('lock');
	});
});
const tasks = [
	{
		_id: '5d2ca9e2e03d40b326596aa7',
		completed: true,
		body:
			'some text\r\n',
		title: 'spme name',
	},
];

(function (arrOfTasks) {
	objOfTasks = arrOfTasks.reduce((acc, task) => {
		acc[task._id] = task;
		return acc;
	}, {})


	// Elements UI
	const listContainer = document.querySelector('.otzivu',);//посик относительно родителя
	console.log(listContainer)
	const form = document.forms['addTask'];
	const inputTitle = form.elements['title'];
	const inputBody = form.elements['body'];


	//Events
	form.addEventListener('submit', onFormSubmitHandler)
	listContainer.addEventListener('click', onDeleteHandler)

	function onFormSubmitHandler(e) {
		e.preventDefault();
		const titleValue = inputTitle.value; //текущее значение, которое записано в этом импуте
		const bodyValue = inputBody.value;
		//console.log(titleValue)
		if (!titleValue || !bodyValue) {
			alert('хули ты нихуя не ввел, а?');
			return;
		}
		const task = createNewTask(titleValue, bodyValue);
		const listItem = listItemTemplate(task);
		listContainer.insertAdjacentElement('afterbegin', listItem);
		form.reset();
	}

	function createNewTask(title, body) {
		const newTask = {
			title,
			body,
			completed: false,
			_id: `task-${Math.random()}`,
		};
		objOfTasks[newTask._id] = newTask;
		return { ...newTask };
	}

	function listItemTemplate({ _id, title, body }) {
		const li = document.createElement('div');
		li.classList.add('content__bodyotzuv',
			'mt-3',
			'mb-3',
			'p-2',
		);
		li.setAttribute('data-task-id', _id); // добавление атрибута с названием _id

		const obertka = document.createElement('div');
		obertka.classList.add('obertka', 'd-flex');

		const div1 = document.createElement('div');
		div1.textContent = title;
		div1.classList.add('content__nameotzuvdone', 'mb-2');

		const deleteBtn = document.createElement('button');
		deleteBtn.textContent = 'Удалить';
		deleteBtn.classList.add('btn-danger', 'content__delete');

		const div2 = document.createElement('div');
		div2.textContent = body;
		div2.classList.add('content__textotzuvdone');


		obertka.appendChild(div1);
		obertka.appendChild(deleteBtn);
		li.appendChild(obertka);
		li.appendChild(div2);
		console.log(li)
		return li;
	}
	function deleteTask(id) {
		const { title } = objOfTasks[id];
		const isConfirm = confirm(`${title}, ты точно хочешь удалить отзыв, а?`);// если ок то будет тру, в противном случае фолс
		if (!isConfirm) return isConfirm;
		delete objOfTasks[id];
		return isConfirm;
	}

	function deleteTaskFromHTML(confirmed, el) {
		if (!confirmed) return;
		el.remove();
	}

	function onDeleteHandler({ target }) {
		if (target.classList.contains('content__delete')) {
			const parent = target.closest('[data-task-id]');
			console.log(parent)
			const id = parent.dataset.taskId;// из-за того, что таскайди написано через дефис, то оно будет записано в кэмэл кейсе 
			const confirmed = deleteTask(id);
			deleteTaskFromHTML(confirmed, parent);
		}
	}
}(tasks))

