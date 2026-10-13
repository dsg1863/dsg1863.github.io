
const cards = document.querySelectorAll('.card');
const container = document.querySelector('.container');

const TEMPO_ANIMACAO = 600;

cards.forEach((card) => {
    card.addEventListener('click', () => {
        const jaEstavaExpandido = card.classList.contains('expanded');

        
        cards.forEach((c) => c.classList.remove('expanded'));

        if (jaEstavaExpandido) {
            
            container.classList.remove('has-expanded');
        } else {
            
            card.classList.add('expanded');
            container.classList.add('has-expanded');

            
            setTimeout(() => {
                card.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, TEMPO_ANIMACAO);
        }
    });
});


let cardComMouse = null;
let mouseX = 0;
let mouseY = 0;
const posicaoBrilho = new WeakMap(); 

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

cards.forEach((card) => {
    card.addEventListener('mouseenter', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        posicaoBrilho.delete(card); 
        cardComMouse = card;
    });

    card.addEventListener('mouseleave', () => {
        if (cardComMouse === card) cardComMouse = null;
    });
});

function animarBrilho() {
    if (cardComMouse) {
        
        const r = cardComMouse.getBoundingClientRect();
        const alvoX = mouseX - r.left;
        const alvoY = mouseY - r.top;

        const p = posicaoBrilho.get(cardComMouse) || { x: alvoX, y: alvoY };
        p.x += (alvoX - p.x) * 0.15; 
        p.y += (alvoY - p.y) * 0.15;
        posicaoBrilho.set(cardComMouse, p);

        cardComMouse.style.setProperty('--mx', p.x + 'px');
        cardComMouse.style.setProperty('--my', p.y + 'px');
    }
    requestAnimationFrame(animarBrilho);
}

animarBrilho();