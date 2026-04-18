export class Asteroide {
  constructor(anchoCanvas, altoCanvas, radio) {
    this.radio = radio || 30 + Math.random() * 30;

    const lado = Math.floor(Math.random() * 4);
    switch (lado) {
      case 0: this.x = Math.random() * anchoCanvas; this.y = -this.radio; break;
      case 1: this.x = anchoCanvas + this.radio;    this.y = Math.random() * altoCanvas; break;
      case 2: this.x = Math.random() * anchoCanvas; this.y = altoCanvas + this.radio; break;
      default: this.x = -this.radio;                this.y = Math.random() * altoCanvas; break;
    }

    this.velocidadX        = (Math.random() - 0.5) * 2;
    this.velocidadY        = (Math.random() - 0.5) * 2;
    this.rotacion          = 0;
    this.velocidadRotacion = (Math.random() - 0.5) * 0.04;
    this.vertices          = this._generarVertices();
  }

  _generarVertices() {
    const num = 8 + Math.floor(Math.random() * 5);
    const v   = [];
    for (let i = 0; i < num; i++) {
      v.push(this.radio * (0.6 + Math.random() * 0.8));
    }
    return v;
  }

  actualizar(ancho, alto) {
    this.x        += this.velocidadX;
    this.y        += this.velocidadY;
    this.rotacion += this.velocidadRotacion;

    if (this.x < -this.radio)        this.x = ancho + this.radio;
    if (this.x > ancho + this.radio) this.x = -this.radio;
    if (this.y < -this.radio)        this.y = alto  + this.radio;
    if (this.y > alto  + this.radio) this.y = -this.radio;
  }

  partir(anchoCanvas, altoCanvas) {
    if (this.radio <= 15) return [];
    return [0, 1].map(() => {
      const f         = new Asteroide(anchoCanvas, altoCanvas, this.radio * 0.5);
      f.x             = this.x;
      f.y             = this.y;
      f.velocidadX    = (Math.random() - 0.5) * 3;
      f.velocidadY    = (Math.random() - 0.5) * 3;
      f.velocidadRotacion = (Math.random() - 0.5) * 0.06;
      return f;
    });
  }
}
