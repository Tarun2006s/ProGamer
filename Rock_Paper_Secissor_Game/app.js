let userScore=0;
let compScore=0;
const choices=document.querySelectorAll(".choice");
const compgenerated=()=>{
    let options=["rock","paper","scissors"];
    let index=Math.floor(Math.random()*3);
    let selected=options[index];
    return selected;
};
const playGame=(userChoice)=>{
    console.log("user choice is ", userChoice);
    const compChoice=compgenerated();
    if(compChoice===userChoice){
        document.querySelector("#user-score").innerText=`${userScore}`;
        document.querySelector("#comp-score").innerText=`${compScore}`;
        document.querySelector("#msg").innerText="it was a draw";
    }else if(compChoice=="rock" && userChoice=="scissors"){
        compScore++;
        document.querySelector("#user-score").innerText=`${userScore}`;
        document.querySelector("#comp-score").innerText=`${compScore}`;
        document.querySelector("#msg").innerText="you lose";
    }else if(compChoice=="paper" && userChoice=="rock"){
        compScore++;
        document.querySelector("#user-score").innerText=`${userScore}`;
        document.querySelector("#comp-score").innerText=`${compScore}`;
        document.querySelector("#msg").innerText="you lose";
    }else if(compChoice=="scissors" && userChoice=="paper"){
        compScore++;
        document.querySelector("#user-score").innerText=`${userScore}`;
        document.querySelector("#comp-score").innerText=`${compScore}`;
        document.querySelector("#msg").innerText="you lose";
    }else{
        userScore++;
        document.querySelector("#user-score").innerText=`${userScore}`;
        document.querySelector("#comp-score").innerText=`${compScore}`;
        document.querySelector("#msg").innerText="you won";
    }
}
choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userChoice=choice.getAttribute("id");
        console.log("choice was clicked",userChoice);
        playGame(userChoice);
    });
});