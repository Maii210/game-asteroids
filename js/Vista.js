export class Vista {
  constructor(idCanvas) {
    this.lienzo   = document.getElementById(idCanvas);
    this.ctx      = this.lienzo.getContext("2d");
  }

  get ancho() { return this.lienzo.width;  }
  get alto()  { return this.lienzo.height; }

  redimensionar() {
    this.lienzo.width  = window.innerWidth;
    this.lienzo.height = window.innerHeight;
  }

  dibujarFondo(estrellas) {
    const ctx = this.ctx;
    ctx.fillStyle = "hsl(230, 25%, 3%)";
    ctx.fillRect(0, 0, this.ancho, this.alto);

    for (const e of estrellas) {
      ctx.fillStyle = `hsla(45, 90%, 85%, ${e.getOpacidad()})`;
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.tamano, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  dibujarNave(nave) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(nave.x, nave.y);
    ctx.rotate(nave.angulo);

    ctx.shadowColor = "hsl(170, 80%, 60%)";
    ctx.shadowBlur  = 12;
    ctx.strokeStyle = "hsl(170, 80%, 60%)";
    ctx.lineWidth   = 2;

    ctx.beginPath();
    ctx.moveTo(18, 0);
    ctx.lineTo(-12, -10);
    ctx.lineTo(-8, 0);
    ctx.lineTo(-12, 10);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = "hsla(170, 80%, 45%, 0.15)";
    ctx.fill();

    ctx.restore();
  }

  dibujarBala(bala) {
    const ctx = this.ctx;
    ctx.shadowColor = bala.color;
    ctx.shadowBlur  = 10;
    ctx.fillStyle   = bala.color;
    ctx.beginPath();
    ctx.arc(bala.x, bala.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  dibujarAsteroide(ast) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(ast.x, ast.y);
    ctx.rotate(ast.rotacion);

    ctx.strokeStyle = "hsl(30, 20%, 50%)";
    ctx.lineWidth   = 1.5;
    ctx.shadowColor = "hsl(30, 20%, 40%)";
    ctx.shadowBlur  = 4;

    ctx.beginPath();
    const n = ast.vertices.length;
    for (let i = 0; i < n; i++) {
      const ang = (i / n) * Math.PI * 2;
      const px  = Math.cos(ang) * ast.vertices[i];
      const py  = Math.sin(ang) * ast.vertices[i];
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "hsla(30, 15%, 25%, 0.3)";
    ctx.fill();

    ctx.restore();
  }

  dibujarHUD(puntuacion, nivel, vidas) {
    const ctx = this.ctx;
    ctx.shadowBlur = 0;
    ctx.font       = "bold 20px 'Orbitron', sans-serif";
    ctx.fillStyle  = "hsl(170, 80%, 60%)";

    ctx.textAlign = "left";
    ctx.fillText("PUNTOS: " + puntuacion, 20, 35);

    ctx.textAlign = "right";
    ctx.fillText("NIVEL: " + nivel, this.ancho - 250, 35);

    ctx.textAlign = "center";
    ctx.fillText("♦ ".repeat(vidas).trim(), this.ancho / 2, 35);
  }

  dibujarPantallaFin(puntuacion) {
    const ctx = this.ctx;
    const cx  = this.ancho / 2;
    const cy  = this.alto  / 2;

    ctx.fillStyle = "hsla(230, 25%, 3%, 0.75)";
    ctx.fillRect(0, 0, this.ancho, this.alto);

    ctx.shadowColor = "hsl(0, 75%, 55%)";
    ctx.shadowBlur  = 20;
    ctx.font        = "bold 48px 'Orbitron', sans-serif";
    ctx.fillStyle   = "hsl(0, 75%, 55%)";
    ctx.textAlign   = "center";
    ctx.fillText("FIN DEL JUEGO", cx, cy - 30);

    ctx.shadowColor = "hsl(170, 80%, 60%)";
    ctx.shadowBlur  = 10;
    ctx.font        = "24px 'Orbitron', sans-serif";
    ctx.fillStyle   = "hsl(170, 80%, 60%)";
    ctx.fillText("Puntuación: " + puntuacion, cx, cy + 20);

    ctx.font      = "16px 'Share Tech Mono', monospace";
    ctx.fillStyle = "hsl(45, 90%, 55%)";
    ctx.fillText("Presiona ESPACIO para reiniciar", cx, cy + 60);
  }

  renderizar(modelo) {
    this.dibujarFondo(modelo.estrellas);
    for (const ast  of modelo.asteroides) this.dibujarAsteroide(ast);
    for (const bala of modelo.balas)      this.dibujarBala(bala);
    this.dibujarNave(modelo.nave);
    this.dibujarHUD(modelo.puntuacion, modelo.nivel, modelo.vidas);
    if (!modelo.juegoActivo) this.dibujarPantallaFin(modelo.puntuacion);
  }
}
