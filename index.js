/*
    Indices:
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
*/

const winningConditions = [
    [0, 1 , 2],
    [3, 4 , 5],
    [6, 7 , 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4 , 6]
]

const GAME_CASES = {
    PLAYER_X_WON: 'PLAYER_X_WON',
    PLAYER_0_WON: 'PLAYER_0_WON',
    TIE: 'TIE'
}

const PLAYERS = {
    X: "X",
    O: "O"
}

const createEmptyBoard = () => { 
    return new Array(9).fill(""); // ["","","","","","","","","",""]
}

let board = createEmptyBoard();
let currentPlayer = PLAYERS.X;
let isGameActive = true;
let announcer; // variable para manipular los anuncions (gano x, gano y)
let playerTurn; // variable para manipualr el turno del jugador
let tiles; // cuadraditos :P 

/*
    DOMContentLoad se dispara con la consutrcción del DOM
    load: Espera a todos los recursos de la página
*/

// S: SOLID (Single responsability)

const changePlayer = () => {
    currentPlayer = currentPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X;
    playerTurn.innerText = currentPlayer
}

const isTileChecked = (tile) => {
    if(tile.innerText === "") return false
    return true
}

const updateBoard = (idx) => {
    board[idx] = currentPlayer;
    console.log('board', board)
}

const announce = (type) => {
    switch(type){
        case GAME_CASES.PLAYER_X_WON:
            announcer.innerHTML = 'Player X WON'
            return;
        case GAME_CASES.PLAYER_0_WON:
            announcer.innerHTML = 'Player 0 Won'
            return
        case GAME_CASES.TIE:
            announcer.innerHTML = 'Empate'
        case EMPTY:
            announcer.innerHTML = '';
            return;
        default:
            throw new Error('not valid action')
    }
}

const verifyWinningCondition = () => {
    let roundWon = false;
    for(let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i]; 
        // [3, 4 , 5],
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if(a === "" && b === "" && c === "") return;
        if(a === b && b === c) {
            roundWon = true
        }

        if(roundWon) {
            console.log("Gano", currentPlayer)
            announce(currentPlayer === PLAYERS.X ? GAME_CASES.PLAYER_X_WON : GAME_CASES.PLAYER_0_WON)
            isGameActive = false
       
        }

        if(!board.includes("")) {
            announce(GAME_CASES.TIE)
            isGameActive = false
        }
    }
}

const resetTiles = () => tiles.forEach((tile) => tile.innerText = "")

const resetBoard = () => {
    board = createEmptyBoard();
    isGameActive = true;
    announce("EMPTY");
    resetTiles();
}

const initializeGame = () => {
    tiles = Array.from(document.querySelectorAll('.tile'));
    playerTurn = document.querySelector(".player-turn");
    announcer = document.querySelector(".announcer");
    const resetButton = document.querySelector("#reset");

    const onUserAction = (tile,idx) => {
        // chequear si la accion es valida && si el juego está activo
        if(isTileChecked(tile) && isGameActive) {
            alert("Salí de acá, trampos@")
            return;
        }
        
        tile.innerText = currentPlayer;
        // cambiar de jugador
        updateBoard(idx)
        verifyWinningCondition();
        changePlayer();
    }

    tiles.forEach((tile,idx) => {
        tile.addEventListener("click", () => onUserAction(tile,idx));
    })

    resetButton.addEventListener('click', resetBoard)

}

window.addEventListener('DOMContentLoaded', initializeGame);