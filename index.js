const line = document.querySelector("#word");
const inputText = document.querySelector("#inputContainer");
const lifeText = document.querySelector("#lifeText");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const questionText = document.querySelector("#questionText");
const submitBtn = document.querySelector("#submitBtn");
const questions = {
    "what is my name?": "duy",
    "how old am I?": "24",
    "what brand of shoes do I wear?": "nike",
    "who sing 'I lay my love on you'?": "westlife",
    "what is the name of my choir?": "cecilia",
    "where do I live?": "seattle"
};
let charList = [];//list of answer characters
let inputList = [];//list of input characters
let life = 6;
let running = false;
let keys = Object.keys(questions);//list of question by sorting keys of object "questions"
let currentQuestion = keys[Math.floor(Math.random() * keys.length)];//randomly pick a question from Object "questions" 
let currentAnswer = questions[currentQuestion]; //get the answer by get the value of the key 
initializeGame();
//start the game
function initializeGame() {
    restartBtn.addEventListener("click", restartGame);
    running = true;
    inputField();
    document.querySelector('*[autofocus]').focus();
    line.textContent = underLine();
    questionText.textContent = currentQuestion;
    charList = currentAnswer.split("");
    lifeText.textContent = `Life: ${life}`;
}
//create inputFields based on the length of the answer and get it checked then automatically move to the next field
function inputField() {
    for (let i = 0; i < currentAnswer.length; i++) {
        let input = document.createElement("INPUT");
        input.setAttribute("type", "text");
        input.setAttribute("value", "");
        input.setAttribute("id", i);
        input.setAttribute("class", "input");
        console.log(input.id);
        input.maxLength = 1;
        inputList.push(input);
        if (i == 0) {
            input.setAttribute("autofocus", "");
        }
        input.addEventListener("keyup", checkRight);
        isRight = false;
    }
    inputList.forEach(input => inputText.append(input));
}
//create underLine of the input fields
function underLine() {
    let currentLine = "";
    for (let i = 0; i < currentAnswer.length; i++) {
        currentLine += "_ ";
    }
    return currentLine;
}
//reset the input elements
function removeField() {
    for (let i = 0; i < inputList.length; i++) {
        inputText.removeChild(inputList[i]);
    }
}
//check if the input field is right and move to the next field
function checkRight() {
    let isRight = false;
    let index = this.id;
    console.log(this.value + " " + charList[index]);
    if (this.value == charList[index]) {
        isRight = true;
        statusText.textContent = "";
        if (this.nextElementSibling) {
            this.nextElementSibling.focus();
        }
    } else {
        life--;
        lifeText.textContent = `Life: ${life}`;
        statusText.textContent = "Wrong letter. Please try again!";
        this.value = "";
    }
    if (isRight && index == charList.length - 1) {
        statusText.textContent = `Excellent :)`;
        running = false;
    } if (life == 0) {
        statusText.textContent = `Game Over :(`;
        running = false;
        inputText.textContent = "Game Over";
    }
}
//restart the game
function restartGame() {
    currentQuestion = keys[Math.floor(Math.random() * keys.length)];
    inputText.textContent = (inputText.textContent == "Game Over") ? inputText.textContent = "" : removeField();
    inputList = [];
    questionText.textContent = currentQuestion;
    currentAnswer = questions[currentQuestion];
    lifeText.textContent = `Life: ${life}`;
    line.textContent = underLine();
    inputField();
    document.querySelector('*[autofocus]').focus();
    life = 6;
    lifeText.textContent = `Life: ${life}`;
    running = true;
    statusText.textContent = "";
    charList = currentAnswer.split("");
}