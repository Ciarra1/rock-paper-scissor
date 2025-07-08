let computerScore = 0;
let humanScore = 0;
let round = 0;
function getComputerChoice(){
    let randomValue = Math.floor(Math.random()*99);
    if(randomValue <= 33){
        return "rock";
    } else if (randomValue > 33 && randomValue <= 66){
        return "paper";
    } else {
        return "scissor";
    }
}

    function getHumanChoice(){
        let choice;
        let validChoice = ["rock", "paper", "scissor"];
        while(true){
            choice = prompt("enter rock, paper or scissor");
            choice = choice.toLowerCase();
            if(!choice){
                continue;
            }
            if (validChoice.includes(choice)){
                return choice;
            } else {
                alert("Invalid choice. Please enter Rock, Paper, or Scissor.");
            }
        }
    }



function playARound(){
    console.log("Round: " + round);
    let computerGuess = getComputerChoice();
    let humanGuess = getHumanChoice();
    console.log("Computer Guess: " +computerGuess);
    console.log("Human Guess: " + humanGuess);
    chooseWinner(humanGuess, computerGuess);
    showScores();
    round++;
    
}
function showScores(){
    console.log("Human: " + humanScore);
    console.log("Computer: " + computerScore);
}
function chooseWinner(humanChoice, computerChoice){
        const outcomes = {
            rock: {
                rock: "Tie", paper: "Computer", scissor: "Human"
            }, 
            paper: {
                rock: "Human", paper: "Tie", scissor: "Computer"
            },
            scissor: {
                rock: "Computer", paper: "Human", scissor: "Tie"
            }
        }
        let winner = outcomes[humanChoice][computerChoice];
        if(winner === "Human"){
            console.log("Human wins!");
            humanScore+=1;
        }else if (winner === "Computer"){
            console.log("Computer wins!");
            computerScore+=1;
        } else if (winner === "Tie"){
            console.log("Tie!");
        }
}
for(let i = 0; i < 5; i++){
    playARound();
}
