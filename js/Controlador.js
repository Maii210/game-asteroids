import { Modelo } from './Modelo.js';
import { Vista  } from './Vista.js';
import { Sonido } from './Sonido.js';

class Controlador {
  constructor() {
    this.vista          = new Vista("lienzo");
    this.sonido         = new Sonido();
    this.teclasPulsadas = {};
    this.modelo         = null;

    this.vista.redimensionar();
    this._crearNuevoJuego();

    this._registrarEventos();

    this._bucle();
  }

  _crearNuevoJuego() {
    this.modelo = new Modelo(this.vista.ancho, this.vista.alto);
  }

  _bucle() {
    this.modelo.actualizar(this.teclasPulsadas);

    this.vista.renderizar(this.modelo);

    requestAnimationFrame(() => this._bucle());
  }

  _registrarEventos() {
    window.addEventListener("keydown", (e) => this._onKeyDown(e));
    window.addEventListener("keyup",   (e) => this._onKeyUp(e));
    window.addEventListener("resize",  ()  => this._onResize());
  }

  _onKeyDown(evento) {
    this.teclasPulsadas[evento.key] = true;

    if (evento.key === " " || evento.key === "Spacebar") {
      evento.preventDefault();

      if (!this.modelo.juegoActivo) {
        this._crearNuevoJuego();
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
