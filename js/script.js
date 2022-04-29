"use strict";

// Default tasks that are shown as an example
const tasksArray = [
  "Complete online JavaScript course",
  "Jog around the park 3x",
  "10 minutes meditation",
  "Read for 1 hour",
  "Pick up groceries",
  "Complete Todo App",
  "Cook dinner",
];

// State to check if "Active" button is clicked
let isActive = false;

const inputField = document.querySelector("input");

// Inserts HTML to a task div
function insertHTML(value, mode) {
  return `<div class="task-container"><div class="task"><span class="circle-icon ${mode}"> <img class="check-icon" src="images/icon-check.svg" alt="check-icon"/></span><span class="task-text">${value}</span><button class="delete-icon"><img src="images/icon-cross.svg" alt="delete" /></button></div><hr class="${mode}"/></div>`;
}

// Counts the number of non-completed tasks
const countTasks = function () {
  let count = $(".task-container").not(".done").length;
  $("#items-counter").text(count);
};

// Sets the default tasks
const init = function () {
  for (const task of tasksArray) {
    const newTask = $(document.body).hasClass("light")
      ? insertHTML(task, "light")
      : insertHTML(task, "dark");

    $(".tasks").append(newTask);
  }
  countTasks();
};

// Adds a new task to the list when Enter is clicked
function readInput(e) {
  if (e.key == "Enter" && inputField.value) {
    const newTask = $(document.body).hasClass("light")
      ? insertHTML(inputField.value, "light")
      : insertHTML(inputField.value, "dark");
    inputField.value = "";
    $(".tasks").prepend(newTask);
    countTasks();
  }
}

init();

document.addEventListener("keydown", readInput);

// Deletes a task when a delete button is clicked
$(document).on("click", ".delete-icon", function () {
  $(this).parent().next().remove();
  $(this).parent().parent().remove();
  countTasks();
});

// Switches between the light and dark modes
$(".switch-mode-icon").click(function () {
  $(".switch-mode-icon").toggleClass("visible");
  $(".background-image").toggleClass("visible");
  $(
    "body, .input-container, .tasks-container, input, hr, .circle-icon"
  ).toggleClass("light");
  $(
    "body, .input-container, .tasks-container, input, hr, .circle-icon"
  ).toggleClass("dark");
});

// Manages the state of a button when it's clicked to change its color
$(document).on("click", ".control-btn", function () {
  $(".control-btn").removeClass("active");
  $(this).addClass("active");
});

// Marks a task as done when a circle icon is clicked
$(document).on("click", ".circle-icon", function () {
  $(this).toggleClass("clicked");
  $(this).parent().parent().toggleClass("done");
  if (isActive) {
    $(this).parent().parent().toggleClass("hidden");
  }
  countTasks();
});

// Shows only active tasks when "Active" button is clicked
$(".active-btn").click(function () {
  $(".done").addClass("hidden");
  $(".task-container").not(".done").removeClass("hidden");
  isActive = true;
});

// Shows only completed tasks when "Completed" button is clicked
$(".completed-btn").click(function () {
  $(".task-container").not(".done").addClass("hidden");
  $(".done").removeClass("hidden");
  isActive = false;
});

// Shows all tasks when "All" button is clicked
$(".all-btn").click(function () {
  $(".task-container").not(".done").removeClass("hidden");
  $(".done").removeClass("hidden");
  isActive = "false";
});

// Deletes all completed tasks when "Clear completed" button is clicked
$(".clear-btn").click(function () {
  $(".done").remove();
  $(".active").removeClass("active");
  $(".all-btn").addClass("active");
  $(".task-container").not(".done").removeClass("hidden");
  isActive = false;
  countTasks();
});
