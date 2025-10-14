document.querySelectorAll('.instrumento').forEach(instr => {
  instr.addEventListener('click', () => {
    const som = instr.dataset.som;
    const audio = new Audio(som);
    audio.currentTime = 0;
    audio.play().catch(err => console.warn('Som não encontrado:', som));
  });
});
