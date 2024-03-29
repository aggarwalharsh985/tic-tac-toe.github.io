let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msg_container = document.querySelector(".msg_container");
let msg = document.querySelector("#msg");
let new_game = document.querySelector("#new_game");
let turnO = true;
let click_conut = 0;
const winner_pattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];

boxes.forEach((box) => {
    box.addEventListener("click" , () => {
        console.log("box was clicked");
        click_conut++;
        console.log(click_conut);
        
        if(turnO){
            box.innerText = "O";
            turnO = false;
            box.classList.remove("x-symbol")
            box.classList.add("o-symbol");
        }
        else{
            box.innerText = "X";
            turnO = true;
            box.classList.remove("o-symbol"); 
            box.classList.add("x-symbol");
        }
        box.disabled = true;
        check_winner();
    });
});

const resetGame = () => {
    enable_button();
    turnO = true;
    click_conut = 0;
    msg_container.classList.add("hide");
};

const disable_button = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};
const enable_button = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const show_winner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner} `;
    msg_container.classList.remove("hide");
    disable_button();
};

let check_winner = () => {
    let winnerFound = false;
    for(let pattern of winner_pattern){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                console.log("winner" , pos1);
                show_winner(pos1);
                winnerFound = true;
                break;
            }
            else if (!winnerFound && click_conut === 9 ){
                msg_container.classList.remove("hide");
                msg.innerText = "match is draw";
            }
        };
    };
};

new_game.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame)