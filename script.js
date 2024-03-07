const item = document.querySelector("#items");
const toDoList = document.querySelector("#list");
const completedList = document.querySelector("#comp-list");
const toDoCounter = document.querySelector("#all-tasks-counter");
const compTasksCounter = document.querySelector("#comp-tasks-counter");

item.addEventListener(
    "keyup",
    function (event) {
        if (event.key == "Enter") {
            if(this.value.trim() === ""){
                return;
            }
            else{
                addToDo(this.value);
                this.value = " "; // clear the input box after pressing enter
            }
        }
    }
);

const addToDo = (itemText) => {
    const listItem = document.createElement("li");
    listItem.classList.add("todo-item");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");

    // Create label for the checkbox
    const label = document.createElement("label");
    label.textContent = itemText;
    label.classList.add("todo-label");

    // Create delete button
    let deleteBtn = document.createElement('delete-button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add("delete-button");

    // Append the checkbox ,label and delete button to the list item
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', function() {
        listItem.remove(); // Remove the list item when the button is clicked
        updateCounter()
    });

    listItem.addEventListener('change', function(event) {
        if (event.target && event.target.matches('.todo-checkbox')) {
            if (event.target.checked) {
                // Move the list item to the completed list
                completedList.appendChild(listItem);
            } else {
                // Move the list item back to the to-do list
                toDoList.appendChild(listItem);
            }
            updateCounter()
        }
    });

    toDoList.appendChild(listItem);
    updateCounter()
};

function updateCounter(){
    const todoItemCount = toDoList.querySelectorAll('.todo-item').length;
    const completedItemCount = completedList.querySelectorAll('.todo-item').length;
    toDoCounter.textContent = todoItemCount;
    compTasksCounter.textContent = completedItemCount;
}
