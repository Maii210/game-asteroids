
function dibujarFondoEstrellas() {
  contexto.fillStyle = "hsl(230, 25%, 3%)";
  contexto.fillRect(0, 0, lienzo.width, lienzo.height);

  for (let i = 0; i < estrellas.length; i++) {
    const estrella = estrellas[i];
    const opacidad = 0.3 + Math.sin(Date.now() * 0.001 + estrella.brillo) * 0.4;
    contexto.fillStyle = "hsla(45, 90%, 85%, " + opacidad + ")";
    contexto.beginPath();
    contexto.arc(estrella.x, estrella.y, estrella.tamano, 0, Math.PI * 2);
    contexto.fill();
  }
}

function dibujarNave(nave) {
  contexto.save();
  contexto.translate(nave.x, nave.y);
  contexto.rotate(nave.angulo);

  contexto.shadowColor = "hsl(170, 80%, 60%)";
  contexto.shadowBlur = 12;

  contexto.strokeStyle = "hsl(170, 80%, 60%)";
  contexto.lineWidth = 2;
  contexto.beginPath();
  contexto.moveTo(18, 0);
  contexto.lineTo(-12, -10);
  contexto.lineTo(-8, 0);
  contexto.lineTo(-12, 10);
  contexto.closePath();
  contexto.stroke();

  contexto.fillStyle = "hsla(170, 80%, 45%, 0.15)";
  contexto.fill();

  if (nave.empuje) {
    contexto.shadowColor = "hsl(15, 90%, 55%)";
    contexto.shadowBlur = 15;
    contexto.strokeStyle = "hsl(45, 90%, 55%)";
    contexto.lineWidth = 1.5;
    contexto.beginPath();
    contexto.moveTo(-8, -4);
    contexto.lineTo(-18 - Math.random() * 8, 0);
    contexto.lineTo(-8, 4);
    contexto.stroke();
  }

  contexto.restore();
}

function dibujarAsteroide(asteroide) {
  contexto.save();
  contexto.translate(asteroide.x, asteroide.y);
  contexto.rotate(asteroide.rotacion);

  contexto.strokeStyle = "hsl(30, 20%, 50%)";
  contexto.lineWidth = 1.5;
  contexto.shadowColor = "hsl(30, 20%, 40%)";
  contexto.shadowBlur = 4;

  contexto.beginPath();
  const numVertices = asteroide.vertices.length;
  for (let i = 0; i < numVertices; i++) {
    const angulo = (i / numVertices) * Math.PI * 2;
    const r = asteroide.vertices[i];
    const px = Math.cos(angulo) * r;
    const py = Math.sin(angulo) * r;
    if (i === 0) contexto.moveTo(px, py);
    else contexto.lineTo(px, py);
  }
  contexto.closePath();
  contexto.stroke();
  contexto.fillStyle = "hsla(30, 15%, 25%, 0.3)";
  contexto.fill();

  contexto.restore();
}

function dibujarBala(bala) {
  contexto.shadowColor = "hsl(170, 80%, 60%)";
  contexto.shadowBlur = 8;
  contexto.fillStyle = "hsl(170, 80%, 70%)";
  contexto.beginPath();
  contexto.arc(bala.x, bala.y, 2.5, 0, Math.PI * 2);
  contexto.fill();
}

function dibujarHUD() {
  const estado = estadoJuego;
  contexto.shadowBlur = 0;
  contexto.font = "bold 20px 'Orbitron', sans-serif";
  contexto.fillStyle = "hsl(170, 80%, 60%)";
  contexto.textAlign = "left";
  contexto.fillText("PUNTOS: " + estado.puntuacion, 20, 35);

  contexto.textAlign = "right";
  contexto.fillText("NIVEL: " + estado.nivel, lienzo.width - 20, 35);

  contexto.textAlign = "center";
  let vidasTexto = "";
  for (let i = 0; i < estado.vidas; i++) vidasTexto += "♦ ";
  contexto.fillText(vidasTexto, lienzo.width / 2, 35);
}

function dibujarPantallaFin() {
  const ancho = lienzo.width;
  const alto = lienzo.height;

  contexto.fillStyle = "hsla(230, 25%, 3%, 0.7)";
  contexto.fillRect(0, 0, ancho, alto);

  contexto.shadowColor = "hsl(0, 75%, 55%)";
  contexto.shadowBlur = 20;
  contexto.font = "bold 48px 'Orbitron', sans-serif";
  contexto.fillStyle = "hsl(0, 75%, 55%)";
  contexto.textAlign = "center";
  contexto.fillText("FIN DEL JUEGO", ancho / 2, alto / 2 - 30);

  contexto.shadowColor = "hsl(170, 80%, 60%)";
  contexto.shadowBlur = 10;
  contexto.font = "24px 'Orbitron', sans-serif";
  contexto.fillStyle = "hsl(170, 80%, 60%)";
  contexto.fillText("Puntuación: " + estadoJuego.puntuacion, ancho / 2, alto / 2 + 20);

  contexto.font = "16px 'Share Tech Mono', monospace";
  contexto.fillStyle = "hsl(45, 90%, 55%)";
  contexto.fillText("Presiona ESPACIO para reiniciar", ancho / 2, alto / 2 + 60);
}
