
function crearVerticesAsteroide(radio) {
  const numVertices = 8 + Math.floor(Math.random() * 5);
  const vertices = [];
  for (let i = 0; i < numVertices; i++) {
    const variacion = 0.6 + Math.random() * 0.8;
    vertices.push(radio * variacion);
  }
  return vertices;
}

function crearAsteroide(anchoCanvas, altoCanvas, radio) {
  const r = radio || 30 + Math.random() * 30;
  const lado = Math.floor(Math.random() * 4);
  let x, y;

  switch (lado) {
    case 0: x = Math.random() * anchoCanvas; y = -r; break;
    case 1: x = anchoCanvas + r; y = Math.random() * altoCanvas; break;
    case 2: x = Math.random() * anchoCanvas; y = altoCanvas + r; break;
    default: x = -r; y = Math.random() * altoCanvas; break;
  }

  return {
    x: x, y: y, radio: r,
    velocidadX: (Math.random() - 0.5) * 2,
    velocidadY: (Math.random() - 0.5) * 2,
    rotacion: 0,
    velocidadRotacion: (Math.random() - 0.5) * 0.04,
    vertices: crearVerticesAsteroide(r)
  };
}

function crearEstadoInicial(ancho, alto) {
  const asteroides = [];
  for (let i = 0; i < CANTIDAD_ASTEROIDES_INICIAL; i++) {
    asteroides.push(crearAsteroide(ancho, alto));
  }

  return {
    nave: {
      x: ancho / 2,
      y: alto / 2,
      angulo: -Math.PI / 2,
      velocidadX: 0,
      velocidadY: 0,
      empuje: false
    },
    asteroides: asteroides,
    balas: [],
    puntuacion: 0,
    vidas: 3,
    juegoActivo: true,
    nivel: 1
  };
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
