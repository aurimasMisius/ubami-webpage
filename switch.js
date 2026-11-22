// Temporary layout switcher: lets you compare home page versions.
// Remembers the chosen version so the logo and "Projektai" link lead back to it.
(function () {
  var versions = [
    { file: 'index.html', label: 'Tinklelis' },
    { file: 'apzvalga.html', label: 'Ilgas puslapis' },
    { file: 'sarasas.html', label: 'Sąrašas' },
    { file: 'skaidres.html', label: 'Skaidrės' },
    { file: 'linija.html', label: 'Linija' },
    { file: 'medziagos.html', label: 'Medžiagos' },
    { file: 'darbai.html', label: 'Studija ir darbai' },
    { file: 'vaporwave.html', label: 'Vaporwave' }
  ];
  var KEY = 'ubami-version';

  // Path prefix to site root, derived from this script's own URL.
  var me = document.currentScript || document.querySelector('script[src*="switch.js"]');
  var prefix = me.getAttribute('src').indexOf('../') === 0 ? '../' : '';

  var page = location.pathname.split('/').pop() || 'index.html';
  var onHome = prefix === '' && versions.some(function (v) { return v.file === page; });

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  if (onHome) write(page);
  var chosen = read();
  if (!versions.some(function (v) { return v.file === chosen; })) chosen = 'index.html';
  var current = onHome ? page : chosen;

  // Point logo and "Projektai" at the chosen version.
  var home = prefix + chosen;
  var logo = document.querySelector('.logo');
  var proj = document.querySelector('.nav a');
  if (logo) logo.setAttribute('href', home);
  if (proj) proj.setAttribute('href', home);

  var bar = document.createElement('nav');
  bar.className = 'vswitch';
  bar.setAttribute('aria-label', 'Dizaino versija');
  var html = '<span class="vswitch-label">Versija</span>';
  versions.forEach(function (v, i) {
    var cur = v.file === current ? ' aria-current="true"' : '';
    html += '<a href="' + prefix + v.file + '"' + cur + ' title="' + v.label + '">' +
      '<b>' + (i + 1) + '</b><span>' + v.label + '</span></a>';
  });
  bar.innerHTML = html;
  document.body.appendChild(bar);
})();
