const Tarea = require("./tarea");

class Tareas {

  _listado = {};

  get listaddoArr() {
    const listTarea = [];
    Object.keys(this._listado).forEach(key => {
      const tarea = this._listado[key];
      listTarea.push(tarea);
    });
    return listTarea;
  }

  constructor(desc) {
    this._listado = {};
  }

  crearTarea(desc) {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  cargarTareaFromArray(tareas = []) {
    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea;
    })
  }

  listadoCompleto() {
    console.log();
    this.listaddoArr.forEach((tarea, i) => {
      const idx = `${i + 1}`.cyan;
      const { desc, completadoEn } = tarea;
      const estado = (completadoEn)
        ? 'Completado'.cyan
        : 'Pendiente'.red;
      console.log(`${idx} ${desc} ${'::'.cyan} ${estado}`);
    })
  }

  listarCompletadasPendientes(completadas = true) {
    console.log();
    let cont = 0;
    this.listaddoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      if (completadas) {
        if (completadoEn) {
          cont += 1;
          console.log(`${(cont + '.').toString().cyan} ${desc} ${'::'.cyan} ${completadoEn.green}`);
        }
      } else if (!completadoEn) {
        cont += 1;
        console.log(`${(cont + '.').cyan} ${desc}`);
      }
    })
  }

  borrarTarea(id = '') {
    if (this._listado[id])
      delete this._listado[id];
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listaddoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }

}

module.exports = Tareas;