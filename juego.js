
const VELOCIDAD_ROTACION = 0.07;
const VELOCIDAD_BALA     = 7;
const VIDA_BALA          = 60;

const lienzo   = document.getElementById("lienzo");
const contexto = lienzo.getContext("2d");

let estrellas        = [];
const teclasPulsadas = {};

const nave = {
  x: 0,
  y: 0,
  angulo: -Math.PI / 2
};

let balas = [];

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function reproducirSonidoDisparo() {
  const oscilador = audioCtx.createOscillator();
  const ganancia  = audioCtx.createGain();

  oscilador.connect(ganancia);
  ganancia.connect(audioCtx.destination);

  oscilador.type = "square";
  oscilador.frequency.setValueAtTime(880, audioCtx.currentTime);
  oscilador.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.15);

  ganancia.gain.setValueAtTime(0.3, audioCtx.currentTime);
  ganancia.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

  oscilador.start(audioCtx.currentTime);
  oscilador.stop(audioCtx.currentTime + 0.15);
}

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

function dibujarNave() {
  contexto.save();
  contexto.translate(nave.x, nave.y);
  contexto.rotate(nave.angulo);

  contexto.shadowColor = "hsl(170, 80%, 60%)";
  contexto.shadowBlur  = 12;
  contexto.strokeStyle = "hsl(170, 80%, 60%)";
  contexto.lineWidth   = 2;

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

function dibujarBala(bala) {
  contexto.shadowColor = bala.color;
  contexto.shadowBlur  = 10;
  contexto.fillStyle   = bala.color;
  contexto.beginPath();
  contexto.arc(bala.x, bala.y, 3, 0, Math.PI * 2);
  contexto.fill();
}

function actualizar() {
  const ancho = lienzo.width;
  const alto  = lienzo.height;

  if (teclasPulsadas["ArrowLeft"]  || teclasPulsadas["a"]) nave.angulo -= VELOCIDAD_ROTACION;
  if (teclasPulsadas["ArrowRight"] || teclasPulsadas["d"]) nave.angulo += VELOCIDAD_ROTACION;

  let balasActivas = [];
  for (let j = 0; j < balas.length; j++) {
    const bala = balas[j];
    bala.x += bala.velocidadX;
    bala.y += bala.velocidadY;
    bala.vida--;

    if (bala.x < 0)     bala.x = ancho;
    if (bala.x > ancho) bala.x = 0;
    if (bala.y < 0)     bala.y = alto;
    if (bala.y > alto)  bala.y = 0;

    if (bala.vida > 0) balasActivas.push(bala);
  }
  balas = balasActivas;
}

function bucleJuego() {
  actualizar();
  dibujarFondoEstrellas();
  for (let j = 0; j < balas.length; j++) dibujarBala(balas[j]);
  dibujarNave();
  requestAnimationFrame(bucleJuego);
}

const COLORES_BALA = [
  "hsl(170, 80%, 70%)",
  "hsl(45, 90%, 65%)",
  "hsl(200, 90%, 70%)",
  "hsl(300, 80%, 75%)"
];
let indicadorColor = 0;

window.addEventListener("keydown", function (evento) {
  teclasPulsadas[evento.key] = true;

  if (evento.key === " " || evento.key === "Spacebar") {
    evento.preventDefault();

    if (audioCtx.state === "suspended") audioCtx.resume();

    reproducirSonidoDisparo();

    const color = COLORES_BALA[indicadorColor % COLORES_BALA.length];
    indicadorColor++;

    balas.push({
      x: nave.x + Math.cos(nave.angulo) * 20,
      y: nave.y + Math.sin(nave.angulo) * 20,
      velocidadX: Math.cos(nave.angulo) * VELOCIDAD_BALA,
      velocidadY: Math.sin(nave.angulo) * VELOCIDAD_BALA,
      vida: VIDA_BALA,
      color: color
    });
  }
});

window.addEventListener("keyup", function (evento) {
  teclasPulsadas[evento.key] = false;
});

function redimensionarCanvas() {
  lienzo.width  = window.innerWidth;
  lienzo.height = window.innerHeight;
  nave.x = lienzo.width  / 2;
  nave.y = lienzo.height / 2;
  inicializarEstrellas(lienzo.width, lienzo.height);
}

window.addEventListener("resize", redimensionarCanvas);

redimensionarCanvas();
bucleJuego();
