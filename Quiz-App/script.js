const startBtn=document.getElementById('start-btn')
const nextBtn=document.getElementById('next-btn')
const playAgainBtn=document.getElementById('play-again-btn')
const questionContainer=document.getElementById('question-container')
const questionElement=document.getElementById('question')
const answerButtonList=document.getElementById('answer-buttons')
var scoreElement=document.getElementById('score');

var score=0

let shuffledQuestions,currentIndex
startBtn.addEventListener('click',startGame)
nextBtn.addEventListener('click',()=>{
    
    if (currentIndex==questions.length-1){
        console.log("Game Over")
        nextBtn.classList.add('hide')
        playAgainBtn.classList.remove('hide')
        return
    }
    currentIndex++
    setNextQuestion()
})
playAgainBtn.addEventListener('click',()=>{
    startGame()
})




function startGame(){
    startBtn.classList.add('hide')
    shuffledQuestions=questions.sort(()=>Math.random()-.5)
    currentIndex=0
    questionContainer.classList.remove('hide')
    setNextQuestion()
    
}
function setNextQuestion(){
    resetState()
    showQuestion()
}

function showQuestion(){
    
    var currentQuestion=questions[currentIndex]
    questionElement.innerText=currentQuestion.question
    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement('button')
        button.innerText=answer.text
        button.classList.add('btn')
        if (answer.correct){
            button.dataset.correct=answer.correct
        }
        button.addEventListener('click',selectAnswer)
        answerButtonList.appendChild(button)
    })
}

function selectAnswer(event){
    const selectedBtn=event.target
    const correct=selectedBtn.dataset.correct
    setStatusClass(document.body,correct)
    Array.from(answerButtonList.children).forEach(button=>{
        setStatusClass(button,button.dataset.correct)
    })
    nextBtn.classList.remove('hide') 
    
}

function setStatusClass(element,correct){
    element.classList.remove('correct')
    element.classList.remove('wrong')
    if (correct){
        element.classList.add('correct')
        
    }else{
        element.classList.add('wrong')
    }
    // scoreElement.innerText="Score : "+score
}

function resetState(){
    nextBtn.classList.add('hide')
    while (answerButtonList.firstChild){
        answerButtonList.removeChild(answerButtonList.firstChild)
    }
}

const questions=[
    {
        'question':'What is the maximum possible length of an identifier?',
        'answers':[
            {'text':'16','correct':false},
            {'text':'32','correct':false},
            {'text':'64','correct':false},
            {'text':'None','correct':true}
        ]
    },
    {
        'question':'Who developed the Python language?',
        'answers':[
            {'text':'Zim Den','correct':false},
            {'text':'Guido van Rossum','correct':true},
            {'text':'Niene Stom','correct':false},
            {'text':'Wick van Rossum','correct':false}
        ]
    },
    {
        'question':' In which year was the Python language developed?',
        'answers':[
            {'text':'1995','correct':false},
            {'text':'1972','correct':false},
            {'text':'1981','correct':false},
            {'text':'1989','correct':true}
        ]
    },
    {
        'question':'What do we use to define a block of code in Python language?',
        'answers':[
            {'text':'Key','correct':false},
            {'text':'Brackets','correct':false},
            {'text':'Indentation','correct':true},
            {'text':'None of these','correct':false}
        ]
    },
    {
        'question':'Which character is used in Python to make a single line comment?',
        'answers':[
            {'text':'/','correct':false},
            {'text':'//','correct':false},
            {'text':'#','correct':true},
            {'text':'!','correct':false}
        ]
    },
    {
        'question':'Which of the following declarations is incorrect?',
        'answers':[
            {'text':'_x = 2','correct':false},
            {'text':'__x = 3','correct':false},
            {'text':'__xyz__ = 5','correct':false},
            {'text':'None of these','correct':true}
        ]
     },
    {
        'question':'Which of the following operators is the correct option for power(ab)?',
        'answers':[
            {'text':'a ^ b','correct':false},
            {'text':'a**b','correct':true},
            {'text':'a ^ ^ b','correct':false},
            {'text':'a ^ * b','correct':false}
        ]
    },
    {
        'question':"Which one of the following syntaxes is the correct syntax to read from a simple text file stored in ''d:\java.txt''?",
        'answers':[
            {'text':"Infile = open(''d:\\java.txt'', ''r'')",'correct':true},
            {'text':"Infile = open(file=''d:\\\java.txt'', ''r'')",'correct':false},
            {'text':"Infile = open(''d:\java.txt'',''r'')",'correct':false},
            {'text':"Infile = open.file(''d:\\java.txt'',''r'')",'correct':false}
        ]
    }, 
    {
        'question':`Study the following function:

        any([5>8, 6>3, 3>1])`,
        'answers':[
            {'text':'False','correct':false},
            {'text':'Ture','correct':true},
            {'text':'Invalid code','correct':false},
            {'text':'None of these','correct':false}
        ]
    }//,
    // {
    //     'question':'',
    //     'answers':[
    //         {'text':'6','correct':false},
    //         {'text':'3','correct':false},
    //         {'text':'6','correct':false},
    //         {'text':'4','correct':false}
    //     ]
    // },
    // {
    //     'question':'',
    //     'answers':[
    //         {'text':'6','correct':false},
    //         {'text':'3','correct':false},
    //         {'text':'6','correct':false},
    //         {'text':'4','correct':false}
    //     ]
    // }


]
