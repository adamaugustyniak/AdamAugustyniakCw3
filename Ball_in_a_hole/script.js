
let ball = document.querySelector('.ball')
let canvas = document.querySelector('canvas')
  canvas.width = this.canvas.scrollWidth;
  canvas.height = this.canvas.scrollHeight;
let context = canvas.getContext('2d');
let timeDiv = document.querySelector('.time');

let actualX = canvas.width/2, actualY = canvas.height/2; //pozycja kulki - środek planszy

let time = new Date().getTime()/1000; //aktualny czas - zwraca czas w milisekundach

function loop(){ //glowna petla gry
  let tempTime = new Date().getTime()/1000 - time; //obsluga czasu
  timeDiv.innerHTML = Math.floor(tempTime);
  drawBoard();
  draw();
  chceckWin();
  window.requestAnimationFrame(loop);
}

let bariercounter = 10; //ilosc przeszkód
let barierArray = [];
createbarier();
function createbarier(){  //stworzenie przeszkod
  for (var i = 0; i < bariercounter; i++) {
    let x = Math.floor(Math.random() * canvas.width),  //wsp. przeszkody
        y = Math.floor(Math.random() * canvas.height),
        sizeX = Math.floor(40 +Math.random() * 60),
        sizeY = Math.floor(40 +Math.random() * 60);
    barierArray.push({x: x, y: y, sizeX: sizeX, sizeY: sizeY}); //dodanie randomwoej wsp, i dlugosci
  }
}
//rysowanie przeszkód
function drawBoard(){ 
  for (var i = 0; i < bariercounter; i++) {
    context.fillRect(barierArray[i].x, barierArray[i].y, barierArray[i].sizeX, barierArray[i].sizeY);
  }
}
//
let alpha = 0, gamma=0, beta =0;
let circleRadius = 10;
function draw(){
  context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.closePath(); //czyszczenie ekranu

  context.fillStyle ="#ff4130";
  drawBoard(); //wymaluj przeszkody
  chcekCollision(); //sprawdzanie kolizji z przeszkodamu
  actualY += beta /10; //do pozycji y dodaj wartosc pochylenia ekranu
  actualX += alpha /10;

  drawHoles();

  context.fillStyle ="#38b200";
  context.moveTo(actualX, actualY);
  context.beginPath();
  context.arc(actualX, actualY, circleRadius ,Math.PI/3.1, true); //wymaluj kolo
  context.closePath();
  context.fill();
  context.stroke();
}
function orientation (event) { //zdarzenia pochylenia ekranu
   alpha = event.alpha; //obrot wokol wlasnej osi
   gamma = event.gamma; //obrot pod katem
   beta = event.beta - 90; //gora dol
}

function chcekCollision(){ //srawdznie kolizji
  barierArray.forEach(function(bar, index){
      if (actualX > bar.x && actualX < bar.x+bar.sizeX) {
        if (actualY > bar.y && actualY <bar.y+bar.sizeY) {
          let content = document.querySelector('.content');
          let canvas = document.querySelector('#canvas'); 
          let end = content.removeChild(canvas);  //usunięcie obiektu canvas
          let score = document.querySelector('.end').style.display = "block";
        }
      }
  });
}

function chceckWin(){ //sprawdznie czy kulka jest w dziurze
  let z = false;
  if (actualX < 50 && actualY < 50) {
    z = true;
  }
  else if (actualX > canvas.width-50 && actualY > canvas.height-50) {
    z = true;
  }
  if (z) {
    let content = document.querySelector('.content');
    let canvas = document.querySelector('#canvas');
    let end = content.removeChild(canvas); //usunięcie obiektu canvas
    let score = document.querySelector('.win').style.display = "block";
  }
}

function drawHoles(){ //rysowanie dziur, czyli koncow
  let size = 50;
  context.fillStyle ="black";
  context.fillRect(0, 0, size, size);
}
window.addEventListener('deviceorientation', orientation);
window.requestAnimationFrame(loop); //wywolanie petli
