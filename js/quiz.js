// Get html elements
const startButton = document.querySelector('#start-btn');
const nextButton = document.querySelector('#next-btn');
const questionContainer = document.querySelector('#question-container');
const question = document.querySelector('#question');
const answerButtons = document.querySelector('#answer-buttons');
// Variables
let currentQuestion, correctAnswers;

function startGame () {
    currentQuestion = 0;
    correctAnswers = 0;
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion () {
    resetState();
    showQuestion(questionList[currentQuestion]);
}

function resetState () {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    answerButtons.innerHTML = '';
}

function showQuestion (quest) {
    question.innerHTML = quest.question;
    quest.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    })
}

function selectAnswer (e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);

    if (selectedButton.dataset.correct) {
        correctAnswers++;
    }

    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })

    if (questionList.length > currentQuestion + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Начать заново';
        startButton.classList.remove('hide');

        question.innerHTML = `Кол-во правильных ответов = ${correctAnswers} из ${questionList.length}`;
    }
}

function setStatusClass (elem, correct) {
    clearStatusClass(elem);
    if (correct) {
        elem.classList.add('correct');
    } else {
        elem.classList.add('wrong');
    }
}

function clearStatusClass(elem) {
    elem.classList.remove('correct', 'wrong');
}

// Event listeners
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestion++;
    setNextQuestion();
})