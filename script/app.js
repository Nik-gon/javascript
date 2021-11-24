alert("ADVERTENCIA esta pagina no es responsive")
console.log("hola")
//RECARGAR LA PAGINA CON LOGO------------------------------------------------------------>
const logo = document.querySelector(`#logo`);
logo.addEventListener(`click`, ()=>{
    location.reload();
})
//ELEMENTOS HTML PADRES----------------------------------------------------------------->
const firstDiv = document.querySelector(`#primerDiv`)
const user_name = document.querySelector(`#inputId`);
const buttom = document.getElementById("btn");
const Father = document.querySelector(`#divTexto`);
const start = document.createElement("h2");
Father.appendChild(start);
let puntos= 0
//BOTON DE CARGA INICIAL---------------------------------------------------------------->
const info = [];
const userData =JSON.stringify(localStorage.setItem(`usuario`, user_name));
info.push(userData);
localStorage.setItem(`Nombre De Usuario`, user_name.value);
const eventButton = buttom.addEventListener(`click`,() => { 
    start.innerHTML=`hola ${user_name.value} queres jugar a un juego?`
    console.log(`hola ${user_name.value} queres jugar a un juego? `);
    const logMs = document.querySelector(`#logMs`)
    logMs.innerHTML=`Bienvenido ${user_name.value}`
    //CONSECUENCIA DEL BOTON------------------------------------------------------------->
    do {
        const SiNo = document.createElement("div");
        start.appendChild(SiNo);
        //"CONDICIONES"------------------------------------------------------------------>
        SiNo.innerHTML= `<button class="boton" id="btn-2" value="si" name="Texto">si</button><button class="boton" id="btn-3" value="no" name="Texto">no</button>`
        const juegoSi = document.querySelector(`#btn-2`);
        const juegoNo = document.querySelector(`#btn-3`)
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------------->
        $(juegoSi).on(`click`, () =>{
            Father.removeChild(start)
            console.log("funciona la condicion para si")
            //Father.removeChild(start);
            const selectorDeJuegos = document.createElement("h3");
            Father.appendChild(selectorDeJuegos);
            selectorDeJuegos.innerHTML=`
                             <h2>Elige un Juego :</h2> 
                             <br>
                             <p class="seleccion" id="AdivinaNumero">Adivinador</p>
                             <br>
                             <p class="seleccion" id="SnakeId">Snake</p>`;
        //MATERIALIZACION DE ADIVINADOR------------------------------------------------>
        const adivinador = document.querySelector(`#AdivinaNumero`);
        console.log(typeof(adivinador));
        adivinador.addEventListener(`click`, ()=>{console.log("funciona adivinador Query selectior")});
        console.log(typeof(adivinador));
        //MATERLIALIZACION DE SNAKE---------------------------------------------------->
        const snakeGame= document.querySelector(`#SnakeId`)
        console.log(typeof(snakeGame));
        $(snakeGame).on(`click`, ()=> { console.log("funciona snake query selector")});
        //SNAKE-------------------------------------------------------------------------------------------------------------------------------------------------------->
        $(snakeGame).on(`click`, () =>{
            Father.removeChild(selectorDeJuegos);
            console.log("funciona la condicion para snake game")
            const interfazGame = document.createElement("div");
            interfazGame.classList.add("divSnakeGame");
            Father.appendChild(interfazGame);
            interfazGame.innerHTML=`    
            <div id="board"></div>
            <div class="boardInfo">
                <div>
                    Puntos: <div id="pointBar"></div>
                </div>
                <button id="start">Start</button>
            </div>
            <div id="gameOver">Game Over</div>`;
            const buttonFinish = document.createElement("button");
            buttonFinish.classList.add("boton");
            Father.appendChild(buttonFinish);
            buttonFinish.innerHTML= "TERMINAR"
            //EVENTO TERMINAR----------------------------------------->
            buttonFinish.addEventListener(`click`, () =>{ 
                Father.removeChild(interfazGame);
                Father.removeChild(buttonFinish);
                Father.appendChild(selectorDeJuegos);
             })
            //SELECTOR DE ELEMENTOS HTML---------------------------------------------------------------->
            const board = document.querySelector('#board');
            const pointBar = document.querySelector('#pointBar');
            const startButton = document.querySelector('#start');
            const gameOverSign = document.querySelector('#gameOver');
            //CONFIGURACION DEL JUEGO------------------------------------------------------------------->
            const boardSize = 10;
            const gameSpeed = 100;
            const tipoDeCubos = {
                emptySquare: 0,
                snakeSquare: 1,
                foodSquare: 2
            };
            const directions = {
                ArrowUp: -10,
                ArrowDown: 10,
                ArrowRight: 1,
                ArrowLeft: -1,
            };
            //GAME VARIABLES-------------------------------------------------------------------------->
            let snake ;
            let score ;
            let direction;
            let boardSquares;
            let SquaresVacios;
            let moveInterval;
            //SNAKE DRAW----------------------------------------------------------------------------->
            function drawSnake(){
                snake.forEach( square => drawSquare(square, 'snakeSquare')); 
            }
            //DIBUJO DE CAMPO ----------------------------------------------------------------------->
            function drawSquare (square, type){
                const [ row, column ] = square.split('');
                boardSquares[row][column] = tipoDeCubos[type];
                const squareElement = document.getElementById(square);
                squareElement.setAttribute('class', `square ${type}`);
                if(type === 'emptySquare') {
                    SquaresVacios.push(square);
                } else {
                    if(SquaresVacios.indexOf(square) !== -1) {
                        SquaresVacios.splice(SquaresVacios.indexOf(square), 1);
                    }
                }
            }
            //MOVIMIENTO DE SNAKE------------------------------------------------------------------->
            function moveSnake () {
                const newSquare = String(
                    Number(snake[snake.length - 1]) + directions[direction])
                    .padStart(2, '0');
                    const [row, column] = newSquare.split('');
                    if( newSquare < 0 || 
                        newSquare > boardSize * boardSize  ||
                        (direction === 'ArrowRight' && column == 0) ||
                        (direction === 'ArrowLeft' && column == 9 ||
                        boardSquares[row][column] === tipoDeCubos.snakeSquare) ) {
                            gameOver()
                        } else {
                            snake.push(newSquare);
                            if(boardSquares[row][column] === tipoDeCubos.foodSquare) {
                                addFood();
                            } else {
                                const emptySquare = snake.shift();
                                drawSquare(emptySquare, 'emptySquare');
                            }
                            drawSnake();
                        }
                    }
                    //COMIDA SNAKE------------------------------------------------------------------------>
                    function addFood(){
                        score++;
                        updateScore();
                        createRandomFood();
                    }
                    //GAME OVER-------------------------------------------------------------------------->
                    function gameOver  () {
                        gameOverSign.style.display = 'block';
                        clearInterval(moveInterval)
                        startButton.disabled = false;
                        console.log("funciona gameOver");
                        console.log(score)
                        console.log(puntos)
                        function sumadorDePuntos () {
                            puntos = puntos + score
                            return puntos;
                        }
                        sumadorDePuntos();
                        const footer = document.querySelector(`#puntosDeHoy`)
                        footer.innerHTML=`PUNTOS DE HOY: ${puntos}`
                        return puntos;
                    }
                    //ESTABLECIMIENTO DE DIRECCIONES----------------------------------------------------->
                    const setDirection = newDirection => {
                        direction = newDirection;
                    }
                    //EVENTOS DE DIRECCION--------------------------------------------------------------->
                    const directionEvent = key => {
                        switch (key.code) {
                            case 'ArrowUp':
                                direction != 'ArrowDown' && setDirection(key.code)
                                break;
                                case 'ArrowDown':
                                    direction != 'ArrowUp' && setDirection(key.code)
                                    break;
                                case 'ArrowLeft':
                                    direction != 'ArrowRight' && setDirection(key.code)
                                    break;
                                case 'ArrowRight':
                                    direction != 'ArrowLeft' && setDirection(key.code)
                                    break;
                                }
                            }
                            //RANDOM FOOD------------------------------------------------------------------------>
                            function createRandomFood () {
                                const randomEmptySquare = SquaresVacios[Math.floor(Math.random() * SquaresVacios.length)];
                                drawSquare(randomEmptySquare, 'foodSquare');
                            }
                            // PUNTOS DEL USUARIO (PARTIENDO DE 4)
                            function updateScore () {
                                pointBar.innerText = score;
                            }
                            //CREACION DE TABLERO---------------------------------------------------------------->
                            function createBoard  () {
                                boardSquares.forEach( (row, rowIndex) => {
                                    row.forEach( (column, columnndex) => {
                                        const squareValue = `${rowIndex}${columnndex}`;
                                        const squareElement = document.createElement('div');
                                        squareElement.setAttribute('class', 'square emptySquare');
                                        squareElement.setAttribute('id', squareValue);
                                        board.appendChild(squareElement);
                                        SquaresVacios.push(squareValue);
                                    })
                                })
                            }
                            //REGLAS DEL JUEGO------------------------------------------------------------------->     
                            function setGame (){
                                snake = ['00', '01', '02', '03'];
                                score = snake.length;
                                direction = 'ArrowRight';
                                boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(tipoDeCubos.emptySquare));
                                console.log(boardSquares);
                                board.innerHTML = '';
                                SquaresVacios = [];
                                createBoard();
                            }
                            //START GAME---------------------------------------------------------------------------> 
                            function startGame  ()  {
                                setGame();
                                gameOverSign.style.display = 'none';startButton.disabled = true;drawSnake();updateScore();
                                createRandomFood();
                                document.addEventListener('keydown', directionEvent);
                                moveInterval = setInterval( () => moveSnake(), gameSpeed);
                            }
                            $(startButton).on('click',()=>{ 
                                startGame();
                                console.log("se inicia el juego")
                            });
                            return puntos; 
                        });

        //ADIVINADOR---------------------------------------------------------------------------------------------------------------------------------->
         $(adivinador).on(`click`, () =>{
                Father.removeChild(selectorDeJuegos);
                console.log("funciona la condicion para Adivinador")
                const juego = document.createElement("h3");
                Father.appendChild(juego);
                const buttonFinish = document.createElement("button");
                buttonFinish.classList.add("boton");
                Father.appendChild(buttonFinish);
                buttonFinish.innerHTML= "TERMINAR ADIVINADOR"
                //EVENTO TERMINAR----------------------------------------->
                buttonFinish.addEventListener(`click`, () =>{ 
                Father.removeChild(juego);
                Father.removeChild(buttonFinish);
                Father.appendChild(selectorDeJuegos);
                });
                juego.innerHTML=`
                                  En este juego debes Adivinar el numero correcto
                                 elige la dificultad °3° : 
                                 <br>
                                 <p class="seleccion" id="facil">Facil</p>
                                 <br>
                                 <p class="seleccion" id="medio">Medio</p>
                                 <br>
                                 <p  class="seleccion" id="dificil">Dificil</p>
                                 <br>
                                 <p class="seleccion" id="demonio">Demoniaco</p>`;

              //SELECCION DE DIFICULTAD--------------------------------------------->     
              //MODO FACIL--------------------------------------------------------------------------------------------------------------------------------------------->             
              const Facil = document.querySelector(`#facil`);
              Facil.addEventListener(`click`, ()=>{
                  //VARIABLES Y ELEMENTOS PARA EL JUEGO------------------------------------->
                  Father.removeChild(juego);
                  //Father.removeChild(buttonFinish)
                  console.log("modo facil ejecutandose");
                  const adivina50 = document.createElement("h3");
                  Father.appendChild(adivina50);
                  adivina50.innerHTML=`Adivina el numero ingresando alguno que este entre el 0 y el 50`
                  const ingresaElNumero = document.createElement("form");
                  ingresaElNumero.classList.add("formFacil")
                  Father.appendChild(ingresaElNumero);
                  ingresaElNumero.innerHTML= `<input name="NumFacil" class="inputClass inputFacil" type="text" id="inputFacil" placeholder="escriba un numero" required>`
                  const userAnswer = document.getElementById(`inputFacil`);
                  const buttonFacil = document.createElement("div");
                  buttonFacil.classList.add("divBtn")
                  Father.appendChild(buttonFacil);
                  buttonFacil.innerHTML= `<button class="boton botonFacil" id="btnFacil" name="NumFacil" value="cargar">Cargar</button>`
                  const cargaFacil = document.querySelector(`#btnFacil`);
                  const numeroGanador = Math.round(Math.random()*50);
                  console.log(numeroGanador);
                  let fallas = 0            
                  const respuestas = document.createElement("div");
                  respuestas.classList.add("canvas-rtas")
                  Father.appendChild(respuestas);
                  //EJECUCION Y CODIGO DEL JUEGO------------------------------------------->
                  cargaFacil.addEventListener(`click`, ()=>{
                        console.log(`el usuario escribio ${userAnswer.value}`);
                        console.log(typeof (numeroGanador));
                        console.log(userAnswer.value)
                        console.log(userAnswer.value == numeroGanador);
                        //CONDICIONES------------------------------------------------------------------------------------------------------->
                            if (userAnswer.value > numeroGanador){
                                console.log("ingresa uno mas chico!!!");
                                fallas++;
                                respuestas.innerHTML = ``;
                                const textoUserMayor = document.createElement("div");
                                respuestas.appendChild(textoUserMayor);
                                textoUserMayor.classList.add("divInsideDiv");
                                textoUserMayor.innerHTML= `<h3>Intenta con un numero mas chico</h3>`
                        }
                            if(userAnswer.value < numeroGanador){
                                console.log("ingresa uno mas grande!!!")
                                fallas++;
                                respuestas.innerHTML=``;
                                const textoUserMenor = document.createElement("div")
                                respuestas.appendChild(textoUserMenor)
                                textoUserMenor.classList.add("divInsideDiv")
                                textoUserMenor.innerHTML= `<h3>Intenta con un numero mas grande</h3>`
                            }
                           if (userAnswer.value == numeroGanador){
                               respuestas.innerHTML = ``;
                               console.log(`GANASTE puntos: + 5 <br> fallas: ${fallas}`);
                               const textoGanador = document.createElement("div");
                               respuestas.appendChild(textoGanador);
                               textoGanador.classList.add("divInsideDiv");
                               textoGanador.innerHTML= `<h3>BIEN PIBE GANASTE</h3>
                               <p class="pNo">puntos: + 5 <br> fallas: ${fallas}</p>`;
                               function sumadorDePuntos () {
                                puntos = puntos + 5
                                return puntos;
                            }
                            sumadorDePuntos();
                            const footer = document.querySelector(`#puntosDeHoy`)
                            footer.innerHTML=`PUNTOS DE HOY: ${puntos}`
                               const divTerinar = document.createElement("div");
                               divTerinar.classList.add("divTerminar")
                               Father.appendChild(divTerinar);
                               const buttonFinish = document.createElement("button");
                               buttonFinish.classList.add("boton");
                               divTerinar.appendChild(buttonFinish);
                               buttonFinish.innerHTML= "TERMINAR"
                               //EVENTO TERMINAR----------------------------------------->
                               buttonFinish.addEventListener(`click`, () =>{ 
                                Father.removeChild(adivina50);
                                Father.removeChild(ingresaElNumero);
                                Father.removeChild(buttonFacil);
                                Father.removeChild(respuestas);
                                Father.removeChild(divTerinar)
                                Father.appendChild(juego);
                                });
                                return puntos; 
                            }
                            if (fallas == 7){
                                respuestas.innerHTML=``;
                                const textoUserMenor = document.createElement("div")
                                respuestas.appendChild(textoUserMenor)
                                textoUserMenor.classList.add("divInsideDiv")
                                textoUserMenor.innerHTML= `<h3>OJO QUE TE QUEDA UN INTENTO</h3>`
                            }
                            if(fallas==8){
                                console.log(`PERDISTE puntos: + 0 <br> fallas: ${fallas}`);
                                respuestas.innerHTML=``;
                                const textoUserMenor = document.createElement("div")
                                respuestas.appendChild(textoUserMenor)
                                textoUserMenor.classList.add("divInsideDiv")
                                textoUserMenor.innerHTML= `<h3>PERDISTE el numero esa: ${numeroGanador} <br> puntos: + 0 <br> fallas: ${fallas}</h3>`
                                const divTerinar = document.createElement("div");
                                divTerinar.classList.add("divTerminar")
                                Father.appendChild(divTerinar);
                                const buttonFinish = document.createElement("button");
                                buttonFinish.classList.add("boton");
                                divTerinar.appendChild(buttonFinish);
                                buttonFinish.innerHTML= "TERMINAR"
                                //EVENTO TERMINAR----------------------------------------->
                                buttonFinish.addEventListener(`click`, () =>{ 
                                 Father.removeChild(adivina50);
                                 Father.removeChild(ingresaElNumero);
                                 Father.removeChild(buttonFacil);
                                 Father.removeChild(respuestas);
                                 Father.removeChild(divTerinar)
                            
                                 Father.appendChild(juego);
 
                                 })
                           }  
                           return puntos;
                  });
                  return puntos;
              });

              //MODO MEDIO---------------------------------------------------------------------------------------------------------------------------------------------------->
              const Medio = document.querySelector(`#medio`);
              Medio.addEventListener(`click`, ()=>{
                //VARIABLES Y ELEMENTOS PARA EL JUEGO------------------------------------->
                Father.removeChild(juego);
                //Father.removeChild(buttonFinish)
                console.log("modo Medio ejecutandose");
                const adivina150 = document.createElement("h3");
                Father.appendChild(adivina150);
                adivina150.innerHTML=`Adivina el numero ingresando alguno que este entre el 0 y el 150`
                const ingresaElNumero = document.createElement("form");
                ingresaElNumero.classList.add("formFacil")
                Father.appendChild(ingresaElNumero);
                ingresaElNumero.innerHTML= `<input name="NumMedio" class="inputClass inputFacil" type="text" id="inputMedio" placeholder="escriba un numero" required>`
                const userAnswer = document.getElementById(`inputMedio`);
                const buttonMedio = document.createElement("div");
                buttonMedio.classList.add("divBtn")
                Father.appendChild(buttonMedio);
                buttonMedio.innerHTML= `<button class="boton" id="btnMedio" name="NumMedio" value="cargar">Cargar</button>`
                const cargaMedio = document.querySelector(`#btnMedio`);
                const numeroGanador = Math.round(Math.random()*150);
                console.log(numeroGanador);
                let fallas = 0
                const respuestas = document.createElement("div");
                respuestas.classList.add("canvas-rtas")
                Father.appendChild(respuestas);

                //EJECUCION Y CODIGO DEL JUEGO------------------------------------------->
                cargaMedio.addEventListener(`click`, ()=>{
                      console.log(`el usuario escribio ${userAnswer.value}`);
                      console.log(typeof (numeroGanador));
                      console.log(userAnswer.value)
                      console.log(userAnswer.value == numeroGanador);
                      //CONDICIONES------------------------------------------------------------------------------------------------------->
                          if (userAnswer.value > numeroGanador){
                              console.log("ingresa uno mas chico!!!");
                              fallas++;
                              respuestas.innerHTML = ``;
                              const textoUserMayor = document.createElement("div");
                              respuestas.appendChild(textoUserMayor);
                              textoUserMayor.classList.add("divInsideDiv");
                              textoUserMayor.innerHTML= `<h3>Intenta con un numero mas chico</h3>`
                      }
                          if(userAnswer.value < numeroGanador){
                              console.log("ingresa uno mas grande!!!")
                              fallas++;
                              respuestas.innerHTML=``;
                              const textoUserMenor = document.createElement("div")
                              respuestas.appendChild(textoUserMenor)
                              textoUserMenor.classList.add("divInsideDiv")
                              textoUserMenor.innerHTML= `<h3>Intenta con un numero mas grande</h3>`
                          }
                         if (userAnswer.value == numeroGanador){
                            respuestas.innerHTML = ``;
                            console.log(`GANASTE puntos: + 5 <br> fallas: ${fallas}`);
                            const textoGanador = document.createElement("div");
                            respuestas.appendChild(textoGanador);
                            textoGanador.classList.add("divInsideDiv");
                            textoGanador.innerHTML= `<h3>BIEN PIBE GANASTE</h3>
                            <p class="pNo">puntos: + 15 <br> fallas: ${fallas}</p>`;
                            function sumadorDePuntos () {
                             puntos = puntos + 15
                             return puntos;
                         }
                         sumadorDePuntos();
                         const footer = document.querySelector(`#puntosDeHoy`)
                         footer.innerHTML=`PUNTOS DE HOY: ${puntos}`
                             const divTerinar = document.createElement("div");
                             divTerinar.classList.add("divTerminar")
                             Father.appendChild(divTerinar);
                             const buttonFinish = document.createElement("button");
                             buttonFinish.classList.add("boton");
                             divTerinar.appendChild(buttonFinish);
                             buttonFinish.innerHTML= "TERMINAR"
                             //EVENTO TERMINAR----------------------------------------->
                             buttonFinish.addEventListener(`click`, () =>{ 
                              Father.removeChild(adivina150);
                              Father.removeChild(ingresaElNumero);
                              Father.removeChild(buttonMedio);
                              Father.removeChild(respuestas);
                              Father.removeChild(divTerinar)
                        
                              Father.appendChild(juego);

                              })
                              return puntos;
                              //FIN DE EVENTO LOOP--------------------------------->
                          }
                          if (fallas == 7){
                              respuestas.innerHTML=``;
                              const textoUserMenor = document.createElement("div")
                              respuestas.appendChild(textoUserMenor)
                              textoUserMenor.classList.add("divInsideDiv")
                              textoUserMenor.innerHTML= `<h3>OJO QUE TE QUEDA UN INTENTO</h3>`
                          }
                          if(fallas==8){
                              console.log(`PERDISTE puntos: + 0 <br> fallas: ${fallas}`);
                              respuestas.innerHTML=``;
                              const textoUserMenor = document.createElement("div")
                              respuestas.appendChild(textoUserMenor)
                              textoUserMenor.classList.add("divInsideDiv")
                              textoUserMenor.innerHTML= `<h3>PERDISTE el numero esa: ${numeroGanador} <br> puntos: + 0 <br> fallas: ${fallas}</h3>`
                              const divTerinar = document.createElement("div");
                              divTerinar.classList.add("divTerminar")
                              Father.appendChild(divTerinar);
                              const buttonFinish = document.createElement("button");
                              buttonFinish.classList.add("boton");
                              divTerinar.appendChild(buttonFinish);
                              buttonFinish.innerHTML= "TERMINAR"
                              //EVENTO TERMINAR----------------------------------------->
                              buttonFinish.addEventListener(`click`, () =>{ 
                               Father.removeChild(adivina150);
                               Father.removeChild(ingresaElNumero);
                               Father.removeChild(buttonMedio);
                               Father.removeChild(respuestas);
                               Father.removeChild(divTerinar)
                        
                               Father.appendChild(juego);

                               })
                          }
                          return puntos;

                });
                return puntos;
            });
              //MODO DIFICIL ---------------------------------------------------------------------------------------------------------------------------------------------->

              const Dificil = document.querySelector(`#dificil`);
              Dificil.addEventListener(`click`, ()=>{

                //VARIABLES Y ELEMENTOS PARA EL JUEGO------------------------------------->

                Father.removeChild(juego);
                //Father.removeChild(buttonFinish)
                console.log("modo Dificil ejecutandose");
                const adivina200 = document.createElement("h3");
                Father.appendChild(adivina200);
                adivina200.innerHTML=`Adivina el numero ingresando alguno que este entre el 0 y el 200`
                const ingresaElNumero = document.createElement("form");
                ingresaElNumero.classList.add("formFacil")
                Father.appendChild(ingresaElNumero);
                ingresaElNumero.innerHTML= `<input name="NumDificil" class="inputClass inputFacil" type="text" id="inputDificil" placeholder="escriba un numero" required>`
                const userAnswer = document.getElementById(`inputDificil`);
                const buttonDificil = document.createElement("div");
                buttonDificil.classList.add("divBtn")
                Father.appendChild(buttonDificil);
                buttonDificil.innerHTML= `<button class="boton" id="btnDificil" name="NumDificil" value="cargar">Cargar</button>`
                const cargaDificil = document.querySelector(`#btnDificil`);
                const numeroGanador = Math.round(Math.random()*200);
                console.log(numeroGanador);
                let fallas = 0
                const respuestas = document.createElement("div");
                respuestas.classList.add("canvas-rtas")
                Father.appendChild(respuestas);
                //EJECUCION Y CODIGO DEL JUEGO------------------------------------------->
                cargaDificil.addEventListener(`click`, ()=>{
                      console.log(`el usuario escribio ${userAnswer.value}`);
                      console.log(typeof (numeroGanador));
                      console.log(userAnswer.value)
                      console.log(userAnswer.value == numeroGanador);
                      //CONDICIONES------------------------------------------------------------------------------------------------------->
                          if (userAnswer.value > numeroGanador){
                              console.log("ingresa uno mas chico!!!");
                              fallas++;
                              respuestas.innerHTML = ``;
                              const textoUserMayor = document.createElement("div");
                              respuestas.appendChild(textoUserMayor);
                              textoUserMayor.classList.add("divInsideDiv");
                              textoUserMayor.innerHTML= `<h3>Intenta con un numero mas chico</h3>`
                      }
                          if(userAnswer.value < numeroGanador){
                              console.log("ingresa uno mas grande!!!")
                              fallas++;
                              respuestas.innerHTML=``;
                              const textoUserMenor = document.createElement("div")
                              respuestas.appendChild(textoUserMenor)
                              textoUserMenor.classList.add("divInsideDiv")
                              textoUserMenor.innerHTML= `<h3>Intenta con un numero mas grande</h3>`
                          }
                         if (userAnswer.value == numeroGanador){
                            respuestas.innerHTML = ``;
                            console.log(`GANASTE puntos: + 5 <br> fallas: ${fallas}`);
                            const textoGanador = document.createElement("div");
                            respuestas.appendChild(textoGanador);
                            textoGanador.classList.add("divInsideDiv");
                            textoGanador.innerHTML= `<h3>BIEN PIBE GANASTE</h3>
                            <p class="pNo">puntos: + 20 <br> fallas: ${fallas}</p>`;
                            function sumadorDePuntos () {
                             puntos = puntos + 20
                             return puntos;
                         }
                         sumadorDePuntos();
                         const footer = document.querySelector(`#puntosDeHoy`)
                         footer.innerHTML=`PUNTOS DE HOY: ${puntos}`
                             const divTerinar = document.createElement("div");
                             divTerinar.classList.add("divTerminar")
                             Father.appendChild(divTerinar);
                             const buttonFinish = document.createElement("button");
                             buttonFinish.classList.add("boton");
                             divTerinar.appendChild(buttonFinish);
                             buttonFinish.innerHTML= "TERMINAR"
                             //EVENTO TERMINAR----------------------------------------->
                             buttonFinish.addEventListener(`click`, () =>{ 
                              Father.removeChild(adivina200);
                              Father.removeChild(ingresaElNumero);
                              Father.removeChild(buttonDificil);
                              Father.removeChild(respuestas);
                              Father.removeChild(divTerinar)
                        
                              Father.appendChild(juego);

                              })
                              return puntos;
                          }
                          if (fallas == 7){
                              respuestas.innerHTML=``;
                              const textoUserMenor = document.createElement("div")
                              respuestas.appendChild(textoUserMenor)
                              textoUserMenor.classList.add("divInsideDiv")
                              textoUserMenor.innerHTML= `<h3>OJO QUE TE QUEDA UN INTENTO</h3>`
                          }
                          if(fallas==8){
                              console.log(`PERDISTE puntos: + 0 <br> fallas: ${fallas}`);
                              respuestas.innerHTML=``;
                              const textoUserMenor = document.createElement("div")
                              respuestas.appendChild(textoUserMenor)
                              textoUserMenor.classList.add("divInsideDiv")
                              textoUserMenor.innerHTML= `<h3>PERDISTE el numero esa: ${numeroGanador} <br> puntos: + 0 <br> fallas: ${fallas}</h3>`
                              const divTerinar = document.createElement("div");
                              divTerinar.classList.add("divTerminar")
                              Father.appendChild(divTerinar);
                              const buttonFinish = document.createElement("button");
                              buttonFinish.classList.add("boton");
                              divTerinar.appendChild(buttonFinish);
                              buttonFinish.innerHTML= "TERMINAR"
                              //EVENTO TERMINAR----------------------------------------->
                              buttonFinish.addEventListener(`click`, () =>{ 
                               Father.removeChild(adivina200);
                               Father.removeChild(ingresaElNumero);
                               Father.removeChild(buttonDificil);
                               Father.removeChild(respuestas);
                               Father.removeChild(divTerinar)
                        
                               Father.appendChild(juego);

                               })
                          }
                          return puntos;
                });
                return  puntos; 
            });
              //MODO DEMIONIO-------------------------------------------------------------------------------------------------------------------------------------------------------->
              const Demoniaco = document.querySelector(`#demonio`);
              Demoniaco.addEventListener(`click`, ()=>{
                //VARIABLES Y ELEMENTOS PARA EL JUEGO------------------------------------->
                Father.removeChild(juego);
                //Father.removeChild(buttonFinish)
                console.log("modo Demoniaco ejecutandose");
                const adivina1000 = document.createElement("h3");
                Father.appendChild(adivina1000);
                adivina1000.innerHTML=`Adivina el numero ingresando alguno que este entre el 0 y el 1000`
                const ingresaElNumero = document.createElement("form");
                ingresaElNumero.classList.add("formFacil")
                Father.appendChild(ingresaElNumero);
                ingresaElNumero.innerHTML= `<input name="NumDemoniaco" class="inputClass inputFacil" type="text" id="inputDemoniaco" placeholder="escriba un numero" required>`
                const userAnswer = document.getElementById(`inputDemoniaco`);
                const buttonDemoniaco = document.createElement("div");
                buttonDemoniaco.classList.add("divBtn")
                Father.appendChild(buttonDemoniaco);
                buttonDemoniaco.innerHTML= `<button class="boton" id="btnDemoniaco" name="NumDemoniaco" value="cargar">Cargar</button>`
                const cargaDemoniaco = document.querySelector(`#btnDemoniaco`);
                const numeroGanador = Math.round(Math.random()*1000);
                console.log(numeroGanador);
                let fallas = 0
                const respuestas = document.createElement("div");
                respuestas.classList.add("canvas-rtas")
                Father.appendChild(respuestas);
                //EJECUCION Y CODIGO DEL JUEGO------------------------------------------->
                cargaDemoniaco.addEventListener(`click`, ()=>{
                      console.log(`el usuario escribio ${userAnswer.value}`);
                      console.log(typeof (numeroGanador));
                      console.log(userAnswer.value)
                      console.log(userAnswer.value == numeroGanador);
                      //CONDICIONES------------------------------------------------------------------------------------------------------->
                          if (userAnswer.value > numeroGanador){
                              console.log("ingresa uno mas chico!!!");
                              fallas++;
                              respuestas.innerHTML = ``;
                              const textoUserMayor = document.createElement("div");
                              respuestas.appendChild(textoUserMayor);
                              textoUserMayor.classList.add("divInsideDiv");
                              textoUserMayor.innerHTML= `<h3>Intenta con un numero mas chico</h3>`
                      }
                          if(userAnswer.value < numeroGanador){
                              console.log("ingresa uno mas grande!!!")
                              fallas++;
                              respuestas.innerHTML=``;
                              const textoUserMenor = document.createElement("div")
                              respuestas.appendChild(textoUserMenor)
                              textoUserMenor.classList.add("divInsideDiv")
                              textoUserMenor.innerHTML= `<h3>Intenta con un numero mas grande</h3>`
                          }
                         if (userAnswer.value == numeroGanador){
                            respuestas.innerHTML = ``;
                            console.log(`GANASTE puntos: + 5 <br> fallas: ${fallas}`);
                            const textoGanador = document.createElement("div");
                            respuestas.appendChild(textoGanador);
                            textoGanador.classList.add("divInsideDiv");
                            textoGanador.innerHTML= `<h3>BIEN PIBE GANASTE</h3>
                            <p class="pNo">puntos: + 100 <br> fallas: ${fallas}</p>`;
                            function sumadorDePuntos () {
                             puntos = puntos + 100
                             return puntos;
                         }
                         sumadorDePuntos();
                         const footer = document.querySelector(`#puntosDeHoy`)
                         footer.innerHTML=`PUNTOS DE HOY: ${puntos}`
                             const divTerinar = document.createElement("div");
                             divTerinar.classList.add("divTerminar")
                             Father.appendChild(divTerinar);
                             const buttonFinish = document.createElement("button");
                             buttonFinish.classList.add("boton");
                             divTerinar.appendChild(buttonFinish);
                             buttonFinish.innerHTML= "TERMINAR"
                             //EVENTO TERMINAR----------------------------------------->
                             buttonFinish.addEventListener(`click`, () =>{ 
                              Father.removeChild(adivina1000);
                              Father.removeChild(ingresaElNumero);
                              Father.removeChild(buttonDemoniaco);
                              Father.removeChild(respuestas);
                              Father.removeChild(divTerinar)
                        
                              Father.appendChild(juego);

                              })
                              return puntos;
                          }
                          if (fallas == 7){
                              respuestas.innerHTML=``;
                              const textoUserMenor = document.createElement("div")
                              respuestas.appendChild(textoUserMenor)
                              textoUserMenor.classList.add("divInsideDiv")
                              textoUserMenor.innerHTML= `<h3>OJO QUE TE QUEDA UN INTENTO</h3>`
                          }
                          if(fallas==8){
                              console.log(`PERDISTE puntos: + 0 <br> fallas: ${fallas}`);
                              respuestas.innerHTML=``;
                              const textoUserMenor = document.createElement("div")
                              respuestas.appendChild(textoUserMenor)
                              textoUserMenor.classList.add("divInsideDiv")
                              textoUserMenor.innerHTML= `<h3>PERDISTE el numero esa: ${numeroGanador} <br> puntos: + 0 <br> fallas: ${fallas}</h3>`
                              const divTerinar = document.createElement("div");
                              divTerinar.classList.add("divTerminar")
                              Father.appendChild(divTerinar);
                              const buttonFinish = document.createElement("button");
                              buttonFinish.classList.add("boton");
                              divTerinar.appendChild(buttonFinish);
                              buttonFinish.innerHTML= "TERMINAR"
                              //EVENTO TERMINAR----------------------------------------->
                              buttonFinish.addEventListener(`click`, () =>{ 
                               Father.removeChild(adivina1000);
                               Father.removeChild(ingresaElNumero);
                               Father.removeChild(buttonDemoniaco);
                               Father.removeChild(respuestas);
                               Father.removeChild(divTerinar)
                        
                               Father.appendChild(juego);

                               })
                          }
                          return puntos;
                });
                return puntos;
            });
            return puntos;
        })
        return puntos;
    });
    sessionStorage.setItem(`puntosDelJugador`, puntos)
        //NO---------------------------------------------------------------------------------------------------------------------------------->
       juegoNo.addEventListener(`click`, () => {
            console.log("funciona condicion para no");
            Father.removeChild(start);
            const juego = document.createElement("h3");
            Father.appendChild(juego);
            juego.innerHTML=`<h4>ooouuh bueno...</h4>
            <p class="pNo" id="volverCargar">volver a cargar la pagina</p>`;
            const volverCargar = document.querySelector(`#volverCargar`);
            volverCargar.addEventListener(`click`, ()=>{
                location.reload();
            })
        })
 }while(eventButton == true)
});
