/* lesson.js
   Shared code for every page: activity list, progress saving,
   chemistry helpers (formula parsing, atom tallies, particle drawings),
   page header/footer and a reusable multiple choice quiz. */
(function (global) {
  'use strict';

  /* ---------- Activity registry ---------- */
  const ACTIVITIES = [
    { id: 'nothing-is-lost', part: 1, file: 'nothing-is-lost.html', title: 'Nothing is lost', type: 'Reading', mins: 15,
      blurb: 'How Antoine and Marie-Anne Lavoisier weighed their way to one of the biggest laws in chemistry.' },
    { id: 'mass-detective', part: 1, file: 'mass-detective.html', title: 'Mass detective', type: 'Prediction', mins: 10,
      blurb: 'Twelve experiments on a balance. Will the reading go up, go down or stay the same?' },
    { id: 'mass-maths', part: 1, file: 'mass-maths.html', title: 'Mass maths', type: 'Practice', mins: 15,
      blurb: 'Use conservation of mass to find a missing mass. You get new questions every time.' },
    { id: 'anatomy', part: 2, file: 'anatomy-of-an-equation.html', title: 'Anatomy of an equation', type: 'Reading', mins: 15,
      blurb: 'Coefficients, subscripts, state symbols and arrows. Tap each part to see what it does.' },
    { id: 'formula-match', part: 2, file: 'formula-match.html', title: 'Formula match', type: 'Game', mins: 10,
      blurb: 'Pair each chemical name with its formula across three rounds that get harder.' },
    { id: 'word-equations', part: 2, file: 'word-equations.html', title: 'Word equation builder', type: 'Practice', mins: 15,
      blurb: 'Sort reactants from products, then use reaction patterns to predict what forms.' },
    { id: 'atom-counter', part: 2, file: 'atom-counter.html', title: 'Atom counter', type: 'Practice', mins: 10,
      blurb: 'Count every atom in a formula, including coefficients and brackets.' },
    { id: 'how-to-balance', part: 3, file: 'how-to-balance.html', title: 'How to balance', type: 'Reading', mins: 15,
      blurb: 'A step by step method with three worked examples you can click through.' },
    { id: 'balancing-lab', part: 3, file: 'balancing-lab.html', title: 'Balancing lab', type: 'Practice', mins: 25,
      blurb: 'Thirty-six equations across three levels, with a live atom tally and particle view.' },
    { id: 'spot-the-mistake', part: 3, file: 'spot-the-mistake.html', title: 'Spot the mistake', type: 'Error hunt', mins: 10,
      blurb: 'Other students have tried to balance these. Work out what went wrong, if anything.' },
    { id: 'final-challenge', part: 3, file: 'final-challenge.html', title: 'Final challenge', type: 'Challenge', mins: 20,
      blurb: 'Fifteen mixed questions on the whole lesson, with a results summary to show your teacher.' }
  ];

  const PARTS = {
    1: { name: 'Conservation of mass' },
    2: { name: 'Writing equations' },
    3: { name: 'Balancing equations' }
  };

  /* ---------- Progress (saved in the browser if allowed) ---------- */
  const KEY = 'seaford-y9-equations-v1';
  let memoryStore = {};
  function readStore() {
    try {
      const raw = global.localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return memoryStore; }
  }
  function writeStore(obj) {
    memoryStore = obj;
    try { global.localStorage.setItem(KEY, JSON.stringify(obj)); } catch (e) { /* storage blocked, keep in memory */ }
  }
  const Progress = {
    all() { return readStore(); },
    isDone(id) { return !!(readStore().done || {})[id]; },
    doneCount() { return ACTIVITIES.filter(a => this.isDone(a.id)).length; },
    markDone(id) {
      const s = readStore();
      s.done = s.done || {};
      const already = !!s.done[id];
      s.done[id] = true;
      writeStore(s);
      if (!already) {
        const badge = document.querySelector('.top-status');
        if (badge) { badge.textContent = 'Completed'; badge.classList.add('is-done'); }
        toast('Activity complete. It is ticked off on the home page.');
      }
    },
    get(field, fallback) { const s = readStore(); return field in s ? s[field] : fallback; },
    set(field, value) { const s = readStore(); s[field] = value; writeStore(s); },
    reset() { writeStore({}); }
  };

  /* ---------- Small DOM helpers ---------- */
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === 'class') node.className = attrs[k];
        else if (k === 'html') node.innerHTML = attrs[k];
        else if (k === 'text') node.textContent = attrs[k];
        else if (k.startsWith('on')) node.addEventListener(k.slice(2), attrs[k]);
        else node.setAttribute(k, attrs[k]);
      }
    }
    (children || []).forEach(c => { if (c != null) node.append(c); });
    return node;
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const randInt = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const round1 = n => Math.round(n * 10) / 10;

  let toastTimer;
  function toast(msg) {
    let t = document.querySelector('.toast');
    if (!t) { t = el('div', { class: 'toast', role: 'status', 'aria-live': 'polite' }); document.body.append(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3800);
  }

  /* ---------- Chemistry helpers ---------- */
  const NAMES = {
    H: 'hydrogen', C: 'carbon', N: 'nitrogen', O: 'oxygen', F: 'fluorine', Na: 'sodium', Mg: 'magnesium',
    Al: 'aluminium', P: 'phosphorus', S: 'sulfur', Cl: 'chlorine', K: 'potassium', Ca: 'calcium', Fe: 'iron',
    Cu: 'copper', Zn: 'zinc', Br: 'bromine', Ag: 'silver', I: 'iodine', Pb: 'lead', Li: 'lithium', Mn: 'manganese'
  };
  // [fill, text colour]
  const COLOURS = {
    H: ['#FFFFFF', '#013148'], O: ['#F46E63', '#FFFFFF'], C: ['#33434C', '#FFFFFF'], N: ['#3F7FC4', '#FFFFFF'],
    Cl: ['#7AC698', '#013148'], Na: ['#8E6CC9', '#FFFFFF'], Mg: ['#BDD675', '#013148'], Fe: ['#C9773B', '#FFFFFF'],
    Al: ['#AEB9C2', '#013148'], Ca: ['#E6CF93', '#013148'], S: ['#F2D14B', '#013148'], K: ['#C38FD9', '#013148'],
    Zn: ['#8196AB', '#FFFFFF'], Cu: ['#B8652E', '#FFFFFF'], Li: ['#F38C9F', '#013148'], Br: ['#8B3A3A', '#FFFFFF'],
    I: ['#5E3C99', '#FFFFFF'], Pb: ['#5A6570', '#FFFFFF'], P: ['#F2A65A', '#013148'], Ag: ['#D5DDE3', '#013148'],
    Mn: ['#9C6B8E', '#FFFFFF'], F: ['#C0E7F8', '#013148']
  };

  // Parse a formula such as "Al2(SO4)3" into { Al: 2, S: 3, O: 12 } keeping first-seen order
  function parse(formula) {
    const tokens = formula.match(/[A-Z][a-z]?|\d+|\(|\)/g) || [];
    const stack = [[]]; // arrays of [element, count] pairs so order is kept
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      const next = tokens[i + 1];
      const mult = next && /^\d+$/.test(next) ? parseInt(next, 10) : 1;
      if (t === '(') { stack.push([]); }
      else if (t === ')') {
        const group = stack.pop();
        group.forEach(([e, n]) => stack[stack.length - 1].push([e, n * mult]));
        if (mult !== 1 || (next && /^\d+$/.test(next))) i++;
      } else if (/^[A-Z]/.test(t)) {
        stack[stack.length - 1].push([t, mult]);
        if (next && /^\d+$/.test(next)) i++;
      }
    }
    const out = {};
    stack[0].forEach(([e, n]) => { out[e] = (out[e] || 0) + n; });
    return out;
  }

  // "Ca(OH)2" -> "Ca(OH)<sub>2</sub>"
  function fhtml(formula) { return formula.replace(/(\d+)/g, '<sub>$1</sub>'); }
  function withCoef(c, formula) { return (c > 1 ? '<span class="coef">' + c + '</span>' : '') + fhtml(formula); }

  // Equation object: { reactants: ['H2','O2'], products: ['H2O'] }
  function sideCounts(species, coefs) {
    const out = {};
    species.forEach((f, i) => {
      const p = parse(f);
      for (const e in p) out[e] = (out[e] || 0) + p[e] * coefs[i];
    });
    return out;
  }
  function elementsIn(eq) {
    const order = [];
    eq.reactants.concat(eq.products).forEach(f => Object.keys(parse(f)).forEach(e => { if (!order.includes(e)) order.push(e); }));
    return order;
  }
  // coefs is one flat array: reactant coefficients then product coefficients
  function tally(eq, coefs) {
    const r = eq.reactants.length;
    const left = sideCounts(eq.reactants, coefs.slice(0, r));
    const right = sideCounts(eq.products, coefs.slice(r));
    return elementsIn(eq).map(e => ({ el: e, left: left[e] || 0, right: right[e] || 0 }));
  }
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  function status(eq, coefs) {
    const rows = tally(eq, coefs);
    const balanced = rows.every(r => r.left === r.right);
    const g = coefs.reduce((a, b) => gcd(a, b));
    return { rows, balanced, simplest: g === 1, divisor: g };
  }
  function equationHTML(eq, coefs) {
    const r = eq.reactants.length;
    const L = eq.reactants.map((f, i) => withCoef(coefs[i], f)).join(' <span class="op">+</span> ');
    const R = eq.products.map((f, i) => withCoef(coefs[r + i], f)).join(' <span class="op">+</span> ');
    return L + ' <span class="op arrow">&rarr;</span> ' + R;
  }

  // Draw one molecule as a little cluster of atom circles
  function molecule(formula) {
    const p = parse(formula);
    const total = Object.values(p).reduce((a, b) => a + b, 0);
    const mol = el('span', { class: 'mol', title: formula });
    mol.style.setProperty('--cols', String(total <= 4 ? total : total <= 6 ? 3 : 4));
    for (const e in p) {
      for (let k = 0; k < p[e]; k++) {
        const c = COLOURS[e] || ['#DDD', '#013148'];
        const a = el('span', { class: 'atom' + (e === 'H' ? ' atom-h' : ''), text: e });
        a.style.background = c[0];
        a.style.color = c[1];
        mol.append(a);
      }
    }
    return mol;
  }
  function atomCount(formula) { return Object.values(parse(formula)).reduce((a, b) => a + b, 0); }

  // Particle picture for a whole side. Returns null if too many atoms to draw clearly.
  function particleSide(species, coefs, maxAtoms) {
    let total = 0;
    species.forEach((f, i) => { total += atomCount(f) * coefs[i]; });
    if (total > (maxAtoms || 60)) return null;
    const wrap = el('div', { class: 'particle-side' });
    species.forEach((f, i) => {
      const group = el('div', { class: 'particle-group' });
      for (let k = 0; k < coefs[i]; k++) group.append(molecule(f));
      group.append(el('span', { class: 'particle-label', html: withCoef(coefs[i], f) }));
      wrap.append(group);
    });
    return wrap;
  }
  function legend(elements) {
    const wrap = el('div', { class: 'legend' });
    elements.forEach(e => {
      const c = COLOURS[e] || ['#DDD', '#013148'];
      const a = el('span', { class: 'atom' + (e === 'H' ? ' atom-h' : ''), text: e });
      a.style.background = c[0]; a.style.color = c[1];
      wrap.append(el('span', { class: 'legend-item' }, [a, document.createTextNode(' ' + (NAMES[e] || e))]));
    });
    return wrap;
  }

  // Stepper for coefficients
  function stepper(opts) {
    const { value = 1, min = 1, max = 15, label = 'coefficient', onChange } = opts;
    let v = value;
    const out = el('span', { class: 'coef-val', 'aria-live': 'polite', text: String(v) });
    const set = n => {
      v = Math.max(min, Math.min(max, n));
      out.textContent = String(v);
      down.disabled = v <= min; up.disabled = v >= max;
      if (onChange) onChange(v);
    };
    const up = el('button', { type: 'button', class: 'step up', 'aria-label': 'Increase ' + label, html: '+' , onclick: () => set(v + 1) });
    const down = el('button', { type: 'button', class: 'step down', 'aria-label': 'Decrease ' + label, html: '&minus;', onclick: () => set(v - 1) });
    const node = el('span', { class: 'stepper' }, [up, out, down]);
    down.disabled = v <= min;
    return { node, get: () => v, set };
  }

  /* ---------- Multiple choice quiz block ---------- */
  // questions: [{ q, options: [...], answer: index, explain }]
  function mcq(container, questions, opts) {
    opts = opts || {};
    let answered = 0, score = 0;
    const scoreLine = el('p', { class: 'quiz-score', 'aria-live': 'polite' });
    questions.forEach((item, qi) => {
      const order = shuffle(item.options.map((o, i) => i));
      const fb = el('div', { class: 'feedback', hidden: '' });
      const list = el('div', { class: 'options' });
      const block = el('fieldset', { class: 'mcq' }, [
        el('legend', { html: '<span class="q-num">Question ' + (qi + 1) + '</span> ' + item.q }), list, fb
      ]);
      order.forEach(oi => {
        const b = el('button', { type: 'button', class: 'option', html: item.options[oi] });
        b.addEventListener('click', () => {
          const right = oi === item.answer;
          list.querySelectorAll('button').forEach(x => { x.disabled = true; });
          b.classList.add(right ? 'is-right' : 'is-wrong');
          if (!right) list.children[order.indexOf(item.answer)].classList.add('is-right');
          fb.hidden = false;
          fb.className = 'feedback ' + (right ? 'good' : 'bad');
          fb.innerHTML = '<strong>' + (right ? 'Correct.' : 'Not quite.') + '</strong> ' + (item.explain || '');
          answered++; if (right) score++;
          if (answered === questions.length) {
            scoreLine.textContent = 'You scored ' + score + ' out of ' + questions.length + '.';
            if (opts.onDone) opts.onDone(score, questions.length);
          }
        });
        list.append(b);
      });
      container.append(block);
    });
    container.append(scoreLine);
  }

  /* ---------- Page chrome for activity pages ---------- */
  function buildChrome() {
    const id = document.body.dataset.activity;
    if (!id) return;
    const idx = ACTIVITIES.findIndex(a => a.id === id);
    const act = ACTIVITIES[idx];
    document.body.classList.add('part-' + act.part);
    const done = Progress.isDone(id);

    const bar = el('header', { class: 'topbar' }, [
      el('div', { class: 'wrap topbar-inner' }, [
        el('a', { class: 'back', href: '../index.html', text: 'All activities' }),
        el('span', { class: 'top-where', text: 'Part ' + act.part + ': ' + PARTS[act.part].name + ', activity ' + (idx + 1) + ' of ' + ACTIVITIES.length }),
        el('span', { class: 'top-status' + (done ? ' is-done' : ''), text: done ? 'Completed' : 'Not finished yet' })
      ])
    ]);
    document.body.prepend(bar);

    const head = document.querySelector('.page-head');
    if (head) {
      head.prepend(el('p', { class: 'page-meta', text: act.type + ', about ' + act.mins + ' minutes' }));
    }

    const prev = ACTIVITIES[idx - 1], next = ACTIVITIES[idx + 1];
    const nav = el('nav', { class: 'pager wrap', 'aria-label': 'Activity navigation' }, [
      prev ? el('a', { class: 'btn btn-quiet', href: prev.file, text: 'Back to ' + prev.title }) : el('span'),
      next ? el('a', { class: 'btn btn-primary', href: next.file, text: 'Next: ' + next.title })
           : el('a', { class: 'btn btn-primary', href: '../index.html', text: 'Back to all activities' })
    ]);
    const main = document.querySelector('main');
    if (main) main.after(nav);
  }
  document.addEventListener('DOMContentLoaded', buildChrome);

  global.Lesson = {
    ACTIVITIES, PARTS, Progress, el, shuffle, randInt, pick, round1, toast, mcq, stepper,
    Chem: { NAMES, COLOURS, parse, fhtml, withCoef, tally, status, equationHTML, molecule, particleSide, legend, atomCount, sideCounts, elementsIn }
  };
})(typeof window !== 'undefined' ? window : globalThis);
