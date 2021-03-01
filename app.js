require('colors');
const { guardarDB, leerDB } = require('./db/guardarArchivo');
const {
  inquireMenu,
  pausa,
  leerInput,
  listarTareasBorrar,
  mostrarListadoCheckList,
  confirmar
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {
  let opt = '';
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareaFromArray(tareasDB);
  }
  do {
    console.clear();
    opt = await inquireMenu();
    switch (opt) {
      case 1:
        const desc = await leerInput('Descripcion: ');
        console.log(desc);
        tareas.crearTarea(desc);
        break;
      case 2:
        tareas.listadoCompleto();
        break;
      case 3:
        tareas.listarCompletadasPendientes(true);
        break;
      case 4:
        tareas.listarCompletadasPendientes(false);
        break;
      case 5:
        const ids = await mostrarListadoCheckList(tareas.listaddoArr);
        tareas.toggleCompletadas(ids);
        break;
      case 6:
        const id = await listarTareasBorrar(tareas.listaddoArr);
        if (id !== '0') {
          const confBorrar = await confirmar('¿Esta seguro?');
          if (confBorrar) {
            tareas.borrarTarea(id);
            console.log(`Tarea con id: ${id} borrada`);
          }
        }
        break;
    }

    guardarDB(tareas.listaddoArr);

    await pausa();
  } while (opt !== 0);
}

main();