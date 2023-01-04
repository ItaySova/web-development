function openModal(event){
    playerEdited = +event.target.dataset.playerid;
    modalElement.style.display = 'block';
    backdropElement.style.display = 'block';
}

function closeModal (){
    modalElement.style.display = 'none';
    backdropElement.style.display = 'none';
    nameForm.firstElementChild.classList.remove('error');
    errorParaElement.textContent = '';
    nameInputElement.value = '';
}

function savePlayerName (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    // pass input name to the get method
    const enteredData = formData.get('playerName').trim();
    // check for validity
    if (!enteredData){
        event.target.firstElementChild.classList.add('error');
        errorParaElement.textContent = 'please enter valid name';
        return;
    }
    const updatedPlayerDataElement = document.getElementById('player-' + playerEdited + '-data');
    updatedPlayerDataElement.children[1].textContent = enteredData;

    // storing the player data for later
    players[playerEdited-1].name = enteredData;
    closeModal();
}