const VELOCIDAD_ROTACION = 0.07;

export class Nave {
  constructor(x, y) {
    this.x      = x;
    this.y      = y;
    this.angulo = -Math.PI / 2;
  }

  girarIzquierda() {
    this.angulo -= VELOCIDAD_ROTACION;
  }

  girarDerecha() {
    this.angulo += VELOCIDAD_ROTACION;
  }

  getPunta() {
    return {
      x: this.x + Math.cos(this.angulo) * 20,
      y: this.y + Math.sin(this.angulo) * 20
    };
  }
}
