let computerScore = 0;
let humanScore = 0;
let round = 1;
let selectedChoice = null;
const weapon = document.querySelector(".weapon");
let declaration = 1;
let computerGuess;

showScores();
function blurChoice(choice){
 
        choice.dataset.clickCount = 0;

        choice.addEventListener("click", function () {
            this.dataset.clickCount = Number(this.dataset.clickCount) +1;

            if(this.dataset.clickCount == 2){
                this.blur();
                this.dataset.clickCount = 0;
                weapon.textContent = "Choose your weapon";
            }
        })
    
}

function setChoice(choiceElement){
    selectedChoice = choiceElement;
}
function getChoice(){
    let delimeter = "-";
    if(selectedChoice === null){
        return null;
    }
    let parts = selectedChoice.id.split(delimeter);
    return parts[0];
}   

function showScores(){
    document.querySelector("#human-score-desc").textContent = "Human Score: " + humanScore;
    document.querySelector("#computer-score-desc").textContent = "Computer Score: " + computerScore;
}


function makeChoice(){
    const choices = document.querySelectorAll(".rps"); 
    for(let i = 0; i < choices.length; i++){
        const choice = choices[i];
        choice.addEventListener("click", function() {
            setChoice(choice);
            // for debugging
            console.log(getChoice());   

            switch(getChoice()){
                case "rock":
                    weapon.textContent = "Your Weapon is: Rock";
                    break;
                case "paper":
                    weapon.textContent = "Your Weapon is: Paper" ;
                    break;
                case "scissor":
                    weapon.textContent = "Your Weapon is: Scissor";
            } 
        });
        blurChoice(choice);
    }
}

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




function playARound(){
    console.log("Round: " + round);
    computerGuess = getComputerChoice();
    let humanGuess = getChoice();
    if(humanGuess!=null){     
    console.log(humanGuess);
    console.log("Computer Guess: " +computerGuess);
    console.log("Human Guess: " + humanGuess);
    chooseWinner(humanGuess, computerGuess);
    round++;
    } else {
        console.log("make a guess first");
    }
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
            declaration = 1;
        }else if (winner === "Computer"){
            console.log("Computer wins!");
            computerScore+=1;
            declaration = 2;
        } else if (winner === "Tie"){
            console.log("Tie!");
            declaration = 3;
        }
}



const startBtn = document.querySelector(".start-game-btn");
function startGame(){
    startBtn.addEventListener("click", function(){
        playARound();
        hideElements();
        addRPSAnimation(true);
        const resultDiv = document.createElement("div");

        setTimeout(() => {
            document.querySelector(".bg-img").src = "none";
            const contentDiv = document.querySelector(".content");  
            resultDiv.classList.add("result-div");

            const computerPickHeading = document.createElement("h2");
            computerPickHeading.classList.add("computer-pick");
            computerPickHeading.textContent = "Computer chose " + computerGuess;
            const winnerDeclarationHeading = document.createElement("h2");
            winnerDeclarationHeading.classList.add("winner-declaration");
            if(declaration === 1){
                winnerDeclarationHeading.textContent = "You Win!";
            } else if(declaration === 2){
                winnerDeclarationHeading.textContent = "You Lose!";
            } else if (declaration === 3){
                winnerDeclarationHeading.textContent = "Tie!";
            }
            contentDiv.appendChild(resultDiv);
            resultDiv.appendChild(computerPickHeading);
            resultDiv.appendChild(winnerDeclarationHeading);
            addRPSAnimation(false);

        }, 7000);
        
        setTimeout(() => {
            resultDiv.style.display = "none";
            showScores();
            showElements()
        }, 9000)
       

    })
}

function showElements(){
        const content = document.querySelector(".content");
        document.querySelector(".ask-input-span").style.display = "flex";
        document.querySelector(".rps-button-container").style.display = "flex";
        document.querySelector(".start-game").style.display = "flex";

        document.querySelector(".bg-img").src = "resources/b434c12446b1ca7bd5e20fdcf0886954.gif";
}
function hideElements(){
    
        const content = document.querySelector(".content");
        document.querySelector(".ask-input-span").style.display = "none";
        document.querySelector(".rps-button-container").style.display = "none";
        document.querySelector(".start-game").style.display = "none";

        document.querySelector(".bg-img").src = "none";

}
function addRPSAnimation(boolean){
    const content = document.querySelector(".content");
    if(boolean){
        content.style.backgroundImage = "url('resources/rps-animation.gif')";
        content.style.backgroundRepeat = "no-repeat";
        content.style.backgroundSize = "cover";
        content.style.backgroundPosition = "center";
    } else {
        content.style.backgroundImage = "none";
    }
}


makeChoice();
startGame();

