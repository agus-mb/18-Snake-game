//elementos del html
const board=document.getElementById('board'); //tablero
const scoreBoard=document.getElementById('score-board'); //puntos ganados
const startButton=document.getElementById('start'); //arranque
const gameOver=document.getElementById('game-over'); //notificacion de fin

//configuraciones del juego
const boardSize=10; //tamanio del tablero
const gameSpeed=100;//velocidad, milisegundos
const squeareTypes={
    emptySquare:0,
    snakeSquare:1,
    foodSquare:2
}; //objeto con los valores de los diferentes cuadrados.
const directions={
    arrowUp:-10,
    arrowDown:10,
    arrowRight:1,
    arrowLeft:-1
}; //direcciones, cantidades que se moveran en el array.

//variables del juego, las cuales cambiaran
let snake; //guarda cambios en la serpiente.
let score; //guarda puntos.
let direction; //guarda direccion para donde va serpiente.
let boardSquares; //guarda array con info del tablero.
let emptySquares; //necesitamos generar comida en lugares aleatorios, para eso hay que saber por consecuencia donde estan los lugares vacios.
let moveInterval; //guarda intervalo para mover serpiente.