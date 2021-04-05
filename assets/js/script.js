const landingPage = document.getElementById('landing-page');
const footerEl = document.getElementById('footer');
const highScoreButton = document.getElementById('high-score-btn');
const startGameButton = document.getElementById('start-game-btn');
const questionContainer = document.querySelector("#question-container");
const endGamePage = document.getElementById('end-game-page');
const submitButton = document.getElementById('submit-btn');
const highScorePage = document.getElementById('high-score-page');
const tryAgainButton = document.getElementById('try-again-btn');
const result = document.getElementById('result');

// let score = timer;
let questionIndex = -1;
let question = '';

function checkChoice(event) {
    event.preventDefault();
    
    const buttonClicked = event.target;  

    if(buttonClicked.textContent === questions[questionIndex].answer) {

        // Add CSS to style answer green.
        result.textContent = "Nailed it.";
        // Move onto the next question.
        getNewQuestion()
    }
    else {

        // Add CSS to style answer red.
        result.textContent = "Yeah, nah...";

        // Take 5 seconds from the timer.
        deductTime(5);

        // Move onto the next question.
        getNewQuestion()
    };
    console.log(questions[questionIndex]);
}

function renderQuestion() {
    question = questions[questionIndex];

    const questionTitle = document.createElement('h1');
    questionTitle.textContent = question.questionTitle;
    questionContainer.append(questionTitle);
    
    for (let index = 0; index < question.choices.length; index++) {
        const choice = question.choices[index];

        const button = document.createElement('button');
        button.textContent = choice;

        button.addEventListener('click', checkChoice);
        questionContainer.append(button);

    };
    // if there are no questions left then end the game
}

function clearList() {
    Array.from(questionContainer.children).forEach(child => {
        child.remove();
    });
}

function getNewQuestion() {
    questionIndex ++;
    clearList();
    console.log(questions[questionIndex]);
    if (questionIndex < questions.length) {
        renderQuestion();
    }
    else {
        endGame();
    }
    // WHEN the use selects an answer
    // THEN the user moves on to the next question
    // IF the user has answered all the questions
    // THEN the endGame function is invoked
}

startGameButton.addEventListener('click', function(event) {
    event.preventDefault();
    // WHEN I click on the start button:
    // THEN I start the timer.
    startTimer();
    // THEN I hide the landing page and footer.
    landingPage.classList.add('d-none');
    footerEl.classList.add('d-none');
    // THEN I show question 1.
    getNewQuestion();
})

highScoreButton.addEventListener('click', function(event) {
    event.preventDefault();
    // WHEN I click on the high score button:
    // THEN I am redirected to the high score page.
    landingPage.classList.add('d-none');
    highScorePage.classList.remove('d-none');
})

function endGame() {
    clearInterval(intervalId);
    timerSection.classList.add("d-none");
    endGamePage.classList.remove('d-none')
    footerEl.classList.remove('d-none');
    const finalScore = document.getElementById('final-score');
    finalScore.innerHTML = timerCount.textContent;
    console.log(timer.value);
    // const finalScore = document.createElement('h1');
    // finalScore.textContent = score;
    // document.getElementById("result").innerHTML = score;
    // WHEN the game ends
    // THEN the game over screen displays
    // THEN the user is presented with a text box where they can log their initials
    // WHEN the user submits their details
    // THEN the information is stored in local storage
}

const endGameEl = document.getElementById('end-game-form');
let initialsInputEl = document.getElementById('initials');

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    let userInitials = initialsInputEl.val('');
    console.log(userInitials);
    let initials = document.createElement('<li>' + userInitials + '</li>');
    initials.appendTo(initialsInputEl);
    userInitials.val('');
    localStorage.setItem("score", finalScore);
    localStorage.setItem("initial", "");
    highScores();
})

function returnToHomepage() {
    location.reload();
    // highScorePage.classList.add('.d-none');
    // landingPage.classList.remove('.d-none');
}

var highScore = localStorage.getItem("score");
var initial = localStorage.getItem("initial");

function highScores() {
    endGamePage.classList.add('d-none');
    highScorePage.classList.remove('d-none');
}

tryAgainButton.addEventListener('click', returnToHomepage);
    // Create ordered list with high scores
    // WHEN the user has submitted their details
    // THEN the user is redirected to the 'high scores' screen
    // THEN the user can see a list of high scores