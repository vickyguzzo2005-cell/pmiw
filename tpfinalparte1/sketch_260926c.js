let velocidadAnimacion = 90;
let tiempo;
let fondo;
let desplazamiento;
let imagenesdeshagy = [];
let indiceshagy = 0;
let posicionx = -100;
let velocidadcaminar = 2.0;
let imagenesdevelma = [];
let indicevelma = 0;
let tiempovelma;
let posicionxvelma = -180;
let velocidadcaminarvelma = 1.8;
let velocidaddescoby = 1.9;
let posicionxscoby = -260;
let tiemposcoby;
let indicescoby = 0;
let imagenesscoby = [];
let imagenesdaphne = [];
let posicionxdaphne = 650;
let aparecedaphne = false;
let detenidodaphne = false;
let imagenesfred = [];
let posicionxfred = 600;
let aparecefred = false;
let detenerse = false;
let frameHistoria;
let hablaPandilla;
let hablaFred;
let hablaDaf;
let textoAPandilla;
let textoAFred;
let textoADaf;
let minTexto;
let maxTexto;
let sePuedeElegir = false;
let musicaCirco;
let musicabosque;
let mostrarOpciones = false;
let caminandoDespuesDaphne = false;
let seleccion;
let fondobosque;
let fondoCabana;
let fondoActual;

let caminoElegido = false;

let personaje = ["Pandilla", "Fred", "Daphne"];

let textoPandilla = [
  "¿Qué ocurrió?",
  "Disculpe señor, ¿Usted sabe algo de lo que ocurrió?",
  "Vimos algo raro, vamos a investigar juntos"
];

let textoFred = [
  "Yo vi algo extraño por el bosque",
  "Tengan cuidado, no se separen",
  "Yo me quedo acá vigilando"
];

let textoDaf = [
  "¡Chicos! Yo también vi algo raro",
  "Vamos todos juntos a investigar",
  "No se separen por favor"
];

function preload() {
  fondo = loadImage('assets/fondoferia.png');

  for (let i = 0; i < 9; i++) {
    imagenesdeshagy[i] = loadImage('assets/shagy' + (i + 1) + '.png');
  }

  for (let i = 0; i < 8; i++) {
    imagenesdevelma[i] = loadImage('assets/velma' + (i + 1) + '.png');
  }

  for (let i = 0; i < 9; i++) {
    imagenesscoby[i] = loadImage('assets/scoby' + (i + 1) + '.png');
  }

  imagenesfred[0] = loadImage('assets/fredquieto.png');
  imagenesdaphne[0] = loadImage('assets/daphnequieta.png');

  musicaCirco = loadSound('assets/musicaCirco.mp3');
  musicabosque = loadSound('assets/musicabosque.mp3');

  fondobosque = loadImage('assets/bosque.png');
  fondoCabana = loadImage('assets/cabana.png');

  fondoActual = fondo;
}

function setup() {
  createCanvas(800, 450);
  textSize(20);
  frameHistoria = 0;
  hablaPandilla = true;
  hablaFred = false;
  hablaDaf = false;
  textoAPandilla = 0;
  textoAFred = 0;
  textoADaf = 0;
  minTexto = 0;
  maxTexto = 0;
  sePuedeElegir = false;
}

function draw() {
  console.log("frameHistoria vale:", frameHistoria);
  background(0);
  let desplazamiento = (millis() / velocidadAnimacion) % 800;

  image(fondoActual, -desplazamiento, 0, 800, 600);
  image(fondoActual, -desplazamiento + 800, 0, 800, 600);

  
  if (aparecefred && !caminoElegido) {
    image(imagenesfred[0], posicionxfred, 250, 160, 200);
  }

  if (aparecedaphne) {
    image(imagenesdaphne[0], posicionxdaphne, 250, 160, 200);
  }

  
  if (posicionxscoby > 900 && !aparecedaphne && !mostrarOpciones && !caminoElegido && !aparecefred) {
    aparecefred = true;
    posicionx = -100;
    posicionxvelma = -180;
    posicionxscoby = -260;
  }

  if (aparecefred && !caminoElegido && posicionx > 460 && !detenerse) {
    detenerse = true;
    sePuedeElegir = true;
    frameHistoria = 0;
    hablaPandilla = true;
    hablaFred = false;
    hablaDaf = false;
    textoAPandilla = 0;
    minTexto = 0;
    maxTexto = 0;
  }

  if (detenerse && frameHistoria >= 5) {
    detenerse = false;
    aparecefred = false;
    aparecedaphne = true;
    frameHistoria = 6;
    minTexto = 0;
    maxTexto = 0;
  }

  if (aparecedaphne && posicionx > 500 && !detenidodaphne) {
    detenidodaphne = true;
    sePuedeElegir = true;
    frameHistoria = 6;
    hablaPandilla = false;
    hablaFred = false;
    hablaDaf = true;
    textoADaf = 0;
    minTexto = 0;
    maxTexto = 0;
  }

  tiempo = millis() / 250;

  if (!detenerse && !detenidodaphne && !mostrarOpciones) {
    indiceshagy = floor(tiempo) % 9;
    posicionx = posicionx + velocidadcaminar;
  } else {
    indiceshagy = 0;
  }

  image(imagenesdeshagy[indiceshagy], posicionx, 250, 150, 200);

  tiempovelma = millis() / 260;

  if (!detenerse && !detenidodaphne && !mostrarOpciones) {
    indicevelma = floor(tiempovelma) % 8;
    posicionxvelma = posicionxvelma + velocidadcaminarvelma;
  } else {
    indicevelma = 0;
  }

  image(imagenesdevelma[indicevelma], posicionxvelma, 250, 160, 201);

  tiemposcoby = millis() / 250;

  if (!detenerse && !detenidodaphne && !mostrarOpciones) {
    indicescoby = floor(tiemposcoby) % 9;
    posicionxscoby = posicionxscoby + velocidaddescoby;
  } else {
    indicescoby = 0;
  }

  image(imagenesscoby[indicescoby], posicionxscoby, 290, 170, 202);

  if (detenerse || detenidodaphne) {
    momentoEnLaHistoria();
    dibujarCajaDeTexto();
  }

  if (caminandoDespuesDaphne && posicionx > 650) {
    caminandoDespuesDaphne = false;
    mostrarOpciones = true;
    sePuedeElegir = true;
  }

  if (mostrarOpciones) {
    stroke(255);
    strokeWeight(3);
    fill(40, 20, 60, 230);
    rect(200, 100, 400, 250, 20);
    noStroke();
    fill(255);
    textSize(22);
    textAlign(CENTER);
    text("¿A dónde quiere ir?", 400, 140);
    textSize(20);
    text("ir a la izquierda", 400, 200);
    text("ir a la derecha", 400, 260);
    textAlign(LEFT);
  }
}

function momentoEnLaHistoria() {
  if (frameHistoria == 0) {
    hablaPandilla = true;
    hablaFred = false;
    hablaDaf = false;
    textoAPandilla = 0;
  }

  if (frameHistoria == 1) {
    hablaPandilla = true;
    textoAPandilla = 1;
  }

  if (frameHistoria == 2) {
    hablaPandilla = false;
    hablaFred = true;
    textoAFred = 0;
  }

  if (frameHistoria == 3) {
    hablaFred = true;
    textoAFred = 1;
  }

  if (frameHistoria == 4) {
    hablaFred = true;
    textoAFred = 2;
  }

  if (frameHistoria == 5) {
    hablaPandilla = true;
    hablaFred = false;
    textoAPandilla = 2;
  }

  if (frameHistoria == 6) {
    hablaPandilla = false;
    hablaDaf = true;
    textoADaf = 0;
  }

  if (frameHistoria == 7) {
    hablaDaf = true;
    textoADaf = 1;
  }

  if (frameHistoria == 8) {
    hablaDaf = true;
    textoADaf = 2;
  }
}

function quePersonajeHabla() {
  if (hablaPandilla) return 0;
  if (hablaFred) return 1;
  if (hablaDaf) return 2;
}

function queColorDeFill() {
  if (hablaPandilla) return [60, 10, 90, 200];
  if (hablaFred) return [40, 80, 30, 200];
  if (hablaDaf) return [80, 20, 60, 200];
}

function queColorDeStroke() {
  if (hablaPandilla) return [255];
  if (hablaFred) return [255];
  if (hablaDaf) return [255];
}

function escribirConversacion() {
  if (hablaPandilla) {
    fill(255);
    text(textoPandilla[textoAPandilla].substring(minTexto, maxTexto), 50, 300, 300);
  } else if (hablaFred) {
    fill(255);
    text(textoFred[textoAFred].substring(minTexto, maxTexto), 50, 300, 300);
  } else if (hablaDaf) {
    fill(255);
    text(textoDaf[textoADaf].substring(minTexto, maxTexto), 50, 300, 300);
  }

  if (maxTexto < 100) maxTexto++;
}

function dibujarCajaDeTexto() {
  fill(queColorDeFill());
  stroke(queColorDeStroke());
  strokeWeight(2);
  rect(30, 280, 340, 100, 20);
  noStroke();

  fill(255);
  text(personaje[quePersonajeHabla()], 50, 265);

  escribirConversacion();
}

function mousePressed() {
  if (detenerse || detenidodaphne) {
    if (!sePuedeElegir) return;

    if (frameHistoria < 8) {
      frameHistoria++;
      maxTexto = 0;
      minTexto = 0;
    } else {
      detenidodaphne = false;
      detenerse = false;
      aparecedaphne = false;
      aparecefred = false;
      sePuedeElegir = false;
      mostrarOpciones = false;
      caminandoDespuesDaphne = true;
    }

    return;
  }

  if (mostrarOpciones && sePuedeElegir) {
    if (mouseX > 220 && mouseX < 580 && mouseY > 170 && mouseY < 230) {
      seleccion = "izquierda";
      fondoActual = fondobosque;

      
      aparecefred = false;
      caminoElegido = true;

      musicaCirco.stop();
      musicabosque.loop();
      mostrarOpciones = false;
      sePuedeElegir = false;
    }

    else if (mouseX > 220 && mouseX < 580 && mouseY > 230 && mouseY < 290) {
      seleccion = "derecha";
      fondoActual = fondoCabana;

   
      aparecefred = false;
      caminoElegido = true;

      musicaCirco.stop();
      musicabosque.loop();
      mostrarOpciones = false;
      sePuedeElegir = false;
    }
  }
}

function keyPressed() {
  if (key == 'p') {
    musicaCirco.loop();
  }
}
