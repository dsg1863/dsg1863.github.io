const cardImages = [
    'kim.jpg', 
    'superchoque.jpg', 
    'padrinhosmg.jpg', 
    'meninassp.jpg', 
    'tresespias.jpg', 
    'jakeodragao.jpg'
];


const cards = [...cardImages, ...cardImages];


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function createCards() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    
    shuffle(cards);

    cards.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);

        const img = document.createElement('img');
        img.src = `images/${image}`; 
        img.alt = image.split('.')[0];
        card.appendChild(img);

        card.addEventListener('click', flipCard);

        gameBoard.appendChild(card);
    });
}


let flippedCards = [];
let matchedCards = 0;


function flipCard(event) {
    const card = event.target;
    
    if (card.classList.contains('flipped') || flippedCards.length === 2) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}


function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.querySelector('img').src === card2.querySelector('img').src) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards += 2;
        
        if (matchedCards === cards.length) {
            setTimeout(() => alert('Arrasou!'), 500);
        }

        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}


function resetGame() {
    matchedCards = 0;
    flippedCards = [];
    createCards();
}

document.getElementById('reset-btn').addEventListener('click', resetGame);


createCards();
