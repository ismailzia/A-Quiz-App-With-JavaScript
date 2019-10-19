const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answers-btn');

let shuffledQuestions, currentQuestionIndex;  

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    if(currentQuestionIndex < 3){
        currentQuestionIndex++;
    }else{
        currentQuestionIndex=0        
    }
    setNextQuestion()
});

function startQuiz(){
    startBtn.classList.add('hide');
    questionContainer.classList.remove('hide');
    shuffledQuestions = questions.sort(()=> Math.random() - 0.5 );
    currentQuestionIndex = 0;
    setNextQuestion();
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerHTML = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerButtonElement.appendChild(button)
    }); 
}

function resetState(){
    clearStatusClass(document.body)
    nextBtn.classList.add('hide');
    while(answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}

function selectAnswer(e){
    const selectButton = e.target;
    const correct = selectButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextBtn.classList.remove('hide')
    }else{
        startBtn.innerHTML = 'Restart'
        startBtn.classList.remove('hide')
    }
    
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct');
    }else{
        element.classList.add('wrong');
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question : 'what is 2 + 2 ?',
        answers : [
            {text:'4', correct:true},
            {text:'8', correct:false},
            {text:'9', correct:false},
            {text:'5', correct:false},
        ]
    },
    {
        question : 'what is 5 + 4 ?',
        answers : [
            {text:'4', correct:false},
            {text:'8', correct:false},
            {text:'9', correct:true},
            {text:'5', correct:false},
        ]
    },
    {
        question : 'what is 7 + 1 ?',
        answers : [
            {text:'4', correct:false},
            {text:'8', correct:true},
            {text:'9', correct:false},
            {text:'5', correct:false},
        ]
    }
]