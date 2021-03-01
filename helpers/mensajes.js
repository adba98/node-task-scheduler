const { read } = require('fs');
const { resolve } = require('path');

require('colors');

const mostrarMenu = () => {
  return new Promise(res => {
    console.log('======================='.cyan);
    console.log(' Seleccione una opcion '.black.bgcyan);
    console.log('======================='.cyan);

    console.log(`${'1.'.cyan} Crear Tarea`);
    console.log(`${'2.'.cyan} Listar Tareas`);
    console.log(`${'3.'.cyan} Listar Tareas Completadas`);
    console.log(`${'4.'.cyan} Listar Tareas Pendientes`);
    console.log(`${'5.'.cyan} Completar tarea(s)`);
    console.log(`${'6.'.cyan} Borrar Tarea`);
    console.log(`${'7.'.cyan} Salir`);

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })

    readline.question('Seleccione una opcion: ', (opt) => {
      readline.close();
      res(opt);
    });
  });
}

const pausa = () => {
  return new Promise(res => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })

    readline.question(`Presione : ${'ENTER'.random} para continuar`, (opt) => {
      readline.close();
      res();
    });
  });
}

module.exports = {
  mostrarMenu,
  pausa
}