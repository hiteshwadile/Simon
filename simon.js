let gameSeq = [];
let userSeq = [];
let score = [];
let highscore = [];
//to generate random color from those 4 colors
let btns = ["red" , "yellow", "green" , "blue"];  //here remember this is create to chose index to generate colors
let h3s = document.querySelector("#level");





let started = false;       //it defines that the game is not start
let level = 0;

let h3 = document.querySelector("h3");   //we access this to change this heading into level 1,,2..3.

document.addEventListener("keypress", function(){              //to start game ,should be press any key
    if(started == false){                                   //it check if game is start
        console.log("game is started");                     //then print this
        started = true;                                   //value change to true means game is started
  
        
        levelUp();       //after starting game we call this func to increse level and also to flash the btn 
    }
});


function gameFlash(btn){
    btn.classList.add("flash");         //had given in css to change bkcolor to white
    setTimeout(function(){                 
        btn.classList.remove("flash");           //to flash and return into its original state after the seted time
    },100);

}


//creating this function to flass the btn which we click after the btn flashed
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },100);
}

function levelUp(){
    userSeq = [];
    level++;                    //to increase the level
    h3.innerText = `Level ${level}`;        //first we access h3 and then update its text to increasing level
    

   //after pressing any key the btn should flash 
   //for that we create a func to flash btn and call it here
   //also the random button should flash 
   let randIdx  = Math.floor(Math.random() * 4);   // by this we get random index
   let randColor = btns[randIdx];
   let randBtn = document.querySelector(`.${randColor}`);       //here we create class using color
//    console.log(randIdx);
//    console.log(randColor);
//    console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
   gameFlash(randBtn);
}



//creating func to check users last pressed btn or color
function checkAns(idx){
    // console.log("current level", level)         //to print level on console 
    

    if(userSeq[idx] === gameSeq[idx]){
        // console.log("same value")
        if (userSeq.length == gameSeq.length){
            levelUp();    //setTimeout(levelUp, 1000);           //if will check the length anc call levelup func where level increase
        }

    } else {
        // h3.innerText = "game over...press any key to start";
        h3.innerHTML = ` game over ...Your score is <b>${level}. <br> Click any key to start the game.`
        score.push(level);
        // console.log(score);
        highScore = Math.max(...score);
        // console.log("Your highScore is :",highScore);
        h3s.innerText =`your high score is : ${highScore}`;
      
        // console.log(score.length-1);
       
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },100);
        

        reset();        //if user enter wrong color btn then all save color will reset 
    }
}




function btnPress(){

    // console.log(this)
   let btn = this;
   userFlash(btn);

   userColor = btn.getAttribute("id");          
//    console.log(userColor);                   //to get which color btn user press
   userSeq.push(userColor);                     //this will add user press color in array

   checkAns(userSeq.length-1);

}

let allBtns = document.querySelectorAll(".btn");  //accessing all color btns
 for(btn of allBtns){
    btn.addEventListener("click", btnPress);
 }


 
 function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

 }