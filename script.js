//elementos del html
const board = document.getElementById("board"); //tablero
const scoreBoard = document.getElementById("score-board"); //puntos ganados
const startButton = document.getElementById("start"); //arranque
const gameOver = document.getElementById("game-over"); //notificacion de fin

//configuraciones del juego
const boardSize = 10; //tamanio del tablero
const gameSpeed = 100; //velocidad, milisegundos
const squareTypes = {
  emptySquare: 0,
  snakeSquare: 1,
  foodSquare: 2,
}; //objeto con los valores de los diferentes cuadrados.
const directions = {
  arrowUp: -10,
  arrowDown: 10,
  arrowRight: 1,
  arrowLeft: -1,
}; //direcciones, cantidades que se moveran en el array.

//variables del juego, las cuales cambiaran
let snake; //guarda cambios en la serpiente.
let score; //guarda puntos.
let direction; //guarda direccion para donde va serpiente.
let boardSquares; //estructura de datos donde guardamos la info del tablero.
let emptySquares; //necesitamos generar comida en lugares aleatorios, para eso hay que saber por consecuencia donde estan los lugares vacios.
let moveInterval; //guarda intervalo para mover serpiente.

const drawSnake = () => {
  snake.forEach((square) => drawSquare(square, "snake-square"));
};

//square:posicion del cuadrado, type:tipo de cuadrado(empty,snake,food).
const drawSquare = (square, type) => {
  //funcion madre para dibujar q cuadradito.
  const [row, column] = square.split(""); //desmenuzar las coordenadas.
  boardSquares[row][column] = squareTypes[type]; //vamos a la info del tablero, tomamos las coordenadas y la funcion le pasara a ese square su tipo.
  const squareElement = document.getElementById(square); //el id son las coordenadas, nos sirve para guardan cual cuadrados estamos seleccionando
  squareElement.setAttribute("class", `square ${type}`); //le agrega la clase que le corresponde segun type.

  if (type === "empty-square") {
    emptySquares.push(square); //si tiene la clase emptysquare que se creen uno vacio
  } else {
    if (emptySquares.indexOf(square !== -1)) {
      emptySquares.splice(emptySquares.indexOf(square), 1);
      //saca del conteo de cuadrados vacios, tiene algo.
    }
  }
};

const createRandomFood=()=>{
    const randomEmptySquare=emptySquares[Math.floor(Math.random()*emptySquares.length)];//crea una coordenada random entre arrays.
    drawSquare(randomEmptySquare,"foodSquare");//le asigna el type de square
}

const updateScore=()=>{
    scoreBoard.innerHTML=score;
}

const createBoard = () => {
  boardSquares.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      const squareValue = `${rowIndex}${columnIndex}`;
      const squareElement = document.createElement("div");
      //array 1: fila, array 2: columna. Para cada index de fila un index de columna y asi sucesivamente. A esa construccion le asignamos un div para que sea vista en el html.
      squareElement.setAttribute("class", "square empty-square"); //le agregamos clases a ese div.
      squareElement.setAttribute("id", squareValue); //el id va a ser la ubicacion que le dimos, las coordenadas entre array 1 y array 2.
      board.appendChild(squareElement); //le agregamos los div de la combinacion de arrays al div que ya creamos en el html inicialmente.
      emptySquares.push(squareValue); //PUSH ANTI SQUARES, o sea, forzamos a que al cargar la pagina ya no existan cuadrados vacios sino que todos tienen su coordenada.
    });
  });
};

const setGame = () => {
  snake = ["00", "01", "02", "03"]; //serpiente, array 1: 0 en todos, array 2: 0,1,2,3.
  score = snake.length; //igual al largo de la serpiente, va subiendo cuando avanza esta misma.
  direction = "arrowRight"; //para la derecha de a uno.
  boardSquares = Array.from(Array(boardSize), () =>
    new Array(boardSize).fill(squareTypes.emptySquare)
  ); //array 1: 10 elementos que contienen al otro array, luego del "new" Array 2: array de 10 elementos lleno de ceros.
  board.innerHTML = " "; //cuando se resetee el juego quedara vacio de contenido.
  emptySquares = []; //tambien reseteamos a cero elementos al reiniciar juego.
  createBoard();
};

const startGame = () => {
  setGame(); //damos valores iniciales para que arranque
  gameOver.style.display = "none"; //ocultamos por las dudas aca tambien
  startButton.disabled = true; //mientras se juega estara bloqueado.
  drawSnake(); //dibujar serpiente.
  updateScore();//sirve para actualizar puntos 
  createRandomFood();
};

startButton.addEventListener("click", startGame);
