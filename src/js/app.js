// import { questionList } from './data';
// Get html elements
const statusRightElem = document.querySelector('.right-answer');
const statusWrongElem = document.querySelector('.wrong-answer');
const startButton = document.querySelector('#start-btn');
const nextButton = document.querySelector('#next-btn');
const resultBtn = document.querySelector('#result-btn');
const questionContainer = document.querySelector('#question-container');
const question = document.querySelector('#question');
const answerButtons = document.querySelector('#answer-buttons');
// Variables
let currentQuestion, correctAnswers, wrongAnswer;

function startGame () {
    currentQuestion = 0;
    correctAnswers = wrongAnswer = 0;
    statusRightElem.textContent = correctAnswers;
    statusWrongElem.textContent = wrongAnswer;
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
    answerButtons.innerHTML = null;
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
        selectedButton.classList.add('correct');
        Array.from(answerButtons.children).forEach(button => {
            setDisabledElement(button);
        })

        correctAnswers++;
        statusRightElem.textContent = correctAnswers;
    } else {
        selectedButton.classList.add('wrong');
        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct) {
                button.classList.add('correct');
            }
            setDisabledElement(button);
        })
        wrongAnswer++;
        statusWrongElem.textContent = wrongAnswer;
    }

    if (questionList.length > currentQuestion + 1) {
        nextButton.classList.remove('hide');
    } else {
        resultBtn.classList.remove('hide');
        resultBtn.addEventListener('click', () => {
            alert(`Кол-во правильных ответов = ${correctAnswers} из ${questionList.length}`);
            resultBtn.classList.add('hide');
            startButton.innerText = 'Начать заново';
            startButton.classList.remove('hide');
        })

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

function setDisabledElement (elem) {
    elem.classList.add('disabled');
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