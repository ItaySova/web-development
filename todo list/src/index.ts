import { v4 as uuidV4 } from 'uuid'

type Task = { 
    id: string
    title: string 
    completed: boolean 
    createdAt: Date
    body: string
 };

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
const input = document.querySelector<HTMLInputElement>('#new-task-title');
const body = document.querySelector<HTMLTextAreaElement>('#body');
const deleteComplete = document.querySelector<HTMLButtonElement>('#removeButton');
let tasks: Task[] = loadTasks();

tasks.forEach(task => {
    addListItem(task);
});

form?.addEventListener('submit', event => {
    event.preventDefault();

    if (input?.value == "" || input?.value == null) {
        return;
    }
    if (body?.value == null){
        return;
    }
    console.log(body?.value);
    const task: Task = {
        id: uuidV4(),
        title: input.value,
        completed: false,
        createdAt: new Date(),
        body: body.value
    };
    tasks.push(task);
    saveTasks()
    addListItem(task);
    input.value = "";
});

function addListItem(task: Task) {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const taskBody = document.createElement("details");
    taskBody.innerHTML =`
    <summary>${task.title}</summary>
    <p>${task.body}</p>
    `;
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        saveTasks();
        console.log(tasks);
    });
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    taskBody.append(checkbox, "completed");
    label.append(taskBody);
    item.append(label);
    list?.append(item);
}

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadTasks(): Task[]{
    const taskJson = localStorage.getItem("tasks");
    if (taskJson == null){
        return [];
    }
    return JSON.parse(taskJson);
}

deleteComplete?.addEventListener('click', () =>{
    tasks = tasks.filter(task => task.completed !== true);
    initTasks(tasks);
    saveTasks();
});

function initTasks(tasksList: Task[]){
    if (list?.innerHTML == "" || list?.innerHTML == null){
        return;
    }
    list.innerHTML = "";
    tasksList.forEach(task => {
        addListItem(task);
    });
}