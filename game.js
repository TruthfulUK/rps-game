const pScoreField = document.querySelector('.playerscore');
const cScoreField = document.querySelector('.computerscore');
const gameLog = document.querySelector('.gamelog')
const buttons = document.querySelectorAll('button');
const textLog = document.createElement('div');

let pScore = 0;
let cScore = 0;

textLog.classList.add('text');

buttons.forEach(button => {
    button.addEventListener('click', e => {
        button.classList.toggle('selected');
        game(button.dataset.choice, button);
    })
})

function computerPlay() {
    const options = ['rock','paper','scissors'];
    return options[Math.floor(Math.random()*3)]
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

    buttons.forEach(button => {
        button.disabled = true;
    })

    switch(playRound(playerSelection)) {
        case "Player":
            pScore +=1;
            pScoreField.textContent = `Player: ${pScore}`;
            textLog.innerHTML += `<div class="playerscore">Player Wins!</div>`
            break;
        case "Computer":
            cScore +=1;
            cScoreField.textContent = `Computer: ${cScore}`;
            textLog.innerHTML += `<div class="computerscore">Computer Wins!<div>`
            break;
        case "Draw":
            textLog.innerHTML += `<div class="draw">ROUND DRAW</div>`;
            break;
        default:
            console.error(`Something went wrong`);
    }

    gameLog.appendChild(textLog);
    
    setTimeout(() => {
        button.classList.toggle('selected');
        gameLog.removeChild(textLog);
        buttons.forEach(button => {
            button.disabled = false;
        })
    }, 1500)
    
}