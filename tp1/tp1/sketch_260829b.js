let c = 4;           // cantidad de imágenes
let mb = [];         // array para guardar los sprites
let n = 0;           // índice del sprite que se está mostrando
let fondo;           // imagen del fondo
let marcaEnElTiempo = 0;
let velocidadAnimacion = 200;
let crashgirando1 = []; // arreglo sin dimensión 
let crashgirando2 = []; // arreglo sin dimensión
let crashgirando3 = []; // arreglo sin dimensión
let crashgirando4 = []; // arreglo sin dimensión
let a = 0, b = 0, f = 0, d = 0;
let estadoP = 0;
let contadorGeneral = 0;
function preload() {
  // cargamos el fondo aparte
  fondo = loadImage('assets/fondo.png');

  // CICLO FOR: carga las imágenes automáticamente
  for (let i = 0; i < c; i++) {
    mb[i] = loadImage("assets/sprite" + (i + 1) + ".png");
  }
  for (let i = 0; i < 5; i++) {
    crashgirando1[i] = loadImage("assets/sprite" + (i + 5) + ".png");
  }
}

function setup() {
  createCanvas(800, 600);
  console.log("hola mundo");
  console.log("cantidad: " + c);
  console.log("El personaje va " + obtenerVelocidadTexto(velocidadAnimacion));
  
}
function calcularPosicionX(desplazamiento, velocidad) {
  let posicion = 50 + desplazamiento * velocidad;
  return posicion;
}
function draw() {
  background(0);
  let desplazamiento = (millis() / velocidadAnimacion) % 800;

  
  image(fondo, -desplazamiento, 0, 800, 600);
  image(fondo, -desplazamiento + 800, 0, 800, 600);

  
  

  
  if (estadoP == 0) {
    image(crashgirando1[a],calcularPosicionX(contadorGeneral, 4),350);
  }
  
  else if (estadoP == 1) {
    image(mb[b],calcularPosicionX(contadorGeneral, 4),350);
  }
  
  else if (estadoP == 2) {
    image(mb[b],calcularPosicionX(contadorGeneral, 4),350);
  }

  

  // ACTUALIZACIÓN DE ESTADOS SEGÚN POSICIÓN
  contadorGeneral++;
  console.log(0 + contadorGeneral * 4);

  if (estadoP == 0 && a > 4 ) {
    estadoP = 1;
  } 
  else if (estadoP == 1 && b > 3 ) {
    estadoP = 2;
  } 

  // ANIMACIÓN CONTROLADA POR TIEMPO con millis()
  let posicionX = (millis() / velocidadAnimacion) * 10;

  if (millis() > marcaEnElTiempo + velocidadAnimacion) {
  if (estadoP==0){
    a++;
    if(a > 4 ) a = 0;
  }
  else if (estadoP==1 ){
    b++;
    if(b>3)b=0;
  }
    
    
    
    n = n + 1;
    if (n >= c) {
      n = 0;
    }
    marcaEnElTiempo = millis();
  }

  // MENSAJE A LOS 5 SEGUNDOS
  if (millis() > 5000) {
    console.log("pasaron 5 segundos");
  }
}
function keyPressed(){
  if ( key === 'r' || key === 'R'){
    estadoP = 0;
    contadorGeneral=0;
    a=0;
    b=0;
     marcaEnElTiempo = millis();
  }
}
function obtenerVelocidadTexto(velocidad) {
  if (velocidad < 300) {
    return "rápido";
  } else {
    return "lento";
  }
}
