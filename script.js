const body = document.querySelector("body");
const section = document.querySelector("section");
let playerLivesCount = document.querySelector("span");
let countdownEl = document.getElementById("countdown");
let playerLives = 8;
const startingMinutes = 0.5;
let time = startingMinutes * 60;

// generate the data
const getData = () => [
  { imgSrc: "./images/heisenberg.jpg", name: "heisenberg" },
  { imgSrc: "./images/jesse.jpg", name: "jesse pinkman" },
  { imgSrc: "./images/gus.jpg", name: "gus firing" },
  { imgSrc: "./images/saul.jpg", name: "saul goodman" },
  { imgSrc: "./images/mike.jpg", name: "michael ehrmantraut" },
  { imgSrc: "./images/hector.jpg", name: "hector salamanca" },
  { imgSrc: "./images/jane.jpg", name: "jane margolis" },
  { imgSrc: "./images/lalo.jpg", name: "lalo salamanca" },
  { imgSrc: "./images/heisenberg.jpg", name: "heisenberg" },
  { imgSrc: "./images/jesse.jpg", name: "jesse pinkman" },
  { imgSrc: "./images/gus.jpg", name: "gus firing" },
  { imgSrc: "./images/saul.jpg", name: "saul goodman" },
  { imgSrc: "./images/mike.jpg", name: "michael ehrmantraut" },
  { imgSrc: "./images/hector.jpg", name: "hector salamanca" },
  { imgSrc: "./images/jane.jpg", name: "jane margolis" },
  { imgSrc: "./images/lalo.jpg", name: "lalo salamanca" },
];

//countDown
function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  countdownEl.innerHTML = ` ${minutes}:${seconds}`;
  time--;

  if (time == 0 && seconds == "01") {
    lostTheGame();
  }
}
function startCountdown() {
  callCountdown = setInterval(updateCountdown, 1000);
}
//link text
playerLivesCount.textContent = playerLives;
//firstModal
const firstModal = document.createElement("div");
const firstModal_box = document.createElement("div");
const message = document.createElement("h2");
const messageInfo = document.createElement("p");
const startBtn = document.createElement("a");

body.appendChild(firstModal);
firstModal.appendChild(firstModal_box);
firstModal_box.appendChild(message);
firstModal_box.appendChild(messageInfo);
firstModal_box.appendChild(startBtn);
firstModal.classList = "modal";
firstModal_box.classList = "modal_box";
startBtn.classList = "btn";

firstModal.classList.add("flex");

message.innerHTML = "Let's Play Memory Game";
messageInfo.innerHTML =
  "You have " +
  playerLives +
  " " +
  "Lives and " +
  startingMinutes +
  " " +
  "Minutes to finish the game !";
startBtn.innerHTML = "Start The Game !";
startBtn.addEventListener("click", () => {
  startCountdown();
  firstModal.classList.remove("flex");
  firstModal.classList.add("hidden");
  revealAllCards();
});

const revealAllCards = () => {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    card.classList.add("toggleCard"); // Show the card
  });

  setTimeout(() => {
    allCards.forEach((card) => {
      card.classList.remove("toggleCard"); // Hide the card
    });
  }, 2000); 
};

//Randomize
const randomize = () => {
  let cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};


// Card generator Func
const cardGenerator = () => {
  const cardData = randomize();
  //Generate HTML
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //attach the info to the cards
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);

    //attach the card to section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};
// show the cards


//check card
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  console.log(clickedCard);

  //logic
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      console.log("match");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      console.log("wrong");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });

      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0 || (minutes && seconds === 0)) {
        lostTheGame();
      }
    }
  }
  if (toggleCard.length === 16) {
    wonTheGame();
  }
};

//EndModal
const modal = document.createElement("div");
const modal_box = document.createElement("div");
const gif = document.createElement("img");
const h2 = document.createElement("h2");
const p = document.createElement("p");
const restart_btn = document.createElement("a");

body.appendChild(modal);
modal.appendChild(modal_box);
modal_box.appendChild(gif);
modal_box.appendChild(h2);
modal_box.appendChild(p);
modal_box.appendChild(restart_btn);
modal.classList = "modal";
modal_box.classList = "modal_box";
restart_btn.classList = "btn";
gif.classList = "fit_gif";
modal.classList.add("hidden");

restart_btn.innerHTML = "Restart The Game !";
restart_btn.addEventListener("click", reload);
//player lost
function lostTheGame() {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  gif.src = "./images/rozp_o.gif";
  h2.innerHTML = "SORRY ! ";
  p.innerHTML = "You lost the game";
  clearInterval(callCountdown);
}
//player won
function wonTheGame() {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  gif.src = "./images/MBCe.gif";
  h2.innerHTML = "BRAVO  ! ";
  p.innerHTML = "You won the game";
  clearInterval(callCountdown);
}
//Restart
function reload() {
  window.location.reload();
}

// const restart = (text) => {
//   let cardData = randomize();
//   let faces = document.querySelectorAll(".face");
//   let cards = document.querySelectorAll('.card');
//   section.style.pointerEvents = "none"
//   cardData.forEach((item, index) => {
//     cards[index].classList.remove('toggleCard');
//     //Randomize
//    setTimeout(() => {
//     cards[index].style.pointerEvents = 'all';
//     faces[index].src = item.imgSrc;
//     cards[index].setAttribute('name', item.name);
//     section.style.pointerEvents = "all";
//    }, 1000)
//   });
//   playerLives = 6;
//   playerLivesCount.textContent = playerLives;
//   setTimeout( () => window.alert(text), 100)
// };

cardGenerator();
