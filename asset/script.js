var headerEle=document.querySelector("header");
var ViewHighScoreLink=document.querySelector("#ViewScore");
var timeDiv=document.querySelector("#TimeDiv");
var questionContainerDiv=document.querySelector(".questionContainer");
var questionDiv=document.querySelector("#Question");
var choiseContainerOl=document.querySelector(".ChoiseContainer");
var choiseLis=document.querySelectorAll(".Choise");
var messageDiv=document.querySelector(".Message");
var QuizEndContainerDiv=document.querySelector(".QuizEndContainer");
var scoreSpan=document.querySelector("#ScoreSpan");
var initialInput=document.querySelector(".initial");
var initialSubmitBtn=document.querySelector("#InitailBtn");
var initialInputMessage=document.querySelector(".initialMessage");
var quizStartContainerDiv=document.querySelector(".QuizStartContainer");
var startQuizBtn=document.querySelector("#StartQuizBtn");
var quizRestartContainer=document.querySelector(".QuizRestartContainer");
var highScoreList=document.querySelector("#HighScoreDiv");
var gobackQuizBtn=document.querySelector("#GobackQuizBtn");
var clearHighScorBtn=document.querySelector("#ClearHScorBtn");
var score=0;
var TimeLeft=75;
var QIndex=0;
var quizEnd=0;
var quizTimer=0;
var scoreRecord=[];



var quiz={
  question:["Inside which HTML element do we put the JavaScript? ________________","How to write an IF statement in JavaScript? ______________________","How does a FOR loop start? _____________________","Which operator is used to assign a value to a variable? ________________________"],
  choise1:["<script>","if i=5","for(i=0; i<=5)","-"],
  choise2:["<scripting>","if i==5 then","for(i<=5;i++)","+"],
  choise3:["<javascript>","ifi=5 then","for i=1 to 5","="],
  choise4:["<js>","if(i==5)","for(i=0;i<=5;i++)","*"],
  answer:["<script>","if(i==5)","for(i=0;i<=5;i++)","="]
};


function renderQuestion(index) {
  questionDiv.textContent=quiz.question[index];
  choiseLis[0].textContent="1. "+ quiz.choise1[index];
  choiseLis[1].textContent="2. "+ quiz.choise2[index];
  choiseLis[2].textContent="3. "+ quiz.choise3[index];
  choiseLis[3].textContent="4. "+ quiz.choise4[index];
}

//This function will stringify scors array and stors it in local storage
function storeScors(ini) {
  scoreRecord.unshift(ini + "-"+ score);
  localStorage.setItem("scoreRecord", JSON.stringify(scoreRecord));
}
function renderScore(){
  var storedScore=JSON.parse(localStorage.getItem("scoreRecord"));
  highScoreList.innerHTML="";
  if (storedScore !== null) {
    scoreRecord=storedScore;
    var scoreDisplayLength=scoreRecord.length;
    if (scoreDisplayLength>10) {
      scoreDisplayLength=10;
    }
    for (var i = 0; i < scoreDisplayLength; i++) {
      var li = document.createElement("li");
      li.textContent = scoreRecord[i];
      highScoreList.appendChild(li);
    }
  }
}
startQuizBtn.addEventListener("click",(event)=>{

  QIndex=0;
  quizEnd=0;
  TimeLeft=75;
  renderQuestion(QIndex);
  messageDiv.textContent="";
  quizStartContainerDiv.classList.add("QuizRestartContainerHide");
  questionContainerDiv.classList.remove("questionContainerHide");
  
  quizTimer = setInterval(function() {
    TimeLeft--;

    if(TimeLeft < 1 ) {
      clearInterval(quizTimer);
      scoreSpan.textContent=score;
    }
    timeDiv.textContent="Time: " + TimeLeft;
  }, 1000);
 
});

questionContainerDiv.addEventListener("click",(event)=> {
  var element=event.target;
 
  if (element.textContent.slice(3)===quiz.answer[QIndex]) {
    messageDiv.textContent="Correct!";
    
  }else{
   messageDiv.textContent="Wrong!";
    if (TimeLeft>10) {
      TimeLeft=TimeLeft-10;
    } else {
      TimeLeft=0;
    }
   
   timeDiv.textContent="Time: " + TimeLeft;
  }
  if (QIndex<3 && TimeLeft>0) {
    QIndex++;
    renderQuestion(QIndex);
  } else {
    score=TimeLeft;
    questionContainerDiv.classList.add("questionContainerHide");
    QuizEndContainerDiv.classList.remove("QuizEndContainerHide");
    scoreSpan.textContent=score;
   
    clearInterval(quizTimer);
    timeDiv.textContent="Time: " + TimeLeft;
  }


});



initialSubmitBtn.addEventListener("click",(event)=>{
 event.preventDefault();
 let inital=initialInput.value.trim().toUpperCase();

  if (inital) {
    initialInputMessage.textContent="";
    var storedScore=JSON.parse(localStorage.getItem("scoreRecord"));
    console.log(storedScore);
    if(storedScore !== null) {
      scoreRecord=storedScore;
      console.log(scoreRecord);
    }
    storeScors(inital);//store score with initial
  
    QuizEndContainerDiv.classList.add("QuizEndContainerHide");
    quizRestartContainer.classList.remove("QuizRestartContainerHide")
    headerEle.classList.add("headerHide");
    renderScore();
  } else {
    initialInputMessage.textContent="Please enter initial!"
  }
 
});

clearHighScorBtn.addEventListener("click",()=>{
  localStorage.removeItem("scoreRecord");
  highScoreList.innerHTML="";
});

gobackQuizBtn.addEventListener("click",()=>{
  quizRestartContainer.classList.add("QuizRestartContainerHide");
  quizStartContainerDiv.classList.remove("QuizRestartContainerHide");
  headerEle.classList.remove("headerHide");
})

ViewHighScoreLink.addEventListener("click", ()=>{
  quizStartContainerDiv.classList.add("QuizRestartContainerHide");
  headerEle.classList.add("headerHide");
  questionContainerDiv.classList.add("questionContainerHide");
  quizRestartContainer.classList.remove("QuizRestartContainerHide");
});

