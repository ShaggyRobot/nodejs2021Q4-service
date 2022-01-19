interface ITask {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | undefined;
  columnId: string;
}

let tasks: Array<ITask> = [];

function putTasksDb(newTasks: Array<ITask>): void {
  tasks = newTasks;
}

function getTasksDb(): ITask[] {
  return tasks;
}

export { putTasksDb, getTasksDb, ITask };
