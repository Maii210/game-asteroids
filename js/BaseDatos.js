export class BaseDatos {
  constructor() {
    this.db = new PouchDB("asteroides");
  }

  async guardarPartida(puntuacion, nivel) {
    const partida = {
      _id:        new Date().toISOString(),
      puntuacion: puntuacion,
      nivel:      nivel,
      fecha:      new Date().toLocaleDateString("es-ES")
    };

    try {
      await this.db.put(partida);
    } catch (error) {
      console.error("Error al guardar partida:", error);
    }
  }

  async obtenerMejoresPartidas() {
    try {
      const resultado = await this.db.allDocs({ include_docs: true });

      return resultado.rows
        .map(row => row.doc)
        .sort((a, b) => b.puntuacion - a.puntuacion)
        .slice(0, 10);

    } catch (error) {
      console.error("Error al leer partidas:", error);
      return [];
    }
  }

  async borrarHistorial() {
    try {
      const resultado = await this.db.allDocs({ include_docs: true });

      const eliminaciones = resultado.rows.map(row => ({
        _id:      row.doc._id,
        _rev:     row.doc._rev,
        _deleted: true
      }));

      await this.db.bulkDocs(eliminaciones);
    } catch (error) {
      console.error("Error al borrar historial:", error);
    }
  }
}
