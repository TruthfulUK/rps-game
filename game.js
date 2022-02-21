function computerPlay() {
    const options = ['rock','paper','scissors'];
    return options[Math.floor(Math.random()*3)]
}

function playRound() {
    const playerSelection = prompt("Type in your selection: rock, paper or scissors.").toLowerCase();
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

    console.log(`
    > Computer has chosen ${computerSelection}. 
    > Player has chosen ${playerSelection}.`);
    return result;
}

function game() {
    let rounds = 5;
    let pScore = 0;
    let cScore = 0;

    for (let r = 0; r < rounds; r++) {

        switch(playRound()) {
            case "Player":
                pScore +=1;
                console.log(`Player won round ${r + 1}`);
                break;
            case "Computer":
                cScore +=1;
                console.log(`Computer won round ${r + 1}`);
                break;
            case "Draw":
                console.log(`Round ${r + 1} was a draw!`)
                break;
            default:
                console.error(`Something went wrong on Round ${r + 1}`);
        }
    }

    if (pScore > cScore) console.log(`Player has won with a score of ${pScore} vs Computer with a score of ${cScore}.`);

    else if (cScore > pScore) console.log(`Computer has won with a score of ${cScore} vs Player with a score of ${pScore}.`);
    
    else console.log(`It's a draw! Player won ${pScore} game(s) & Computer won ${cScore} game(s).`);

}

game();