// 初始變數
const list = document.querySelector("#my-todo");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-todo");
const done = document.querySelector("#my-done");

// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];

for (let todo of todos) {
  addItem(todo);
}

// 函式
function addItem(text) {
  let newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  list.appendChild(newItem);
}

// Create
addBtn.addEventListener("click", function () {
  let flag = false;
  const inputValue = input.value;
  if (inputValue.length > 0 && inputValue[inputValue.length - 1] !== " ") {
    flag = true;
  }
  if (flag === true) {
    addItem(inputValue);
  }
});

input.addEventListener("keyup", function (event) {
  let flag = false;
  const inputValue = input.value;
  if (inputValue.length > 0 && inputValue[inputValue.length - 1] !== " ") {
    flag = true;
  }
  if (event.key === "Enter" && flag === true) {
    addItem(inputValue);
  }
});

// Delete and check
done.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement;
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    const inputValue = target.innerHTML;
    addItem(inputValue);
    done.removeChild(target.parentElement);

    // target.classList.toggle("checked");
  }
});

list.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement;
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    let donetext = target.innerHTML;
    done.innerHTML += `
    <li >
    <label for="done" class="doneList" >${donetext}</label>
    <i class="delete fa fa-trash"></i>
    </li>
  `;
    list.removeChild(target.parentElement);
    console.log(donetext);
    // target.classList.toggle("checked");
  }
});
