/*views são variáveis que estão mudando valores visiveis para o usuarios e values são as que mudaram apenas valores dentro do codigo*/

 const state = {
    view:{
        squares: document.querySelectorAll(".square"), /**/ 
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        timerId: null,
        gameVelocity: 500,
        hitPosition: 0,
        result: 0,
        currtentTime: 60,
        
    },
    actions: {
        coutDownTimerId: setInterval(countDown, 1000),
    }
 };


 function countDown(){
    state.values.currtentTime--;
    state.view.timeLeft.textContent = state.values.currtentTime;
    if(state.values.currtentTime <= 0){
        alert("Game Over! O seu reultado foi: " + state.values.result)
    }
 }

 function playSound(audioName){
    let audio = new Audio(`./audios/${audioName}.mp4`);
    audio.volume = 0.2;
    audio.play();
 }

 function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    })
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
 }

 function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
 }

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("nome do audio");
            }
        })
    })
}

 function main(){
   
    moveEnemy(); 
    addListenerHitBox();
 }  

 main();