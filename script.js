let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let turnO = true; // if true then player O turn or else player X turn
//2D arrays
const winPatterns = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];

let newGameBtn = document.querySelector(".newGame-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let clickCount = 0;
chooseOpt();
function chooseOpt(){
let Opt = (prompt("enter o or x")).toUpperCase();
console.log(Opt);
if(Opt === "O"){
    turnO = true
}
else if(Opt === "X"){
    turnO = false;
}
else{
    alert("Wrong input");
    chooseOpt();
}

}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        clickCount++;
        if(turnO === true){
             box.style.color = "#094d92";
              box.innerText = "O"
              turnO = false;
        }
            else{
                box.style.color = "red";
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true;
            checkWinner();
    });
});

const checkWinner = ()=>{
    let checkDraw = true;
    for(let pattern of winPatterns){
       let pos1Val = boxes[pattern[0]].innerText;
       let pos2Val = boxes[pattern[1]].innerText;
       let pos3Val = boxes[pattern[2]].innerText;
       if(pos1Val!= "" && pos2Val!="" && pos3Val!=""){
         if(pos1Val===pos2Val && pos2Val == pos3Val){
                checkDraw = false;
                showWinner(pos1Val);
        }
       }
    }
    if(clickCount == 9 && checkDraw == true){
        showDraw();
    }
};
let disableBtns =()=>{
   for(let box of boxes){
    box.disabled = true;
   }
};

let showWinner = (winner)=>{
    msg.innerText = `Congratulations,Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBtns();
};
let showDraw = ()=>{
    msg.innerText = `It's a Draw`;
    msgContainer.classList.remove("hide");
    disableBtns();
};



let resetGame = ()=>{
         turnO = true;
         for(let box of boxes){
            box.innerText = "";
            box.disabled = false;
         }
         msgContainer.classList.add("hide");
         clickCount = 0;
         chooseOpt();
};

newGameBtn.addEventListener("click",resetGame)

resetBtn.addEventListener("click",resetGame)

