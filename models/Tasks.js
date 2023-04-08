const Task = require('./Task');

class Tasks {
  _tasks = {};

  get tasksList() {
    const tasksList = [];
    Object.keys(this._tasks).forEach((key) => {
      const task = this._tasks[key];
      tasksList.push(task);
    });
    return tasksList;
  }

  constructor() {
    this._tasks = {};
  }

  loadTasks(tasks = []) {
    tasks.forEach((task) => {
      this._tasks[task.id] = task;
    });
  }

  createTask(desc) {
    const task = new Task(desc);
    this._tasks[task.id] = task;
  }

  listAllTasks() {
    console.log();
    if (this.tasksList.length === 0) {
      console.log('No pending tasks.'.red);
      return;
    }
    this.tasksList.forEach((task, i) => {
      const idx = `${i + 1}`.cyan;
      const { desc, completedAt } = task;
      const state = completedAt ? 'Completed'.cyan : 'Pending'.red;
      console.log(`${idx} ${desc} ${'::'.cyan} ${state}`);
    });
  }

  listCompletedTasks(completed = true) {
    console.log();
    this.tasksList.forEach((task, index) => {
      const { desc, completedAt } = task;
      if (completed && completedAt) {
        console.log(
          `${(index + 1 + '.').toString().cyan} ${desc} ${'::'.cyan} ${
            completedAt.green
          }`
        );
      } else if (!completedAt) {
        console.log(`${(index + 1 + '.').cyan} ${desc}`);
      }
    });
  }

  changeSelectedTasksState(ids = []) {
    ids.forEach((id) => {
      const task = this._tasks[id];
      if (!task.completedAt) {
        task.completedAt = new Date().toISOString();
      }
    });

    this.tasksList.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._tasks[task.id].completedAt = null;
      }
    });
  }

  deleteTask(id = '') {
    if (this._tasks[id]) delete this._tasks[id];
  }
}

module.exports = Tasks;
