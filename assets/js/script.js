const landingPage = document.getElementById('landing-page');
const startGameButton = document.getElementById('btn-start-game');
const questionContainer = document.querySelector("#question-container");

let score = 0;
let questionIndex = 0;

function checkChoice(event) {
    event.preventDefault();
    
    const buttonClicked = event.target;  

    if(buttonClicked.textContent === questions[questionIndex].answer) {
        // Add CSS to style answer green.

        // Move onto the next question.
        getNewQuestion()
    }
    else {
        // Add CSS to style answer red.

        // Take 5 seconds from the timer.
        deductTime(5)

        // Move onto the next question.
        getNewQuestion()
    };
    console.log(questions[questionIndex]);
}

function renderQuestion() {
    const question = questions[questionIndex];

    const questionTitle = document.createElement('h1');
    questionTitle.textContent = question.questionTitle;
    questionContainer.append(questionTitle);
    
    // do this for list elements also
    // const questionChoices = document.createElement('ul');
    // questionContainer.append(questionChoices);
    
    for (let index = 0; index < question.choices.length; index++) {
        const choice = question.choices[index];

        const button = document.createElement('button');
        button.textContent = choice;

        button.addEventListener('click', checkChoice)
        questionContainer.append(button);

    }
}

function clearList() {
    Array.from(questionContainer.children).forEach(child => {
        child.remove();
    });
}

function getNewQuestion() {
    clearList();
    renderQuestion();
    questionIndex ++;
    console.log(questions[questionIndex]);
    // WHEN the use selects an answer
    // THEN the user moves on to the next question
    // IF the user has answered all the questions
    // THEN the endGame function is invoked
}

startGameButton.addEventListener('click', function(event) {
    event.preventDefault();
    // WHEN I click on the start button:
    // THEN I hide the landing page.
    landingPage.classList.add('d-none');
    // THEN I show question 1.
    getNewQuestion();
    startTimer();
})

function endGame() {
    clearInterval(intervalId);
    // WHEN the game ends
    // THEN the game over screen displays
    // THEN the user is presented with a text box where they can log their initials
    // WHEN the user submits their details
    // THEN the information is stored in local storage
}

    // WHEN the user has submitted their details
    // THEN the user is redirected to the 'high scores' screen
    // THEN the user can see a list of high scores