/* MEDIA87 — shared interaction engine */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---------- word-split headlines ---------- */
  function splitWords(el, counter) {
    Array.from(el.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const mask = document.createElement('span');
          mask.className = 'wm';
          const inner = document.createElement('span');
          inner.textContent = part;
          inner.style.transitionDelay = (counter.i++ * 55) + 'ms';
          mask.appendChild(inner);
          frag.appendChild(mask);
        });
        node.replaceWith(frag);
      } else if (node.nodeType === 1 && node.tagName !== 'BR') {
        splitWords(node, counter);
      }
    });
  }
  document.querySelectorAll('[data-split]').forEach(el => splitWords(el, { i: 0 }));

  /* ---------- reveal observer ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal, [data-split]').forEach(el => io.observe(el));

  /* ---------- header + mobile menu + dropdown ---------- */
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  if (burger) burger.addEventListener('click', () => header.classList.toggle('menu-open'));
  document.querySelectorAll('.nav-links > a').forEach(a =>
    a.addEventListener('click', () => header.classList.remove('menu-open')));
  document.querySelectorAll('.nav-drop > button').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const drop = btn.parentElement;
      const wasOpen = drop.classList.contains('open');
      document.querySelectorAll('.nav-drop.open').forEach(d => d.classList.remove('open'));
      if (!wasOpen) drop.classList.add('open');
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-drop'))
      document.querySelectorAll('.nav-drop.open').forEach(d => d.classList.remove('open'));
  });

  /* ---------- counters ---------- */
  const counterIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target, target = parseFloat(el.dataset.count), suffix = el.dataset.suffix || '';
      const decimals = String(el.dataset.count).includes('.') ? 1 : 0;
      const start = performance.now(), dur = 1700;
      (function tick(now) {
        const p = Math.min((now - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(start);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterIO.observe(el));

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!open) {
        item.classList.add('open');
        const a = item.querySelector('.faq-a');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- card tilt ---------- */
  if (!reduced && finePointer) {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform .6s cubic-bezier(.19,1,.22,1)';
        card.style.transform = '';
        setTimeout(() => card.style.transition = '', 600);
      });
    });
  }

  /* ---------- magnetic buttons ---------- */
  if (!reduced && finePointer) {
    document.querySelectorAll('[data-magnet]').forEach(el => {
      const strength = parseFloat(el.dataset.magnet) || 0.3;
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform .5s cubic-bezier(.19,1,.22,1)';
        el.style.transform = '';
        setTimeout(() => el.style.transition = '', 500);
      });
    });
  }

  /* ---------- custom cursor ---------- */
  if (!reduced && finePointer) {
    document.body.classList.add('has-cursor');
    const dot = document.createElement('div'), ring = document.createElement('div');
    dot.className = 'cursor-dot'; ring.className = 'cursor-ring';
    document.body.append(dot, ring);
    let mx = -100, my = -100, rx = -100, ry = -100;
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function cursorLoop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      const half = ring.offsetWidth / 2;
      ring.style.transform = `translate(${rx - half}px, ${ry - half}px)`;
      requestAnimationFrame(cursorLoop);
    })();
    document.querySelectorAll('a, button, .faq-q, [data-tilt]').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
  }

  /* ---------- chat simulation ---------- */
  const chatBody = document.getElementById('chatBody');
  if (chatBody && window.CHAT_SCRIPT) {
    const typing = document.getElementById('chatTyping');
    let started = false;
    const playChat = () => {
      if (started) return; started = true;
      let delay = reduced ? 0 : 500;
      window.CHAT_SCRIPT.forEach(m => {
        if (m.from === 'bot') {
          setTimeout(() => typing && typing.classList.add('show'), delay);
          delay += reduced ? 0 : 900;
          setTimeout(() => {
            typing && typing.classList.remove('show');
            const d = document.createElement('div');
            d.className = 'msg bot';
            d.innerHTML = `<span class="m-tag">${m.tag || 'ChatZen AI'}</span>${m.text}`;
            chatBody.appendChild(d);
            requestAnimationFrame(() => requestAnimationFrame(() => d.classList.add('show')));
          }, delay);
          delay += reduced ? 60 : 1100;
        } else {
          setTimeout(() => {
            const d = document.createElement('div');
            d.className = 'msg user';
            d.textContent = m.text;
            chatBody.appendChild(d);
            requestAnimationFrame(() => requestAnimationFrame(() => d.classList.add('show')));
          }, delay);
          delay += reduced ? 60 : 1300;
        }
      });
    };
    new IntersectionObserver((es, o) => {
      es.forEach(e => { if (e.isIntersecting) { playChat(); o.disconnect(); } });
    }, { threshold: 0.4 }).observe(chatBody);
  }

  /* ---------- WebGL mesh headline ---------- */
  (function initMeshHero() {
    const wrap = document.getElementById('meshHero');
    if (!wrap) return;
    const canvas = wrap.querySelector('canvas');
    const fallback = document.getElementById('heroFallback');
    if (!canvas || !fallback || reduced) return;
    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: true });
    if (!gl) return;

    const GRID_W = 96, GRID_H = 40, DRAG = 1.8, SPRING_K = 0.08, DAMPING = 0.9, DT = 0.1, CHROMA = 0.005;

    const VERT_SRC = `#version 300 es
in vec2 aPos; in vec2 aUv; in vec2 aDisp;
out vec2 vUv; out float vMag;
void main(){ gl_Position = vec4(aPos + aDisp, 0.0, 1.0); vUv = aUv; vMag = length(aDisp); }`;

    const FRAG_SRC = `#version 300 es
precision highp float;
in vec2 vUv; in float vMag; out vec4 outColor;
uniform sampler2D uTex; uniform float uChroma; uniform vec3 uColorA; uniform vec3 uColorB;
void main(){
    vec4 base = texture(uTex, vUv);
    if (uChroma > 0.0) {
        float o = uChroma * ${CHROMA.toFixed(5)} * clamp(vMag * 8.0, 0.0, 1.0);
        float aOff = texture(uTex, vUv + vec2(o, 0.0)).a;
        float bOff = texture(uTex, vUv - vec2(o, 0.0)).a;
        vec3 col = base.rgb * base.a;
        col += uColorA * max(0.0, aOff - base.a);
        col += uColorB * max(0.0, bOff - base.a);
        outColor = vec4(col, max(base.a, max(aOff, bOff)));
    } else {
        outColor = base;
    }
}`;

    function compile(type, src) {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) { console.error(gl.getShaderInfoLog(sh)); return null; }
      return sh;
    }
    const vs = compile(gl.VERTEX_SHADER, VERT_SRC);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const aPos = gl.getAttribLocation(program, 'aPos');
    const aUv = gl.getAttribLocation(program, 'aUv');
    const aDisp = gl.getAttribLocation(program, 'aDisp');
    const uTex = gl.getUniformLocation(program, 'uTex');
    const uChroma = gl.getUniformLocation(program, 'uChroma');
    const uColorA = gl.getUniformLocation(program, 'uColorA');
    const uColorB = gl.getUniformLocation(program, 'uColorB');

    const vertCount = (GRID_W + 1) * (GRID_H + 1);
    const positions = new Float32Array(vertCount * 2);
    const uvs = new Float32Array(vertCount * 2);
    for (let y = 0; y <= GRID_H; y++) {
      for (let x = 0; x <= GRID_W; x++) {
        const i = y * (GRID_W + 1) + x, u = x / GRID_W, v = y / GRID_H;
        positions[i * 2] = u * 2 - 1;
        positions[i * 2 + 1] = 1 - v * 2;
        uvs[i * 2] = u;
        uvs[i * 2 + 1] = v;
      }
    }
    const indexCount = GRID_W * GRID_H * 6;
    const indices = new Uint32Array(indexCount);
    let idx = 0;
    for (let y = 0; y < GRID_H; y++) {
      for (let x = 0; x < GRID_W; x++) {
        const a = y * (GRID_W + 1) + x, b = a + 1, c = a + (GRID_W + 1), d = c + 1;
        indices[idx++] = a; indices[idx++] = c; indices[idx++] = b;
        indices[idx++] = b; indices[idx++] = c; indices[idx++] = d;
      }
    }
    const disp = new Float32Array(vertCount * 2);
    const vel = new Float32Array(vertCount * 2);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const uvBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aUv);
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0);
    const dispBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, dispBuf);
    gl.bufferData(gl.ARRAY_BUFFER, disp, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(aDisp);
    gl.vertexAttribPointer(aDisp, 2, gl.FLOAT, false, 0, 0);
    const idxBuf = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const INK = '#0a0c09', LIME = '#c8f542';
    const LINES = (window.MESH_CONFIG && window.MESH_CONFIG.lines) || [
      [{ t: 'Digital marketing', color: INK }],
      [{ t: 'built for ', color: INK }, { t: 'growth.', color: INK, hl: LIME }],
    ];
    function rrect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }
    function drawTexture(w, h) {
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      const setFont = s => ctx.font = `800 ${s}px Sora, sans-serif`;
      let size = 100;
      setFont(size);
      const lineWidth = segs => segs.reduce((acc, s) => acc + ctx.measureText(s.t).width, 0);
      const maxW = Math.max(...LINES.map(lineWidth));
      size = Math.floor(size * (w * 0.94) / maxW);
      const lineH = 1.12;
      size = Math.min(size, Math.floor((h * 0.88) / (LINES.length * lineH)));
      setFont(size);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      const totalH = LINES.length * size * lineH;
      let y = (h - totalH) / 2 + (size * lineH) / 2;
      LINES.forEach(segs => {
        const lw = lineWidth(segs);
        let x = (w - lw) / 2;
        segs.forEach(seg => {
          const sw = ctx.measureText(seg.t).width;
          if (seg.hl) {
            const pad = size * 0.12, bw = sw + pad * 2, bh = size * 1.14;
            ctx.save();
            ctx.translate(x - pad + bw / 2, y);
            ctx.rotate(-1.2 * Math.PI / 180);
            ctx.fillStyle = seg.hl;
            rrect(ctx, -bw / 2, -bh / 2, bw, bh, size * 0.12);
            ctx.fill();
            ctx.restore();
          }
          ctx.fillStyle = seg.color;
          ctx.fillText(seg.t, x, y);
          x += sw;
        });
        y += size * lineH;
      });
      return c;
    }
    async function rebuildTex() {
      const w = canvas.width, h = canvas.height;
      if (w < 2 || h < 2) return;
      try { if (document.fonts && document.fonts.load) await document.fonts.load('800 100px Sora'); } catch (e) {}
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, drawTexture(w, h));
    }

    wrap.classList.add('on');
    fallback.classList.add('sr-only');

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    function resize() {
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(2, Math.round(rect.width * dpr));
      const h = Math.max(2, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        rebuildTex();
      }
    }
    new ResizeObserver(resize).observe(wrap);
    resize();
    rebuildTex();

    const cursor = { x: 99, y: 99, px: 99, py: 99, vx: 0, vy: 0, inside: false };
    wrap.addEventListener('pointermove', e => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = 1 - ((e.clientY - rect.top) / rect.height) * 2;
      if (!cursor.inside) { cursor.px = x; cursor.py = y; cursor.inside = true; }
      cursor.x = x;
      cursor.y = y;
    });
    wrap.addEventListener('pointerleave', () => {
      cursor.inside = false;
      cursor.x = 99; cursor.y = 99; cursor.vx = 0; cursor.vy = 0;
    });

    let heroVisible = true;
    new IntersectionObserver(es => es.forEach(e => heroVisible = e.isIntersecting)).observe(wrap);

    const COLS = [[0.427, 0.290, 1.0], [1.0, 0.478, 0.275]];

    function meshTick() {
      if (heroVisible) {
        cursor.vx = cursor.x - cursor.px;
        cursor.vy = cursor.y - cursor.py;
        if (Math.hypot(cursor.vx, cursor.vy) > 0.3) { cursor.vx = 0; cursor.vy = 0; }
        cursor.px = cursor.x;
        cursor.py = cursor.y;

        for (let i = 0; i < vertCount; i++) {
          const i2 = i * 2;
          const dx = disp[i2], dy = disp[i2 + 1];
          const cx = cursor.x - (positions[i2] + dx);
          const cy = cursor.y - (positions[i2 + 1] + dy);
          const proximity = Math.max(0, 1 / (1 + Math.hypot(cx, cy) / 0.05) - 0.1);
          let vx = vel[i2], vy = vel[i2 + 1];
          vx += cursor.vx * DRAG * proximity;
          vy += cursor.vy * DRAG * proximity;
          vx -= dx * SPRING_K;
          vy -= dy * SPRING_K;
          vx *= DAMPING;
          vy *= DAMPING;
          vel[i2] = vx;
          vel[i2 + 1] = vy;
          let ndx = dx + vx * DT, ndy = dy + vy * DT;
          if (ndx > 1) ndx = 1; else if (ndx < -1) ndx = -1;
          if (ndy > 1) ndy = 1; else if (ndy < -1) ndy = -1;
          disp[i2] = ndx;
          disp[i2 + 1] = ndy;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, dispBuf);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, disp);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.uniform1i(uTex, 0);
        gl.uniform1f(uChroma, 1.0);
        const ci = Math.floor(performance.now() / 400) % COLS.length;
        const cA = COLS[ci], cB = COLS[(ci + 1) % COLS.length];
        gl.uniform3f(uColorA, cA[0], cA[1], cA[2]);
        gl.uniform3f(uColorB, cB[0], cB[1], cB[2]);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.bindVertexArray(vao);
        gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_INT, 0);
      }
      requestAnimationFrame(meshTick);
    }
    requestAnimationFrame(meshTick);
  })();

  /* ---------- scroll-driven loop ---------- */
  const progress = document.getElementById('progress');
  const pxEls = [...document.querySelectorAll('[data-speed]')];
  const marquees = [...document.querySelectorAll('[data-marquee]')];
  const stackZone = document.getElementById('stackZone');
  const stackCards = stackZone ? [...stackZone.querySelectorAll('.stack-card')] : [];
  stackCards.forEach((card, i) => card.style.top = (110 + i * 16) + 'px');

  let docH = document.documentElement.scrollHeight - innerHeight;
  const measure = () => {
    docH = document.documentElement.scrollHeight - innerHeight;
    marquees.forEach(t => t._half = t.scrollWidth / 2);
  };
  addEventListener('resize', measure);
  addEventListener('load', measure);
  measure();

  const pxActive = new Set();
  const pxIO = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting ? pxActive.add(e.target) : pxActive.delete(e.target));
  }, { rootMargin: '15% 0px 15% 0px' });
  pxEls.forEach(el => pxIO.observe(el));

  let lastY = scrollY, velY = 0;

  function loop() {
    const y = scrollY;
    velY += ((y - lastY) - velY) * 0.08;
    lastY = y;

    if (progress) progress.style.transform = `scaleX(${docH > 0 ? y / docH : 0})`;
    if (header) header.classList.toggle('scrolled', y > 12);

    pxActive.forEach(el => {
      const r = el.getBoundingClientRect();
      const off = (r.top + r.height / 2 - innerHeight / 2) * parseFloat(el.dataset.speed);
      const baseX = el.classList.contains('ghost') ? '-50%' : '0px';
      el.style.transform = `translate3d(${baseX}, ${off.toFixed(1)}px, 0)`;
    });

    marquees.forEach(track => {
      const dir = track.dataset.marquee === 'rev' ? -1 : 1;
      const boost = Math.max(-7, Math.min(7, velY * 0.35));
      track._x = (track._x || 0) - (0.55 + boost) * dir;
      const half = track._half || 1;
      if (track._x <= -half) track._x += half;
      if (track._x > 0) track._x -= half;
      track.style.transform = `translate3d(${track._x.toFixed(1)}px, 0, 0)`;
    });

    if (stackCards.length) {
      const zr = stackZone.getBoundingClientRect();
      if (zr.top < innerHeight && zr.bottom > 0) {
        for (let i = 0; i < stackCards.length - 1; i++) {
          const stickyTop = 110 + i * 16;
          const nextTop = stackCards[i + 1].getBoundingClientRect().top;
          const p = Math.min(Math.max(1 - (nextTop - stickyTop) / (innerHeight * 0.65), 0), 1);
          const inner = stackCards[i].querySelector('.stack-inner');
          inner.style.transform = `scale(${(1 - p * 0.05).toFixed(3)})`;
          inner.style.filter = `brightness(${(1 - p * 0.05).toFixed(3)})`;
        }
      }
    }

    requestAnimationFrame(loop);
  }

  if (!reduced) {
    requestAnimationFrame(loop);
  } else if (progress) {
    progress.style.display = 'none';
  }
})();
