const CARDS_IMGS = [
  "./cards/abacaxi.png",
  "./cards/acai.png",
  "./cards/amora-preta.png",
  "./cards/caja.png",
  "./cards/caju.png",
  "./cards/cupuacu.png",
  "./cards/jabuticaba.png",
  "./cards/maracuja.png",
  "./cards/pequi.png",
  "./cards/pitanga.png",
];

const startBtn = document.getElementById("startBtn");
const aboutBtnStart = document.getElementById("aboutBtnStart");
const aboutBtnBottom = document.getElementById("aboutBtnBottom");
const startScreen = document.getElementById("startScreen");
const board = document.querySelector(".board");
const restartBtn = document.getElementById("restartBtn");
const winMessage = document.getElementById("winMessage");
const playsCount = document.getElementById("playsCount");

const SECOND = 1000;
let firstCard, secondCard;
let plays = 0;
let hits = 0;

// ---------- INICIAR JOGO ----------
startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  board.classList.remove("hidden");
  aboutBtnBottom.style.display = "block";
  restartBtn.style.display = "block";
  loadGame();
});

// ---------- REDIRECIONAR PARA SOBRE AS FRUTAS ----------
aboutBtnStart.addEventListener("click", () => {
  window.location.href = "sobre.html";
});

aboutBtnBottom.addEventListener("click", () => {
  window.location.href = "sobre.html";
});

// ---------- CARDS ----------
function loadGame() {
  const cards = sortCardsDisposal();
  insertCardsIntoTheBoard(cards);
}

function sortCardsDisposal() {
  const cardsDisposal = [];
  CARDS_IMGS.forEach(card => {
    cardsDisposal.push(card);
    cardsDisposal.push(card);
  });
  return cardsDisposal.sort(() => Math.random() - 0.5);
}

function insertCardsIntoTheBoard(cards) {
  board.innerHTML = '';
  cards.forEach(cardImg => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-front">
        <img src='./cards/Front.png'>
      </div>
      <div class="card-back">
        <img src='${cardImg}'>
      </div>
    `;
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });
}

// ---------- LÓGICA DO JOGO ----------
function flipCard(card) {
  if (card.classList.contains("is-flipped") || (firstCard && secondCard)) return;

  card.classList.add("is-flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  } else {
    secondCard = card;
    plays++;
  }

  if (firstCard.innerHTML === secondCard.innerHTML) {
    hits++;
    resetPlay();
  } else {
    setTimeout(unflipCardsAndResetPlay, SECOND);
  }

  checkEndOfGame();
}

function unflipCardsAndResetPlay() {
  firstCard.classList.remove("is-flipped");
  secondCard.classList.remove("is-flipped");
  resetPlay();
}

function resetPlay() {
  firstCard = undefined;
  secondCard = undefined;
}

// ---------- FIM DO JOGO ----------
function checkEndOfGame() {
  if (hits === CARDS_IMGS.length) {
    setTimeout(finishGame, SECOND / 2);
  }
}

function finishGame() {
  document.body.style.backgroundColor = "#1da64a";
  restartBtn.style.display = "block";
  playsCount.textContent = `Você ganhou em ${plays} jogada(s)!`;
  winMessage.classList.remove("hidden");
}

// ---------- BOTÃO REINICIAR ----------
restartBtn.addEventListener("click", () => {
  location.reload();
});

