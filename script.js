const boxes =document.querySelectorAll(".box");
// .box is id
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


// define variables
let currentPlayer ;
let gameGrid;

const winingPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// function to initialize the game
function initGame(){
    currentPlayer = 'X';
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    //UI pr bhi empty krna h new game btn ke liye
    boxes.forEach((box, index) => {
        // each box is empty
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    });
    
    // UI render
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player- ${currentPlayer}`;
}
initGame();

// swap the turn
function swapTurn() {
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }else{
        currentPlayer ="X";
    }
    // UI update
    gameInfo.innerText = `Current Player- ${currentPlayer}` ;
}

// this function checks the game is over or not
function checkGameOver() {
    let answer = "";
    winingPositions.forEach((positions) => {
        //all 3 boxes should be non-empty and exactly same in value
        if((gameGrid[positions[0]] !== "" || gameGrid[positions[1]] !== "" || gameGrid[positions[2]]) !== "" &&
        (gameGrid[positions[0]] === gameGrid[positions[1]] ) && (gameGrid[positions[1]] === gameGrid[positions[2]] ) ){
            // check if winner is X
            if(gameGrid[positions[0]] === "X"){
                answer = "X";
            }else{
                answer = "O";
            }

            // disable pointer events
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            });
           
            //now we know X/O is a winner
            boxes[positions[0]].classList.add("win");
            boxes[positions[1]].classList.add("win");
            boxes[positions[2]].classList.add("win");

        }
    });

    // it means we have  a winner
    if(answer !== ""){
        gameInfo.innerText = `Winner is Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) =>{
        if(box !==""){
            fillCount++;
        }
    });

    //board is Filled, game is TIE
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
    }
}


function handleClick(index){
    if(gameGrid[index] === ""){
        // ui update
        boxes[index].innerText = currentPlayer;
        // grid update
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
         //swap karo turn ko
        swapTurn();
         //check koi jeet toh nahi gya
        checkGameOver();
    }
}


//sabhi boxes pe event listener lagao
//ForEach iterates an array for each item, and we are passing index toidentify which box we are taling about

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);