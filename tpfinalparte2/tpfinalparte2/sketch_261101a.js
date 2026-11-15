//VIDEO EXPLICATIVOhttps://youtu.be/M8OogNFwEZk
let fondo;
let linterna;
let musicaSuspenso;
let time = 30;
let tem = new tiempo();
let mostrarPista = false;
let mostrarpeluca = false;   
let mostrarfotos = false;
let mostrartrampa = false;
let mostrarcuchillo = false;
let mostrarguantes = false;
let elemento = new objeto();
let eleccion;

let estado = "inicio";
let fondoInicio;

let textoinstrucciones = [
  "Para descubrir quien es o donde esta el asesino, debera encontra 3 pistas CLAVES en 30 segundos"
];
let textoopciones = [
  "El asesino debe ser el payaso real del circo, y el que murio es la verdadera victima",
  "El asesino debio huir hacia el bosque"
];
let textofinal = [
  "GANASTE: al descubrir quien fue el verdadero asesino, pudieron identificarlo y atraparlo",
  "Perdiste: al querer seguir al asesino al bosque, se encontraron con los lobos y su destino fue la muerte"
];

function preload(){
  fondo = loadImage('assets/interiorcabana.jpg');
  fondoInicio = loadImage('assets/interiorcabana.jpg');
  linterna = loadImage("assets/linterna.png");
  botas = loadImage("assets/botas.png");
  cuchillo = loadImage("assets/cuchillo.png");
  guantes = loadImage ("assets/guantes.png");
  trampa = loadImage("assets/trampa.png");
  peluca = loadImage("assets/peluca.png");
  fotos = loadImage("assets/fotos.png");
  musicaSuspenso=loadSound('assets/suspenso.mp3');
}

function setup() {
  createCanvas(800, 400);
  eleccion = new Eleccion();
}

function draw() {
  if (estado === "inicio") {
    image(fondoInicio, 0, 0, 800, 400);
    fill(0, 0, 0, 150);
    rect(0, 0, 800, 400);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Misterio en la Cabaña", 400, 100);
    fill(80, 160, 80);
    rect(300, 270, 200, 60, 8);
    fill(255);
    textSize(22);
    text("EMPEZAR", 400, 300);
  } else if (estado === "creditos") {
    background(20, 20, 30);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("¡Gracias por jugar!", 400, 100);
    textSize(20);
    text("Hecho por:", 400, 170);
    textSize(24);
    text("guzzo victoria  y julieta martinez", 400, 230);
    textSize(16);
    fill(180);
    text("Presiona R para volver al inicio", 400, 350);
  } else {
    image(fondo, 0, 0, 800, 400);
    if (time > 0) {
      elemento.dibujar();
      elemento.dibujarLinterna();
      tem.tempo();
      if (elemento.hayTodasLasPistas() && !eleccion.mostrar) {
        eleccion.activar();
      }
    } else if (time === 0) {
      fill(193, 14, 14);
      rect(20, 30, 760, 340);
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(25);
      text("¡SE ACABÓ EL TIEMPO!", 400, 130);
      textSize(18);
      text("Debes ser más rápido para encontrar las pistas", 400, 180);
      textSize(20);
      text("Presiona R para volver a intentarlo", 400, 250);
    }
    eleccion.dibujar();
  }
}

function mousePressed(){
  if (estado === "inicio") {
    if (mouseX > 300 && mouseX < 500 && mouseY > 270 && mouseY < 330) {
      estado = "jugando";
      time = 30;
    }
  } else {
    elemento.mousePressed();
    eleccion.mousePressed();
  }
}

function mouseReleased(){
  if (estado === "jugando") {
    elemento.mouseReleased();
  }
}

function keyPressed(){
  if( key == ' ' ){
    musicaSuspenso.play();
  }
  if( key === 'r' || key === 'R' ){
    if (estado === "creditos") {
      estado = "inicio";
    } else {
      time = 30;
      mostrarPista = false;
      mostrarpeluca = false;
      mostrarfotos = false;
      mostrartrampa = false;
      mostrarcuchillo = false;
      mostrarguantes = false;
      elemento.reiniciar();
      eleccion.reiniciar();
      estado = "inicio";
    }
  }
}

class Eleccion {
  constructor() {
    this.mostrar = false;
    this.respuesta = null;
  }

  activar() {
    this.mostrar = true;
    this.respuesta = null;
  }

  dibujar() {
    if (!this.mostrar) return;
    if (this.respuesta === null) {
      fill(20, 20, 20, 220);
      rect(0, 0, width, height);
      fill(255);
      rect(100, 100, 600, 240);
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(20);
      text("¡Encontraste todas las pistas!", 400, 140);
      textSize(16);
      text("¿Cuál es tu conclusión?", 400, 170);
      fill(100, 200, 100);
      rect(130, 200, 540, 50);
      fill(0);
      textSize(13);
      text(textoopciones[0], 400, 225);
      fill(220, 100, 100);
      rect(130, 270, 540, 50);
      fill(0);
      textSize(13);
      text(textoopciones[1], 400, 295);
    } else {
      if (this.respuesta) {
        fill(60, 160, 60, 230);
      } else {
        fill(160, 60, 60, 230);
      }
      rect(0, 0, width, height);
      fill(255);
      rect(100, 120, 600, 220);
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(20);
      if (this.respuesta) {
        text(textofinal[0], 400, 180);
      } else {
        text(textofinal[1], 400, 180);
      }
      textSize(16);
      text("Presiona R para jugar de nuevo", 400, 240);
      fill(100, 130, 200);
      rect(280, 280, 240, 45, 8);
      fill(255);
      textSize(16);
      text("Ver créditos", 400, 303);
    }
  }

  mousePressed() {
    if (!this.mostrar) return;
    if (this.respuesta === null) {
      if (mouseX > 130 && mouseX < 670 && mouseY > 200 && mouseY < 250) {
        this.respuesta = true;
      }
      if (mouseX > 130 && mouseX < 670 && mouseY > 270 && mouseY < 320) {
        this.respuesta = false;
      }
    } else {
      if (mouseX > 280 && mouseX < 520 && mouseY > 280 && mouseY < 325) {
        estado = "creditos";
      }
    }
  }

  reiniciar() {
    this.mostrar = false;
    this.respuesta = null;
  }
}
