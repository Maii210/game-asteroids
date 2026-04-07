
const VELOCIDAD_ROTACION = 0.07;
const FUERZA_EMPUJE = 0.1;
const FRICCION = 0.99;
const VELOCIDAD_BALA = 7;
const VIDA_BALA = 60;
const CANTIDAD_ASTEROIDES_INICIAL = 5;

const lienzo = document.getElementById("lienzo");
const contexto = lienzo.getContext("2d");

let estadoJuego = null;
const teclasPulsadas = {};
let estrellas = [];
let idAnimacion = 0;
