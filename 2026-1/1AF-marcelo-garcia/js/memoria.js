const tabuleiro = document.getElementById('tabuleiro');
const tentativasElemento = document.getElementById('tentativas');
let cartasViradas = [];
let paresEncontrados = 0;
let tentativas = 0;
let bloqueado = false;

const icones = ['🔮', '🎸', '💀', '🌙', '⚡', '🕯️', '🔮', '🎸', '💀', '🌙', '⚡', '🕯️'];

function embaralhar(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    return lista;
}

function criarTabuleiro() {
    const iconesEmbaralhados = embaralhar(icones);
    tabuleiro.innerHTML = '';
    
    iconesEmbaralhados.forEach(icone => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.valor = icone;

        carta.innerHTML = `
            <div class="face verso"></div>
            <div class="face frente">${icone}</div>
        `;

        carta.addEventListener('click', virarCarta);
        tabuleiro.appendChild(carta);
    });
}

function virarCarta() {
    if (bloqueado || this.classList.contains('virada')) return;

    this.classList.add('virada');
    cartasViradas.push(this);

    if (cartasViradas.length === 2) {
        checarPar();
    }
}

function checarPar() {
    bloqueado = true;
    tentativas++;
    tentativasElemento.innerText = tentativas;

    const [carta1, carta2] = cartasViradas;

    if (carta1.dataset.valor === carta2.dataset.valor) {
        
        paresEncontrados++;
        cartasViradas = [];
        bloqueado = false;
        
        if (paresEncontrados === icones.length / 2) {
            setTimeout(() => alert('Parabéns! Você encontrou todos os segredos!'), 500);
        }
    } else {
    
        setTimeout(() => {
            carta1.classList.remove('virada');
            carta2.classList.remove('virada');
            cartasViradas = [];
            bloqueado = false;
        }, 1000);
    }
}


function reiniciarJogo() {
    paresEncontrados = 0;
    tentativas = 0;
    tentativasElemento.innerText = tentativas;
    cartasViradas = [];
    bloqueado = false;
    criarTabuleiro();
}


criarTabuleiro();