/**
 * objectives:
 * 1. configure palyers name via edit button
 * 2. init a new board with the start new game button
 * 3.
 * 
 * */
let playerEdited = 0;
let playerTurn = 0;
let currentRount = 1
let gameOver = false;
const players = [
    {
        name: '',
        symbol: 'X'
    },
    {
        name: '',
        symbol: 'O'
    }
];

const gameState = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
];
// for overlay display
const modalElement = document.getElementById('config-overlay');
const backdropElement = document.getElementById('backdrop');


// for name edit btns
const editPlayer1Btn = document.querySelector('#edit-player1-btn');
const editPlayer2Btn = document.querySelector('#edit-player2-btn');
// for confirming/canceling the name:
const cancelBtn = document.querySelector('#cancel-btn');
const confirmBtn = document.querySelector('#confirm-btn');
// start new game btn:
const startNewGameBtn = document.querySelector('#start-new-game')
// for table cells items :
const gameBoardCells = document.querySelectorAll('#game-board li')


// for selecting the form of the player name
const nameForm = document.querySelector('#player-name-form');

// for error massage in config
const errorParaElement = document.querySelector('#config-errors');
// for resetting the name after confirmation :
const nameInputElement = document.querySelector('#playerName');

// the game board
const gameBoardElement = document.querySelector('#active-game')

const activePlayersName = document.querySelector('#active-player-name')
const endGameElement = document.querySelector('#game-over')

// event listeners
editPlayer1Btn.addEventListener('click',openModal);
editPlayer2Btn.addEventListener('click',openModal);
cancelBtn.addEventListener('click', closeModal);
backdropElement.addEventListener('click', closeModal);
nameForm.addEventListener('submit', savePlayerName);
startNewGameBtn.addEventListener('click',startNewGame)

for( const cell of gameBoardCells){
    cell.addEventListener('click', playersMove)
}
