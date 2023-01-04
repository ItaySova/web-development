function startNewGame() {
    
    if (players[0].name === '' || players[1].name === '') {
        alert('invalid names');
        return;
    }
    resetGameState();
    gameBoardElement.style.display = "block";
    activePlayersName.textContent = players[playerTurn].name;
    currentRount = 1;
}

function playersMove(event) {
    if (gameOver){
        return;
    }
    if (event.target.classList == '') {
        const selectedCell = event.target;
        selectedCell.textContent = players[playerTurn].symbol;
        selectedCell.classList.add('disabled');

        // update game state
        const selectedCol = selectedCell.dataset.col - 1;
        const selectedRow = selectedCell.dataset.row - 1;
        gameState[selectedCol][selectedRow] = playerTurn + 1;
        const winnerId = checkGameState();
        if (winnerId !== 0){
            endGame(winnerId);
        }
        // update turn
        currentRount += 1;
        playerTurn = (playerTurn + 1) % 2;
        activePlayersName.textContent = players[playerTurn].name;
        console.log(gameState);
    } else {
        alert('please select another field')
        return;
    }
}

function checkGameState() {
    // checking rows
    for (let i = 0; i < 3; i++) {
        if (
            gameState[i][0] > 0 &&
            gameState[i][0] === gameState[i][1] &&
            gameState[i][1] === gameState[i][2]
        ) {
            return gameState[i][0];
        }
    }
    // checking coloumns
    for (let i = 0; i < 3; i++) {
        if (
            gameState[0][i] > 0 &&
            gameState[0][i] === gameState[1][i] &&
            gameState[0][i] === gameState[2][i]
        ) {
            return gameState[0][i];
        }
    }
    // 1st diagonal
    if (
        gameState[0][0] > 0 &&
        gameState[0][0] === gameState[1][1] &&
        gameState[1][1] === gameState[2][2]
    ) {
        return gameState[0][0];
    }
    // 2nd diagonal
    if (
        gameState[2][0] > 0 &&
        gameState[2][0] === gameState[1][1] &&
        gameState[1][1] === gameState[0][2]
    ) {
        return gameState[2][0];
    }
    if (currentRount === 9) {
        return -1;
    }
    return 0;
}

function endGame(winnerId) {
    endGameElement.style.display = 'block';
    gameOver = true;
    if (winnerId > 0) {
        const winnerName = players[winnerId - 1].name;
        endGameElement.firstElementChild.firstElementChild.textContent = winnerName;
    } else {
        endGameElement.firstElementChild.textContent = 'It\'s a draw!';
    }
}

function resetGameState(){
    playerTurn = 0;
    currentRount = 1;
    gameOver = false;
    endGameElement.firstElementChild.innerHTML = '<h2>You won <span id="victorious-player">playerName</span>!</h2>';
    endGameElement.style.display = 'none';
    let boardIndex = 0;
    for(let i = 0; i<3; i++){
        for(let j=0; j<3; j++){
            gameState[i][j] = 0;
            gameBoardCells[boardIndex].textContent = ''; // double check
            gameBoardCells[boardIndex].classList.remove('disabled');
            boardIndex ++;
        }
    }
}