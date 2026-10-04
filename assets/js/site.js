// Site behaviour: dropdown menus, project filters, copy-email, parallax and the hero sensor chart.
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- dropdowns ---------- */
  var dds = [].slice.call(document.querySelectorAll('.dd'));
  var hover = window.matchMedia('(hover: hover)');
  function closeAll(except) {
    dds.forEach(function (d) {
      if (d !== except) { d.classList.remove('open'); d.querySelector('button').setAttribute('aria-expanded', 'false'); }
    });
  }
  dds.forEach(function (d) {
    var b = d.querySelector('button'), t;
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var o = !d.classList.contains('open');
      closeAll(d); d.classList.toggle('open', o); b.setAttribute('aria-expanded', String(o));
    });
    d.addEventListener('mouseenter', function () { if (hover.matches) { clearTimeout(t); closeAll(d); d.classList.add('open'); b.setAttribute('aria-expanded', 'true'); } });
    d.addEventListener('mouseleave', function () { if (hover.matches) { t = setTimeout(function () { d.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); }, 160); } });
  });
  document.addEventListener('click', function () { closeAll(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

  /* ---------- project filters (work page) ---------- */
  var filters = document.getElementById('filters');
  if (filters) {
    var chips = [].slice.call(filters.querySelectorAll('.chip'));
    var cards = [].slice.call(document.querySelectorAll('#workCards .card'));
    chips.forEach(function (ch) {
      ch.addEventListener('click', function () {
        chips.forEach(function (x) { x.setAttribute('aria-pressed', String(x === ch)); });
        var c = ch.getAttribute('data-c');
        cards.forEach(function (card) { card.hidden = !(c === 'all' || card.getAttribute('data-cat') === c); });
      });
    });
  }

  /* ---------- copy email ---------- */
  var copy = document.getElementById('copy');
  if (copy) {
    copy.addEventListener('click', function () {
      var text = copy.getAttribute('data-copy');
      function done(label) { copy.textContent = label; setTimeout(function () { copy.textContent = 'Copy'; }, 1600); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done('Copied'); }, function () { done('Press Ctrl+C'); });
      else done('Press Ctrl+C');
    });
  }

  /* ---------- hero sensor chart (3 parallax depths) ---------- */
  var field = document.getElementById('field'), DATA = null;
  function css(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
  function buildData() {
    var seed = 7, r = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }, cols = [], far = [];
    for (var i = 0; i < 64; i++) {
      var a = (i - 46) / (i < 46 ? 6 : 2.4), spike = Math.exp(-a * a);
      cols.push({ v: 0.34 + Math.sin(i / 5) * 0.06 + (r() - 0.5) * 0.1 + spike * 0.4, flag: spike > 0.55 && i <= 46 });
    }
    for (var j = 0; j < 140; j++) far.push([r(), r(), r()]);
    return { cols: cols, far: far };
  }
  function drawField() {
    if (!field) return;
    if (!DATA) DATA = buildData();
    var dpr = Math.min(window.devicePixelRatio || 1, 2), w = field.clientWidth, h = field.clientHeight;
    if (field.width !== Math.round(w * dpr) || field.height !== Math.round(h * dpr)) { field.width = Math.round(w * dpr); field.height = Math.round(h * dpr); }
    var g = field.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, w, h);
    var y = reduce ? 0 : window.scrollY, mob = w < 900;
    var hair = css('--hair'), c1 = css('--c1'), c3 = css('--c3'), c4 = css('--c4'), hi = css('--hi');
    // depth 1: far dust (slowest)
    g.fillStyle = hair;
    DATA.far.forEach(function (d) { var x = d[0] * w, yy = ((d[1] * h * 1.3) - y * 0.08) % (h * 1.3); g.beginPath(); g.arc(x, yy, 1 + d[2] * 1.4, 0, 7); g.fill(); });
    // depth 2: barcode of sensor readings
    var x0 = mob ? 16 : Math.max(32, (w - 1180) / 2 + 32), x1 = w - x0, base = h - 44, top = h - (mob ? 190 : 205), off = y * 0.18;
    var n = DATA.cols.length, step = (x1 - x0) / (n - 1);
    g.strokeStyle = hair; g.lineWidth = 1; g.setLineDash([2, 4]); g.beginPath();
    g.moveTo(x0, base - (base - top) * 0.55 - off); g.lineTo(x1, base - (base - top) * 0.55 - off); g.stroke(); g.setLineDash([]);
    DATA.cols.forEach(function (c, i) {
      var x = x0 + i * step, yy = base - (base - top) * c.v - off;
      g.strokeStyle = hair; g.beginPath(); g.moveTo(x, base - off); g.lineTo(x, yy); g.stroke();
      g.fillStyle = c.flag ? hi : (i % 3 === 0 ? c1 : c3); g.beginPath(); g.arc(x, yy, c.flag ? 4.2 : 2.6, 0, 7); g.fill();
      if (i % 7 === 3) { g.fillStyle = c4; g.beginPath(); g.arc(x, base - off, 2, 0, 7); g.fill(); }
    });
    // depth 3: annotation (fastest)
    var pk = DATA.cols.reduce(function (m, c, i) { return c.v > m.v ? { v: c.v, i: i } : m; }, { v: 0, i: 0 });
    var px = x0 + pk.i * step, py = base - (base - top) * pk.v - y * 0.3;
    g.strokeStyle = hi; g.lineWidth = 1.2; g.beginPath(); g.arc(px, py, 10, 0, 7); g.stroke();
    g.fillStyle = css('--amber-text'); g.font = '600 12px Figtree, sans-serif'; g.textAlign = 'right';
    g.fillText('drift flagged · 6 h early', px - 16, py + 4);
  }
  if (field) {
    drawField();
    window.addEventListener('resize', drawField);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', drawField);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawField);
  }

  /* ---------- parallax ---------- */
  var layers = [].slice.call(document.querySelectorAll('[data-speed]')), ticking = false;
  function onScroll() {
    ticking = false;
    if (reduce) return;
    var y = window.scrollY;
    layers.forEach(function (l) { l.style.transform = 'translate3d(0,' + (y * parseFloat(l.getAttribute('data-speed'))).toFixed(1) + 'px,0)'; });
    if (field && y < 900) drawField();
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
})();
