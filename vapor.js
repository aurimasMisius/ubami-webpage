// Vaporwave covers: clicking a cover reveals the real photos underneath.
(function () {
  document.querySelectorAll('.vw-toggle').forEach(function (btn) {
    var fig = btn.closest('.vw-fig');
    var more = document.getElementById(btn.getAttribute('aria-controls'));
    var real = fig.querySelector('.vw-real');
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      if (open && real) real.loading = 'eager';
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', btn.getAttribute('aria-label').replace(open ? 'rodyti tikras nuotraukas' : 'rodyti vaporwave versiją', open ? 'rodyti vaporwave versiją' : 'rodyti tikras nuotraukas'));
      fig.classList.toggle('is-real', open);
      if (more) more.hidden = !open;
    });
  });
})();
