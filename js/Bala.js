const VELOCIDAD_BALA = 7;
const VIDA_BALA      = 60;

const COLORES = [
  "hsl(170, 80%, 70%)",
  "hsl(45,  90%, 65%)",
  "hsl(200, 90%, 70%)",
  "hsl(300, 80%, 75%)"
];
let contadorColor = 0;

export class Bala {
  constructor(x, y, angulo) {
    this.x          = x;
    this.y          = y;
    this.velocidadX = Math.cos(angulo) * VELOCIDAD_BALA;
    this.velocidadY = Math.sin(angulo) * VELOCIDAD_BALA;
    this.vida       = VIDA_BALA;
    this.color      = COLORES[contadorColor % COLORES.length];
    contadorColor++;
  }

  actualizar(ancho, alto) {
    this.x += this.velocidadX;
    this.y += this.velocidadY;
    this.vida--;

    if (this.x < 0)     this.x = ancho;
    if (this.x > ancho) this.x = 0;
    if (this.y < 0)     this.y = alto;
    if (this.y > alto)  this.y = 0;

    return this.vida > 0;
  }
}
