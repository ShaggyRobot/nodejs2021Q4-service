let tasks = [];

function putTasksDb(newTasks) {
  tasks = newTasks;
}

function getTasksDb() {
  return tasks;
}

module.exports = { getTasksDb, putTasksDb };
