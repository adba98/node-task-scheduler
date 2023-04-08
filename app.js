require('colors');
const { saveToDB, readFromDB } = require('./db/dbHandler');
const {
  promptUserOption,
  waitForEnter,
  readInput,
  listTasksToDelete,
  showChecklist,
  confirmDelete,
} = require('./helpers/inquirer');
const Tasks = require('./models/Tasks');

const main = () => {
  const tasks = new Tasks();
  const tasksFromDB = readFromDB();

  if (tasksFromDB) {
    tasks.loadTasks(tasksFromDB);
  }

  start(tasks);
};

const start = async (tasks) => {
  let option = 0;

  do {
    console.clear();
    option = await promptUserOption();
    switch (option) {
      case 1:
        const task = await readInput();
        console.log(task);
        tasks.createTask(task);
        break;
      case 2:
        tasks.listAllTasks();
        break;
      case 3:
        tasks.listCompletedTasks();
        break;
      case 4:
        tasks.listCompletedTasks(false);
        break;
      case 5:
        const ids = await showChecklist(tasks.tasksList);
        tasks.changeSelectedTasksState(ids);
        break;
      case 6:
        const id = await listTasksToDelete(tasks.tasksList);
        if (id !== '0') {
          const deleteConfirmation = await confirmDelete();
          if (deleteConfirmation) {
            tasks.deleteTask(id);
            console.log(`Task with id: ${id} deleted.`);
          }
        }
        break;
    }

    saveToDB(tasks.tasksList);

    await waitForEnter();
  } while (option !== 0);
};

main();
