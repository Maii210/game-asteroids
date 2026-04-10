const lienzo = document.getElementById("lienzo");
const contexto = lienzo.getContext("2d");

let estrellas = [];

function inicializarEstrellas(ancho, alto) {
  estrellas = [];
  for (let i = 0; i < 120; i++) {
    estrellas.push({
      x: Math.random() * ancho,
      y: Math.random() * alto,
      brillo: Math.random() * Math.PI * 2,
      tamano: Math.random() * 1.5 + 0.5
    });
  }
}

function dibujarFondoEstrellas() {
  contexto.fillStyle = "hsl(230, 25%, 3%)";
  contexto.fillRect(0, 0, lienzo.width, lienzo.height);

  for (let i = 0; i < estrellas.length; i++) {
    const e = estrellas[i];
    const opacidad = 0.3 + Math.sin(Date.now() * 0.001 + e.brillo) * 0.4;
    contexto.fillStyle = "hsla(45, 90%, 85%, " + opacidad + ")";
    contexto.beginPath();
    contexto.arc(e.x, e.y, e.tamano, 0, Math.PI * 2);
    contexto.fill();
  }
}

function dibujarNave(x, y, angulo) {
  contexto.save();
  contexto.translate(x, y);
  contexto.rotate(angulo);

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

  contexto.restore();
}

function bucleJuego() {
  dibujarFondoEstrellas();

  dibujarNave(lienzo.width / 2, lienzo.height / 2, -Math.PI / 2);

  requestAnimationFrame(bucleJuego);
}

function redimensionarCanvas() {
  lienzo.width = window.innerWidth;
  lienzo.height = window.innerHeight;
  inicializarEstrellas(lienzo.width, lienzo.height);
}

window.addEventListener("resize", redimensionarCanvas);

redimensionarCanvas();
bucleJuego();
