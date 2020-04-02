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
    showQuestion(questions[currentQuestion]);
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

    if (questions.length > currentQuestion + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Начать заново';
        startButton.classList.remove('hide');

        question.innerHTML = `Кол-во правильных ответов = ${correctAnswers} из ${questions.length}`;
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

// Data questions
const questions = [
    {
        question: 'What is 2 + 2',
        answers: [
            {text: '3', correct: false},
            {text: '4', correct: true},
            {text: '7', correct: false},
            {text: '10', correct: false}
        ]
    },
    {
        question: 'What is your name?',
        answers: [
            {text: 'Cat', correct: false},
            {text: 'Dog', correct: false},
            {text: 'Vova', correct: true},
            {text: 'Rabbit', correct: false}
        ]
    }
]