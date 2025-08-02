//list of questions
const quizData = [
      { //question 1
        question: "Which languages are used for web development?",
        type: "multiple",
        options: ["Python", "HTML", "CSS", "C++"],
        correct: ["HTML", "CSS"]
      },
      { //question 2
        question: "What does HTML stand for?",
        type: "single",
        options: [
          "Hyper Text Markup Language",
          "Home Tool Markup Language",
          "Hyperlinks and Text Markup Language",
          "High-level Text Management Language"
        ],
        correct: "Hyper Text Markup Language"
      },
      { //question 3
        question:"What does CSS stand for?",
        type:"single",
        options:[
            "Cascading Style Sheets",
            "Creative Style Syntax",
            "Computer Style Sheet",
            "Color Style Sheet"
        ],
        correct:"Cascading Style Sheets"
      },
      { //question 4
        question: "Which language is used to style web pages?",
        type:"single",
        options: ["HTML","Python","CSS","JavaScript"],
        correct:"CSS"
      },
      { //question 5
        question:"Which of the following are JavaScript frameworks or libraries?",
        type:"multiple",
        options:["React","Angular","Flask","Vue"],
        correct:["React","Angular","Vue"]  
      },
      { //question 6
        question:"Which of these is a version control system?",
        type:"single",
        options:["FTP","Git","SQL","Docker"],
        correct:"Git"
      },
      { //question 7
        question: "Which are JavaScript data types?",
        type:"multiple",
        options:["String","Number","Character","Boolean"],
        correct:["String","Number","Boolean"]
      },
      { //question 8
        question:"What does JSON stand for?",
        type:"single",
        options:[
            "JavaScript Object Notation",
            "Java Source Open Network",
            "JavaScript Oriented Node",
            "Java Standard Output Network"
        ],
        correct:"JavaScript Object Notation"
      },
      { //question 9
        question:"Which of the following are NoSQL databases?",
        type:"multiple",
        options:["MongoDB","Cassandra","MySQL","Redis"],
        correct:["MongoDB","Cassandra","Redis"]
      },
      { //question 10
        question:"Which method is used to add an event listener in JavaScript?",
        type:"single",
        options:["addEventListener","addListener","onEvent","listenEvent"],
        correct:"addEventListener"
      }
    ];
//************************************************************************************
let currQuestion = 0;
let score = 0;
//***********************************************************************************
const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const formEl = document.getElementById("answer-form");
const nextBtn = document.getElementById("next");
const resultEl = document.getElementById("result");
//*************************************************************************************
//load question function
function loadqtn(){
    const current = quizData[currQuestion];
    questionEl.innerText = current.question;
    formEl.innerHTML = "";
    for(let i=0;i<4;i++){                                   //for input (checkbox, radio button)
        let option =current.options[i];
        const label = document.createElement("label");
        label.setAttribute("for","option"+i);

        let input =document.createElement("input");
        if (current.type=="multiple"){
            input.type="checkbox";
        }
        else{
            input.type="radio";
        }
        input.name = "answer";           
        input.id = "option" + i;        
        input.value = option;
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        formEl.appendChild(label);
    }
    resultEl.innerText = "";
}
function getSelectedAnswers() {
  let selected = [];
  let inputs = formEl.querySelectorAll('input[name="answer"]');
  inputs.forEach(function(input) {
    if (input.checked) {
      selected.push(input.value);
    }
  }
);
  return selected;
}
function checkAnswer() {
      const current = quizData[currQuestion];
      const selected = getSelectedAnswers();
      if (current.type === "single") {
        if (selected[0] === current.correct) {
          score++;
        }
      } 
      else {
        const isCorrect =
          JSON.stringify(selected.sort()) ===
          JSON.stringify(current.correct.sort());
        if (isCorrect) {
          score++;
        }
      }
      return true;
}
nextBtn.addEventListener("click", function(){
  const answered = checkAnswer();
  if(!answered) return;
  currQuestion++;
  if(currQuestion < 10){
    loadqtn();
  }
  else{
    FinalResult();
  }
}
);
function FinalResult(){
  quiz.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>You scored <span style="color:#3498db;font-size:22px;font-weight:500">${score}</span> out of <span style="color:#3498db;font-size:22px;font-weight:500">10</span></p>
    <button onclick="location.reload()">Restart Quiz</button>
  `;
}
//load questions when quiz is restarted
loadqtn();


