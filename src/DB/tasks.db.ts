let tasks = [];

function putTasksDb(newTasks) {
  tasks = newTasks;
}

function getTasksDb() {
  return tasks;
}

export {putTasksDb, getTasksDb}

