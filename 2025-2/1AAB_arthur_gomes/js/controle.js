document.addEventListener('DOMContentLoaded', function() {
    const disco = document.querySelector('.disco');
    const pads = document.querySelectorAll('.pad');
    
    let isDragging = false;
    let currentRotation = 0;
    let startAngle = 0;
    let lastAngle = 0;
    let lastTime = 0;
    let velocity = 0;
    let animationId = null;
    let colorInterval = null;
    let audioContext = null;
    let noiseBuffer = null;
    
    // Configuração dos links do Spotify para cada pad
    const padLinks = {
        'pad1': 'https://open.spotify.com/playlist/37i9dQZF1EQrjpWhpIezMF',
        'pad2': 'https://open.spotify.com/playlist/7M2oFOty0r8OtDj1MiC0LL',
        'pad3': 'https://open.spotify.com/playlist/4ZImH9Prd9jXzJsHPYryfr',
        'pad4': 'https://open.spotify.com/playlist/4VNM20DFuJH1fTdnZJJgPJ'
    };
    
    // Inicializa o contexto de áudio e cria buffer de ruído
    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Cria buffer de ruído branco para som mais realista
            const bufferSize = audioContext.sampleRate * 0.1;
            noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }
        }
    }
    
    // Cria som de scratch mais realista
    function playScratchSound(speed) {
        if (!audioContext || !noiseBuffer) return;
        
        const now = audioContext.currentTime;
        
        // Source com ruído branco
        const source = audioContext.createBufferSource();
        source.buffer = noiseBuffer;
        source.loop = true;
        
        // Filtro passa-banda para simular fricção do vinil
        const filter = audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 800 + Math.abs(speed) * 50;
        filter.Q.value = 5;
        
        // Filtro passa-baixa adicional
        const lowpass = audioContext.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.value = 2000 + Math.abs(speed) * 100;
        
        // Controle de volume
        const gainNode = audioContext.createGain();
        const volume = Math.min(Math.abs(speed) * 0.015, 0.15);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(volume, now + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.08);
        
        // Conecta tudo
        source.connect(filter);
        filter.connect(lowpass);
        lowpass.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Toca e para
        source.start(now);
        source.stop(now + 0.08);
    }
    
    // Função para gerar uma cor RGB aleatória
    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    // Função para mudar cores dos pads
    function changePadColors() {
        pads.forEach(pad => {
            pad.style.backgroundColor = getRandomColor();
        });
    }
    
    // Interatividade dos pads
    pads.forEach(pad => {
        pad.addEventListener('mouseenter', () => {
            pad.style.backgroundColor = getRandomColor();
        });
        
        pad.addEventListener('click', (e) => {
            e.preventDefault();
            const link = padLinks[pad.id];
            if (link && !link.includes('SEU_LINK')) {
                window.open(link, '_blank');
            } else {
                alert(`Configure o link do Spotify para ${pad.id} no arquivo controle.js`);
            }
        });
    });
    
    // Função para calcular o ângulo
    function getAngle(e, element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX || e.touches?.[0]?.clientX;
        const mouseY = e.clientY || e.touches?.[0]?.clientY;
        
        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;
        
        return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    }
    
    // Animação de inércia
    function animateInertia() {
        if (Math.abs(velocity) > 0.1) {
            currentRotation += velocity;
            disco.style.transform = `rotate(${currentRotation}deg)`;
            
            if (Math.abs(velocity) > 1.5) {
                playScratchSound(velocity);
            }
            
            velocity *= 0.95;
            animationId = requestAnimationFrame(animateInertia);
        } else {
            velocity = 0;
            cancelAnimationFrame(animationId);
        }
    }
    
    // Mouse: arrastar o disco
    disco.addEventListener('mousedown', function(e) {
        initAudio();
        isDragging = true;
        startAngle = getAngle(e, disco) - currentRotation;
        lastAngle = currentRotation;
        lastTime = Date.now();
        velocity = 0;
        
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        
        colorInterval = setInterval(changePadColors, 200);
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const angle = getAngle(e, disco);
            currentRotation = angle - startAngle;
            disco.style.transform = `rotate(${currentRotation}deg)`;
            
            const currentTime = Date.now();
            const timeDelta = currentTime - lastTime;
            
            if (timeDelta > 0) {
                const angleDelta = currentRotation - lastAngle;
                velocity = angleDelta / timeDelta * 16;
                
                if (Math.abs(velocity) > 3) {
                    playScratchSound(velocity);
                }
                
                lastAngle = currentRotation;
                lastTime = currentTime;
            }
        }
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            animateInertia();
            clearInterval(colorInterval);
        }
    });
    
    // Touch: arrastar o disco
    disco.addEventListener('touchstart', function(e) {
        initAudio();
        isDragging = true;
        const touch = e.touches[0];
        startAngle = getAngle(touch, disco) - currentRotation;
        lastAngle = currentRotation;
        lastTime = Date.now();
        velocity = 0;
        
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        
        colorInterval = setInterval(changePadColors, 200);
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', function(e) {
        if (isDragging) {
            const touch = e.touches[0];
            const angle = getAngle(touch, disco);
            currentRotation = angle - startAngle;
            disco.style.transform = `rotate(${currentRotation}deg)`;
            
            const currentTime = Date.now();
            const timeDelta = currentTime - lastTime;
            
            if (timeDelta > 0) {
                const angleDelta = currentRotation - lastAngle;
                velocity = angleDelta / timeDelta * 16;
                
                if (Math.abs(velocity) > 3) {
                    playScratchSound(velocity);
                }
                
                lastAngle = currentRotation;
                lastTime = currentTime;
            }
        }
    });
    
    document.addEventListener('touchend', function() {
        if (isDragging) {
            isDragging = false;
            animateInertia();
            clearInterval(colorInterval);
        }
    });
});