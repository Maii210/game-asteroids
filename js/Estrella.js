export class Estrella {
  constructor(ancho, alto) {
    this.x      = Math.random() * ancho;
    this.y      = Math.random() * alto;
    this.tamano = Math.random() * 1.5 + 0.5;
    this.brillo = Math.random() * Math.PI * 2;
  }

  getOpacidad() {
    return 0.3 + Math.sin(Date.now() * 0.001 + this.brillo) * 0.4;
  }
}
