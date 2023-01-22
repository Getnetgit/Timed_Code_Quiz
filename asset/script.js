var headerEle=document.querySelector("header");
var ViewHighScoreLink=document.querySelector("#ViewScore");
var timeDiv=document.querySelector("#TimeDiv");
var questionContainerDiv=document.querySelector("#questionContainer");
var questionDiv=document.querySelector("#Question");
var choiseContainerOl=document.querySelector(".ChoiseContainer");
var choiseLis=document.querySelectorAll(".Choise");
var messageDiv=document.querySelector(".Message");
var QuizEndContainerDiv=document.querySelector("#QuizEndContainer");
var scoreSpan=document.querySelector("#ScoreSpan");
var initialInput=document.querySelector(".initial");
var initialSubmitBtn=document.querySelector("#InitailBtn");
var initialInputMessage=document.querySelector(".initialMessage");
var quizStartContainerDiv=document.querySelector("#QuizStartContainer");
var startQuizBtn=document.querySelector("#StartQuizBtn");
var quizRestartContainer=document.querySelector("#QuizRestartContainer");
var highScoreList=document.querySelector("#HighScoreDiv");
var gobackQuizBtn=document.querySelector("#GobackQuizBtn");
var clearHighScorBtn=document.querySelector("#ClearHScorBtn");
var score=0;
var TimeLeft=75;
var QIndex=0;
var quizTimer=0;
var scoreRecord=[];
//quiz object with qution , choises adn anser arrays . 7 questins with 4 choises each are included
var quiz={
  question:["Inside which HTML element do we put the JavaScript?","How to write an IF statement in JavaScript?","How does a FOR loop start?","Which operator is used to assign a value to a variable? ","A very useful tool used during develeopment and debugging for printing content to the debugger is:","String values must be enclosed within________ when being assigned to variables.","Arrays in JavaScript cam be used to store ___________."],
  choise1:["<script>","if i=5","for(i=0; i<=5)","-","JavaScript","commas", "numbers and strings"],
  choise2:["<scripting>","if i==5 then","for(i<=5;i++)","+","terminal/bash","curly brackets","other arrays"],
  choise3:["<javascript>","ifi=5 then","for i=1 to 5","=","for loops","quotes","booleans"],
  choise4:["<js>","if(i==5)","for(i=0;i<=5;i++)","*","consol.log","parenthesis","all of the above"],
  answer:["<script>","if(i==5)","for(i=0;i<=5;i++)","=", "consol.log","quotes","all of the above"]
};
//This function will take argument to turn on and off display content.
//if id is 1 header adn start quize content will be displayed
//if id is 2 quesions content will be displayed
//if id is 3 end of quiz content asking for initial will be displayed
//if id is 4 high score content will be displayed

function switchPags(id) {
  if (id===1) {//Start quiz start page 
     headerEle.classList.remove("hide");
     quizStartContainerDiv.classList.remove("hide");
     questionContainerDiv.classList.add("hide");
     QuizEndContainerDiv.classList.add("hide");
     quizRestartContainer.classList.add("hide");
  }else if (id===2) {//Quiz questions  page 
     headerEle.classList.remove("hide");
     quizStartContainerDiv.classList.add("hide");
     questionContainerDiv.classList.remove("hide");
     QuizEndContainerDiv.classList.add("hide");
     quizRestartContainer.classList.add("hide");
  }else if(id==3) {//Quiz end page with initial entry form
    headerEle.classList.remove("hide");
    quizStartContainerDiv.classList.add("hide");
    questionContainerDiv.classList.add("hide");
    QuizEndContainerDiv.classList.remove("hide");
    quizRestartContainer.classList.add("hide");
  }else{//Quiz scores with goback and clearscors buttons
    headerEle.classList.add("hide");
    quizStartContainerDiv.classList.add("hide");
    questionContainerDiv.classList.add("hide");
    QuizEndContainerDiv.classList.add("hide");
    quizRestartContainer.classList.remove("hide");
  }
}
//This function will be used to reorder or sheffule  the order of questions every time quiz is started .
function reorderQuestin() {
  for (let i = 0; i < quiz.question.length; i++) {
    var j=Math.floor(Math.random()*(quiz.question.length-1));
    if (j!==i) {
      let q=quiz.question[i];
      let ch1=quiz.choise1[i];
      let ch2=quiz.choise2[i];
      let ch3=quiz.choise3[i];
      let ch4=quiz.choise4[i];
      let ans=quiz.answer[i];

      quiz.question[i]=quiz.question[j];
      quiz.question[j]=q;
      quiz.choise1[i]=quiz.choise1[j];
      quiz.choise1[j]=ch1;
      quiz.choise2[i]=quiz.choise2[j];
      quiz.choise2[j]=ch2;
      quiz.choise3[i]=quiz.choise3[j];
      quiz.choise3[j]=ch3;
      quiz.choise4[i]=quiz.choise4[j];
      quiz.choise4[j]=ch4;
      quiz.answer[i]=quiz.answer[j];
      quiz.answer[j]=ans;
    }

  }
}
//This function will render questions when it is given an index as an input. It will be called when quiz is started and every time question is answerd if the question is not the last one.
function renderQuestion(index) {
  
  questionDiv.textContent=quiz.question[index];
  choiseLis[0].textContent="1. "+ quiz.choise1[index];
  choiseLis[1].textContent="2. "+ quiz.choise2[index];
  choiseLis[2].textContent="3. "+ quiz.choise3[index];
  choiseLis[3].textContent="4. "+ quiz.choise4[index];
}
//This function will stringify scors array and stors it in local storage. it will take initial input as an input.
function storeScors(inital) {
  scoreRecord.unshift(inital + "-"+ score);
  localStorage.setItem("scoreRecord", JSON.stringify(scoreRecord));
}
//This function will create li elements for each stored score and render it.
function renderScore(){
  var storedScore=JSON.parse(localStorage.getItem("scoreRecord"));
  highScoreList.innerHTML="";
  if (storedScore !== null) {
    scoreRecord=storedScore;
    var scoreDisplayLength=scoreRecord.length;
    for (var i = 0; i < scoreDisplayLength; i++) {
      var li = document.createElement("li");
      li.textContent = scoreRecord[i];
      highScoreList.appendChild(li);
    }
  }
}
switchPags(1);//Rendering game start page up on loading and refershing application.

//Adding envent listener to quiz start button .This will start timmer and render first question. Timer will stop and quiz end page will be on .
startQuizBtn.addEventListener("click",()=>{
  //Reassigning variables every time quiz started
  QIndex=0; 
  TimeLeft=75;
  reorderQuestin();//questions shuffeled here
  renderQuestion(QIndex); //first questin rendered here 
  messageDiv.textContent="";//correct or worong message initialized with none 
  initialInput.value="";//initials imput will be cleared
  switchPags(2);// content will be switched to questions page
  
  quizTimer = setInterval(function() {
    TimeLeft--;
    console.log(TimeLeft, "timeleft1");//troublshooting -ve vlue
    console.log((TimeLeft < 1) ,"test value");//for troubleshooting
    if(TimeLeft < 1 ) {
      clearInterval(quizTimer);
      scoreSpan.textContent=score;
      switchPags(3);
      console.log(TimeLeft , "timeleft2");//for troubleshooting 
      
    }
    timeDiv.textContent="Time: " + TimeLeft;
  }, 1000);
 
});

//once first questin renderd , this will listen to each choise button , check for correctness , culculate score by subtracting 10sec every mistake and display result if timer runns out or question end . Then display quiz end page.
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
  if (QIndex<(quiz.question.length - 1) && TimeLeft>0) {
    QIndex++;
    renderQuestion(QIndex);
  } else {
    score=TimeLeft;
    switchPags(3);
    scoreSpan.textContent=score;
   
    clearInterval(quizTimer);
    timeDiv.textContent="Time: " + TimeLeft;
  }


});

//Innitial submit button captures initial and save it in local storage along with scors
initialSubmitBtn.addEventListener("click",(event)=>{
 event.preventDefault();
 scoreRecord=[];
 let inital=initialInput.value.trim().toUpperCase();

  if (inital) {
    initialInputMessage.textContent="";
    var storedScore=JSON.parse(localStorage.getItem("scoreRecord"));
    console.log(storedScore);
    if(storedScore !== null) {
      scoreRecord=storedScore;
      
    }
    storeScors(inital);//store score with initial
  
    switchPags(4);//got to high score page
    renderScore();//render stord score in li elements 
  } else {
    initialInputMessage.textContent="Please enter initial!"
  }
 
});

//Clear stored scores on clear high sccore button cleicked.
clearHighScorBtn.addEventListener("click",()=>{
  localStorage.removeItem("scoreRecord");
  highScoreList.innerHTML="";
});

//go back button will take us to quiz start page .
gobackQuizBtn.addEventListener("click",()=>{
  TimeLeft=75;
  timeDiv.textContent="Time: " + TimeLeft;
 switchPags(1);//go to quiz start page 
})

//view high score link will take us to high scores page 
ViewHighScoreLink.addEventListener("click", ()=>{
  clearInterval(quizTimer);//cleare timer if view high score clicked while quiz is running
  switchPags(4);//go to high score page
  renderScore(); //render stored score in li elements 
});
