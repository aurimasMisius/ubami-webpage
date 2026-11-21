// Full-screen slides: smooth crossfade between projects.
// Wheel, arrow keys, swipe, or the side arrows move one slide at a time.
(function () {
  var wrap = document.querySelector('.sl-wrap');
  if (!wrap) return;
  var slides = Array.prototype.slice.call(wrap.querySelectorAll('.sl'));
  if (slides.length < 2) return;

  document.body.classList.add('sl-fade');
  var index = 0;
  var locked = false;
  var DURATION = 1200; // keep in sync with the CSS transition

  function show(next) {
    if (locked) return;
    next = (next + slides.length) % slides.length;
    if (next === index) return;
    locked = true;
    // Make sure the incoming image is loaded before fading.
    var img = slides[next].querySelector('img');
    if (img) img.loading = 'eager';
    slides[index].classList.remove('is-active');
    slides[next].classList.add('is-active');
    index = next;
    // Preload the one after.
    var after = slides[(index + 1) % slides.length].querySelector('img');
    if (after) after.loading = 'eager';
    setTimeout(function () { locked = false; }, DURATION);
  }

  slides[0].classList.add('is-active');
  var second = slides[1].querySelector('img');
  if (second) second.loading = 'eager';

  // Mouse wheel / trackpad
  var wheelAcc = 0;
  var wheelTimer;
  wrap.addEventListener('wheel', function (e) {
    e.preventDefault();
    wheelAcc += e.deltaY + e.deltaX;
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(function () { wheelAcc = 0; }, 200);
    if (Math.abs(wheelAcc) > 40) {
      show(index + (wheelAcc > 0 ? 1 : -1));
      wheelAcc = 0;
    }
  }, { passive: false });

  // Keyboard
  document.addEventListener('keydown', function (e) {
    if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].indexOf(e.key) > -1) { e.preventDefault(); show(index + 1); }
    if (['ArrowUp', 'ArrowLeft', 'PageUp'].indexOf(e.key) > -1) { e.preventDefault(); show(index - 1); }
  });

  // Touch swipe (vertical or horizontal)
  var sx = 0, sy = 0;
  wrap.addEventListener('touchstart', function (e) {
    sx = e.touches[0].clientX; sy = e.touches[0].clientY;
  }, { passive: true });
  wrap.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });
  wrap.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - sx;
    var dy = e.changedTouches[0].clientY - sy;
    var d = Math.abs(dy) > Math.abs(dx) ? dy : dx;
    if (Math.abs(d) > 40) {
      e.preventDefault();
      show(index + (d < 0 ? 1 : -1));
    }
  });

  // Side arrows
  function arrow(cls, label, step, symbol) {
    var b = document.createElement('button');
    b.className = 'sl-arrow ' + cls;
    b.setAttribute('aria-label', label);
    b.textContent = symbol;
    b.addEventListener('click', function () { show(index + step); });
    wrap.appendChild(b);
  }
  arrow('sl-prev', 'Ankstesnis projektas', -1, '←');
  arrow('sl-next', 'Kitas projektas', 1, '→');
})();
