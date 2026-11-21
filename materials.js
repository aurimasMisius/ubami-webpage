// Medžiagos: fade the page background to the material colour of the
// project in view. Without JS each section simply keeps its own colour.
(function () {
  var secs = document.querySelectorAll('[data-bg]');
  if (!('IntersectionObserver' in window) || !secs.length) return;
  var body = document.body;
  body.classList.add('md-fade');
  function apply(el) {
    body.style.setProperty('--page-bg', el.getAttribute('data-bg'));
    body.style.setProperty('--page-fg', el.getAttribute('data-fg'));
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) apply(e.target); });
  }, { rootMargin: '-45% 0px -45% 0px' });
  secs.forEach(function (s) { io.observe(s); });
})();
