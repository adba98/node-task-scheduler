const inquirer = require('inquirer');
require('colors');

const choices = [
  { value: 1, name: 'Create task' },
  { value: 2, name: 'List tasks' },
  { value: 3, name: 'List completed tasks' },
  { value: 4, name: 'List pending tasks' },
  { value: 5, name: 'Complete task(s)' },
  { value: 6, name: 'Delete task' },
  { value: 0, name: 'Exit' },
].map((choice) => ({
  ...choice,
  name: `${`${choice.value.toString()}.`.cyan} ${choice.name}`,
}));

const questions = {
  type: 'list',
  name: 'choice',
  message: 'What would you like to do?',
  choices,
};

const promptUserOption = async () => {
  console.log('==================='.cyan);
  console.log(' Select an option '.black.bgCyan);
  console.log('==================='.cyan);

  const { choice } = await inquirer.prompt(questions);
  return choice;
};

const waitForEnter = async () => {
  console.log();
  const question = {
    type: 'input',
    name: 'enter',
    message: `Press ${'ENTER'.cyan} to continue`,
  };
  await inquirer.prompt(question);
};

const readInput = async () => {
  const question = {
    type: 'input',
    name: 'task',
    message: 'Description: ',
    validate(inputValue) {
      if (!inputValue.trimStart()) {
        return 'Value cannot be blank';
      }
      return true;
    },
  };

  const { task } = await inquirer.prompt(question);
  return task;
};

const listTasksToDelete = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}`.cyan;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
    };
  });
  choices.unshift({
    value: '0',
    name: `${'0.'.cyan} Cancel`,
  });
  const questions = {
    type: 'list',
    name: 'id',
    message: 'Which task do you want to delete?',
    choices,
  };
  const { id } = await inquirer.prompt(questions);
  return id;
};

const showChecklist = async (tasks = []) => {
  const choices = tasks.map(({ id, desc, completedAt }, i) => ({
    value: id,
    name: `${`${i + 1}`.cyan} ${desc}`,
    checked: !!completedAt,
  }));

  const questions = {
    type: 'checkbox',
    name: 'ids',
    message: 'Select task(s)',
    choices,
  };

  const { ids } = await inquirer.prompt(questions);
  return ids;
};

const confirmDelete = async () => {
  const question = {
    type: 'confirm',
    name: 'confirmed',
    message: 'Are you sure?'.red,
  };
  const { confirmed } = await inquirer.prompt(question);
  return confirmed;
};

module.exports = {
  promptUserOption,
  waitForEnter,
  readInput,
  listTasksToDelete,
  showChecklist,
  confirmDelete,
};
