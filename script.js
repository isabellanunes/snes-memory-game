let cardArray = [
    { name: "contra", img: "assets/contra.png" },
    { name: "contra", img: "assets/contra.png" },

    { name: "ddk", img: "assets/ddk.png" },
    { name: "ddk", img: "assets/ddk.png" },

    { name: "dk", img: "assets/dk.png" },
    { name: "dk", img: "assets/dk.png" },

    { name: "goofy", img: "assets/goofy.png" },
    { name: "goofy", img: "assets/goofy.png" },

    { name: "liu", img: "assets/liu.png" },
    { name: "liu", img: "assets/liu.png" },

    { name: "mario", img: "assets/mario.png" },
    { name: "mario", img: "assets/mario.png" },

    { name: "mask", img: "assets/mask.png" },
    { name: "mask", img: "assets/mask.png" },

    { name: "toad", img: "assets/toad.png" },
    { name: "toad", img: "assets/toad.png" },

    { name: "yoshi", img: "assets/yoshi.png" },
    { name: "yoshi", img: "assets/yoshi.png" },

    { name: "zelda", img: "assets/zelda.png" },
    { name: "zelda", img: "assets/zelda.png" },
];

let scoreBoard = document.querySelector(".scoreBoard");
let clickBoard = document.querySelector(".clickBoard");
let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");

let imgs;
let cardsId = [];
let cardsSelected = [];
let cardsWon = 0;
let clicks = 0;

document.addEventListener("DOMContentLoaded", function () {
    
    createBoard(grid, cardArray);
    arrangeCard();
    playAgain.addEventListener("click", replay);

    imgs = document.querySelectorAll("img");
    Array.from(imgs).forEach(img =>
        img.addEventListener("click", flipCard)
    )
});

function createBoard(grid, array) {
    popup.style.display = "none";
    array.forEach((arr, index) => {
        let img = document.createElement("img");
        img.setAttribute("src", "/assets/back-card.png");
        img.setAttribute("data-id", index);
        grid.appendChild(img);
    })
}

function arrangeCard() {
    cardArray.sort(() => 0.5 - Math.random())
}

function flipCard() {
    let selected = this.dataset.id;
    let clicked = cardArray[selected].name
    cardsSelected.push(clicked);
    cardsId.push(selected);
    this.classList.add("flip");
    this.setAttribute("src", cardArray[selected].img);
    if (cardsId.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

function checkForMatch() {
    let imgs = document.querySelectorAll("img");
    let firstCard = cardsId[0];
    let secondCard = cardsId[1];
    if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) {
        cardsWon += 1;
        scoreBoard.innerHTML = cardsWon;
        setTimeout(checkWon, 500)
    } else {
        imgs[firstCard].setAttribute("src", "/assets/back-card.png");
        imgs[secondCard].setAttribute("src", "/assets/back-card.png");
        imgs[firstCard].classList.remove("flip");
        imgs[secondCard].classList.remove("flip");
    }
    cardsSelected = [];
    cardsId = [];
    clicks += 1;
    clickBoard.innerHTML = clicks;
}

function checkWon() {
    if (cardsWon == cardArray.length / 2) {
        setTimeout(() => popup.style.display = "flex", 300);
    }
}

function replay() {
    arrangeCard();
    grid.innerHTML = "";
    createBoard(grid, cardArray);
    cardsWon = 0;
    clicks = 0;
    clickBoard.innerHTML = 0;
    scoreBoard.innerHTML = 0;
    popup.style.display = "none";
    imgs = document.querySelectorAll("img");
    Array.from(imgs).forEach(img =>
        img.addEventListener("click", flipCard)
    )
    
}