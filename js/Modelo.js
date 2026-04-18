// ============================================================
//  MODELO — Modelo.js
//  Toda la lógica y datos del juego. Sin tocar el canvas.
// ============================================================

import { Nave      } from './Nave.js';
import { Bala      } from './Bala.js';
import { Estrella  } from './Estrella.js';
import { Asteroide } from './Asteroide.js';

const ASTEROIDES_INICIALES = 5;

export class Modelo {
  constructor(ancho, alto) {
    this.ancho = ancho;
    this.alto  = alto;

    this.puntuacion  = 0;
    this.vidas       = 3;
    this.nivel       = 1;
    this.juegoActivo = true;

    // La nave se crea al centro y NO se mueve
    this.nave       = new Nave(ancho / 2, alto / 2);
    this.balas      = [];
    this.asteroides = [];
    this.estrellas  = [];

    this._inicializarEstrellas();
    this._generarAsteroides(ASTEROIDES_INICIALES);
  }

  _inicializarEstrellas() {
    this.estrellas = [];
    for (let i = 0; i < 120; i++) {
      this.estrellas.push(new Estrella(this.ancho, this.alto));
    }
  }

  _generarAsteroides(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      this.asteroides.push(new Asteroide(this.ancho, this.alto));
    }
  }

  disparar() {
    if (!this.juegoActivo) return;
    const punta = this.nave.getPunta();
    this.balas.push(new Bala(punta.x, punta.y, this.nave.angulo));
  }

  actualizar(teclasPulsadas) {
    if (!this.juegoActivo) return;

    // Rotación de la nave (no avanza)
    if (teclasPulsadas["ArrowLeft"]  || teclasPulsadas["a"]) this.nave.girarIzquierda();
    if (teclasPulsadas["ArrowRight"] || teclasPulsadas["d"]) this.nave.girarDerecha();

    // Balas
    this.balas = this.balas.filter(b => b.actualizar(this.ancho, this.alto));

    // Asteroides
    this.asteroides.forEach(a => a.actualizar(this.ancho, this.alto));

    // Colisiones
    this._colisionBalaAsteroide();
    this._colisionNaveAsteroide();

    // Subir de nivel si se eliminaron todos
    if (this.asteroides.length === 0) {
      this.nivel++;
      this._generarAsteroides(ASTEROIDES_INICIALES + this.nivel * 2);
    }
  }

  _distancia(x1, y1, x2, y2) {
    const dx = x2 - x1, dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  _colisionBalaAsteroide() {
    const restantes = [];

    for (const ast of this.asteroides) {
      let destruido = false;

      for (let j = this.balas.length - 1; j >= 0; j--) {
        if (this._distancia(ast.x, ast.y, this.balas[j].x, this.balas[j].y) < ast.radio + 3) {
          this.balas.splice(j, 1);
          this.puntuacion += Math.round(100 / ast.radio * 10);
          const fragmentos = ast.partir(this.ancho, this.alto);
          restantes.push(...fragmentos);
          destruido = true;
          break;
        }
      }

      if (!destruido) restantes.push(ast);
    }

    this.asteroides = restantes;
  }

  _colisionNaveAsteroide() {
    for (const ast of this.asteroides) {
      if (this._distancia(this.nave.x, this.nave.y, ast.x, ast.y) < ast.radio + 10) {
        this.vidas--;
        // La nave vuelve al centro (aunque ya estaba fija, se resetea por si acaso)
        this.nave.x = this.ancho / 2;
        this.nave.y = this.alto  / 2;
        if (this.vidas <= 0) this.juegoActivo = false;
        break;
      }
    }
  }

  redimensionar(ancho, alto) {
    this.ancho  = ancho;
    this.alto   = alto;
    this.nave.x = ancho / 2;
    this.nave.y = alto  / 2;
    this._inicializarEstrellas();
  }
}
