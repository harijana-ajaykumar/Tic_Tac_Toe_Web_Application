const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;

let board = ["","","","","","","","",""];

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

function handleClick() {
    const index = this.dataset.index;

    if(board[index] !== "" || !gameActive){
        return;
    }

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    
    if(gameActive){
        statusText.textContent = `Player ${currentPlayer} Turn`;
    }
}

function checkWinner(){
    for(let pattern of winPatterns){

        let a = board[pattern[0]];
        let b = board[pattern[1]];
        let c = board[pattern[2]];

        if(a && a === b && b === c){
            statusText.textContent = `Player ${a} Wins!`;
            gameActive = false;
            return;
        }
    }

    if(!board.includes("")){
        statusText.textContent = "Match Draw!";
        gameActive = false;
    }
}

function restartGame(){
    board = ["","","","","","","","",""];
    gameActive = true;
    currentPlayer = "X";

    cells.forEach(cell => {
        cell.textContent = "";
    });

    statusText.textContent = "Player X Turn";
}