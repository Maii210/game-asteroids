import { Modelo    } from './Modelo.js';
import { Vista     } from './Vista.js';
import { Sonido    } from './Sonido.js';
import { BaseDatos } from './BaseDatos.js';

class Controlador {
  constructor() {
    this.vista     = new Vista("lienzo");
    this.sonido    = new Sonido();
    this.bd        = new BaseDatos();

    this.teclasPulsadas = {};
    this.modelo         = null;

    this.vista.redimensionar();
    this._nuevoJuego();

    this.listaPuntuaciones = document.getElementById("lista-puntuaciones");
    this.btnBorrar         = document.getElementById("btn-borrar");

    this._registrarEventos();
    this._actualizarPanelPuntuaciones();
    this._bucle();
  }

  _nuevoJuego() {
    this.modelo          = new Modelo(this.vista.ancho, this.vista.alto);
    this._juegoTerminado = false;
  }

  _bucle() {
    this.modelo.actualizar(this.teclasPulsadas);
    this.vista.renderizar(this.modelo);

    if (!this.modelo.juegoActivo && !this._juegoTerminado) {
      this._juegoTerminado = true;
      this._guardarYActualizar();
    }

    requestAnimationFrame(() => this._bucle());
  }

  async _guardarYActualizar() {
    await this.bd.guardarPartida(this.modelo.puntuacion, this.modelo.nivel);
    await this._actualizarPanelPuntuaciones();
  }

  async _actualizarPanelPuntuaciones() {
    const partidas = await this.bd.obtenerMejoresPartidas();
    this.listaPuntuaciones.innerHTML = "";

    if (partidas.length === 0) {
      this.listaPuntuaciones.innerHTML = '<li class="vacio">Sin partidas aún</li>';
      return;
    }

    partidas.forEach((p, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span><span class="pos">#${i + 1}</span>${p.fecha}</span>
        <span class="pts">${p.puntuacion}</span>
      `;
      this.listaPuntuaciones.appendChild(li);
    });
  }

  _registrarEventos() {
    window.addEventListener("keydown", (e) => this._onKeyDown(e));
    window.addEventListener("keyup",   (e) => this._onKeyUp(e));
    window.addEventListener("resize",  ()  => this._onResize());

    this.btnBorrar.addEventListener("click", async () => {
      await this.bd.borrarHistorial();
      await this._actualizarPanelPuntuaciones();
    });
  }

  _onKeyDown(evento) {
    this.teclasPulsadas[evento.key] = true;

    if (evento.key === " " || evento.key === "Spacebar") {
      evento.preventDefault();

      if (!this.modelo.juegoActivo) {
        this._nuevoJuego();
        return;
      }

      this.modelo.disparar();
      this.sonido.disparo();
    }
  }

  _onKeyUp(evento) {
    this.teclasPulsadas[evento.key] = false;
  }

  _onResize() {
    this.vista.redimensionar();
    this.modelo.redimensionar(this.vista.ancho, this.vista.alto);
  }
}

new Controlador();
