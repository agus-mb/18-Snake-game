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

const moveSnake=()=>{
    const newSquare= String(
        Number(snake[snake.length-1])+directions[direction]).//toma el ultimo cuadrado de la snake y a ella le hace una suma (+) la info de la direccion (1, -1, 10 etc). Ej: 02+1= 03, ES DECIR SE MOVIO A LA DERECHA UN CUADRADO
        padStart(2,'0');//como aca especificamos asi arrowRight: 1, arrowLeft: -1,debemos agregarle el 0 al inicio y que se formen las coordenadas.
        const [row, column]=newSquare.split('');


        if(newSquare<0||//se ubica en un cuadrado menor que el valor 0, es imposible.
          newSquare>boardSize*boardSize||//se ubica en un cuadrado mas grande que las ultimas coorenadas (9,9) las cuales son el tamanio total.
          (direction==='arrowRight'&&column==0)||
          (direction==='arrowLeft'&&column==9||
          boardSquares[row][column]===squareTypes.snakeSquare)//si se toca a si misma
          ){
            itsGameOver()
            
          }else{
            snake.push(newSquare);//sino crea nuevo cuadrado de caminito
            if(boardSquares[row][column]===squareTypes.foodSquare){
                addFood();//funcion que subira los puntos, el score

            }else{
                snake.push(newSquare);
               if(boardSquares[row][column] === squareTypes.foodSquare) {
                addFood();
              } else {
                const emptySquare=snake.shift();//le sacamos el primer cuadrado a la serpinte;
                drawSquare(emptySquare,'empty-square');//avisamos que ahora ese lugar es uno vacio, no mas ocupado
            }
            drawSnake();//que vuelva a dibujarse en el board

          }
        }
}

const addFood=()=>{
    score++;
    updateScore();
    createRandomFood();
}

const itsGameOver=()=>{
    gameOver.style.display='block';
    clearInterval(moveInterval);//limpiamos para que la serpiente se deje de mover.
    startButton.disabled=false;
}

const setDirection=newDirection =>{
    direction=newDirection;//va recibiendo las nuevas direcciones, a medida que el usuario va tocando
}

const directionEvent=key=>{ //recibe la tecla que tocamos.
    switch(key.code){//tecla pulsada
        case 'arrowUp':
            direction!= "arrowDown"&&setDirection(key.code)
            break
        case 'arrowDown':
            direction != 'arrowUp'&&setDirection(key.code)
            break
        case 'arrowLeft':
            direction != 'arrowRight'&&setDirection(key.code)
            break
        case 'arrowRight':
            direction != 'arrowLeft'&&setDirection(key.code)
            break
    }//la serpiente no debe volver sobre sus pasos, por eso se bloquea el opuesto de la tecla. Para volver para atras por ej, debe  ir para la derecha o izquierda y de alli subir.

}

const createRandomFood=()=>{
    const randomEmptySquare=emptySquares[Math.floor(Math.random()*emptySquares.length)];//crea una coordenada random entre arrays.
    drawSquare(randomEmptySquare,"food-square");//le asigna el type de square
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
  snake = ["00", "01", "02", "03"]; //serpiente, array 1: row en todos, array 2: column
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
  document.addEventListener('keydown',directionEvent);//Los eventos keydown y keyup proporcionan un código que indica qué tecla se presiona.
  moveInterval=setInterval( ()=>moveSnake(),gameSpeed);
};



startButton.addEventListener("click", startGame);
