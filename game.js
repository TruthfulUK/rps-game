const pScoreField = document.querySelector('.playerscore');
const cScoreField = document.querySelector('.computerscore');
const roundField = document.querySelector('.roundcount');
const gameLog = document.querySelector('.gamelog')
const buttons = document.querySelectorAll('button.choice');
const textLog = document.createElement('div');
const replay = document.querySelector('#replay');
const gameover = document.querySelector('.gameover');

let pScore = 0,
    cScore = 0,
    rounds = 1;

function init() {
    textLog.classList.add('text');
    gameover.classList.add('hide');

    buttons.forEach(button => {
        button.addEventListener('click', e => {
            button.classList.toggle('selected');
            game(button.dataset.choice, button);
        })
    })

    replay.addEventListener('click', () => {
        gameover.classList.add('hide');
        resetGame(null, true, 100);
    })

    writePscore(pScore);
    writeCscore(cScore);
    writeRound(rounds);
}

function writePscore(num) {
    pScoreField.textContent = `Player: ${num}`;
}

function writeCscore(num) {
    cScoreField.textContent = `Computer: ${num}`;
}

function writeRound(num) {
    roundField.textContent = `Round: ${num}`;
}


function computerPlay() {
    const options = ['rock','paper','scissors'];
    return options[Math.floor(Math.random()*3)]
}

function disableInput(bool) {
    buttons.forEach(button => {
        button.disabled = bool;
    })
}

function resetGame(button, bool = false, ms) {
    setTimeout(() => {
        if (button) {
            button.classList.toggle('selected');
        } else {
            buttons.forEach(button => {
                button.classList.remove('selected');
            })
        }
        if (bool) {
            pScore = 0; 
            cScore = 0; 
            rounds = 1;
            writePscore(pScore);
            writeCscore(cScore);
            writeRound(rounds);
        }
        gameLog.removeChild(textLog);
        disableInput(false);
    }, ms);
}

function playRound(playerSelection) {
    const computerSelection = computerPlay();
    const state = ['Draw','Player','Computer']
    let result;

    switch(true) {
        case computerSelection === playerSelection:
            result = state[0];
            break;
        case playerSelection === 'rock' && computerSelection === 'scissors':
        case playerSelection === 'paper' && computerSelection === 'rock':
        case playerSelection === 'scissors' && computerSelection === 'paper':
            result = state[1];
            break;
        case computerSelection === 'rock' && playerSelection === 'scissors':
        case computerSelection === 'paper' && playerSelection === 'rock':
        case computerSelection === 'scissors' && playerSelection === 'paper':
            result = state[2];
            break;
        default:
            result = null;
    }

    textLog.innerHTML = `Computer has chosen ${computerSelection} <div class="compselect"><img class="embed" src="img/${computerSelection}.png"></div> `
    return result;
}

function game(playerSelection, button) {

    disableInput(true);

    switch(playRound(playerSelection)) {
        case "Player":
            pScore +=1;
            rounds +=1;
            writePscore(pScore);
            writeRound(rounds);
            textLog.innerHTML += `<div class="playerscore">Player Wins!</div>`
            break;
        case "Computer":
            cScore +=1;
            rounds +=1;
            writeCscore(cScore);
            writeRound(rounds);
            textLog.innerHTML += `<div class="computerscore">Computer Wins!<div>`
            break;
        case "Draw":
            rounds += 1;
            writeRound(rounds);
            textLog.innerHTML += `<div class="draw">ROUND DRAW</div>`;
            break;
        default:
            console.error(`Something went wrong`);
    }

    gameLog.appendChild(textLog);

    if (pScore >= 5 || cScore >= 5) {
        replay.textContent = `Click to play again.`
        gameover.classList.remove('hide');
    } else {
        resetGame(button, false, 1500);
    }
    
}

init();