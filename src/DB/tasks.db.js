let tasks = [];

function putTasksDb(newTasks) {
  tasks = newTasks;
}

function getTasksDb() {
  return tasks;
}

module.exports = { getTasksDb, putTasksDb };

// class TasksDb {
//   constructor() {
//     if (!TasksDb.inst) {
//       TasksDb.inst = this;
//       this.tasks = [];
//     }
//     return TasksDb.inst;
//   }

//   putDb(data) {
//     this.tasks = data;
//   }
// }

// const tasksDb = new TasksDb()

// module.exports = tasksDb;