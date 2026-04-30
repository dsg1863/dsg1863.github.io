// Cursor
const cdot = document.getElementById('cdot');
const cring = document.getElementById('cring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cdot.style.left = mx + 'px'; cdot.style.top = my + 'px';
});
(function loop() {
  rx += (mx - rx) * .1; ry += (my - ry) * .1;
  cring.style.left = rx + 'px'; cring.style.top = ry + 'px';
  requestAnimationFrame(loop);
})();

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
