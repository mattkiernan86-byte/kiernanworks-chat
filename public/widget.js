/* =====================================================
   The assistant widget for kiernanworks.com
   =====================================================
   One script tag on a page:
     <script src="https://chat.kiernanworks.com/widget.js" defer></script>
   It draws a small button, bottom right, and a panel. Nothing loads until
   the visitor opens the panel: no Turnstile, no fonts, no requests. If the
   assistant is not configured the button never appears.

   No framework and no dependencies. Styles use the site's own tokens so
   the panel sits on the dark brass-on-ink pages as if it were born there.
   ===================================================== */
(function () {
  'use strict';
  if (window.__kwAssistant) return;
  window.__kwAssistant = true;

  var ORIGIN = (function () {
    var s = document.currentScript;
    try { return new URL(s ? s.src : 'https://chat.kiernanworks.com/widget.js').origin; }
    catch (e) { return 'https://chat.kiernanworks.com'; }
  })();
  var CONTACT = 'https://kiernanworks.com/contact?demo=shift';

  // A page that wants the assistant in its layout rather than in the
  // corner gives it a home: <div id="kw-assistant"></div>. Whatever is in
  // that element is left alone until the assistant is known to be
  // configured, so the page's own fallback text shows if it is not.
  var HOST = document.getElementById('kw-assistant');
  var INLINE = !!HOST;
  var SUGGESTIONS = ['How does the rota work?', 'Does it work offline?', 'What about payroll?'];

  var css = '' +
    '.kwa-btn{position:fixed;right:18px;bottom:18px;z-index:9998;display:flex;align-items:center;gap:10px;' +
    'padding:11px 15px;border:1px solid #3A3222;border-radius:6px;background:#211D14;color:#F7F1E2;' +
    'font:600 14px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;cursor:pointer;' +
    'box-shadow:0 10px 30px rgba(0,0,0,.35)}' +
    '.kwa-btn:hover{border-color:#C08428}' +
    '.kwa-btn .kwa-dot{width:8px;height:8px;border-radius:50%;background:#C08428}' +
    '.kwa-panel{position:fixed;right:18px;bottom:18px;z-index:9999;width:min(400px,calc(100vw - 36px));height:min(600px,calc(100vh - 36px));' +
    'display:none;flex-direction:column;background:#1D1A11;color:#F7F1E2;border:1px solid #3A3222;border-radius:8px;' +
    'box-shadow:0 16px 40px rgba(0,0,0,.45);overflow:hidden;font:15px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif}' +
    '.kwa-panel.open{display:flex}' +
    '@media (max-width:520px){.kwa-panel{right:0;bottom:0;width:100vw;height:100dvh;border-radius:0}}' +
    '.kwa-head{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #3A3222;background:#211D14}' +
    '.kwa-head b{font-size:15px}.kwa-head small{display:block;color:#BCAF95;font-size:12px;font-weight:400}' +
    '.kwa-x{background:none;border:0;color:#BCAF95;font-size:22px;line-height:1;cursor:pointer;padding:4px 6px}' +
    '.kwa-x:hover{color:#F7F1E2}' +
    '.kwa-log{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}' +
    '.kwa-msg{max-width:88%;padding:9px 12px;border-radius:8px;white-space:pre-wrap;word-wrap:break-word}' +
    '.kwa-msg.a{align-self:flex-start;background:#241E12;border:1px solid #3A3222;border-bottom-left-radius:4px}' +
    '.kwa-msg.u{align-self:flex-end;background:#C08428;color:#17150F;border-bottom-right-radius:4px}' +
    '.kwa-msg.t{color:#8A7F67;font-style:italic}' +
    '.kwa-msg a{color:#E0B96A}' +
    '.kwa-form{max-width:none;margin:0;display:flex;gap:8px;padding:12px;border-top:1px solid #3A3222;background:#211D14}' +
    '.kwa-form textarea{flex:1;resize:none;height:44px;min-height:44px;max-height:120px;padding:10px 12px;border:1px solid #3A3222;border-radius:6px;' +
    'background:#17150F;color:#F7F1E2;font:inherit;line-height:1.4}' +
    '.kwa-form textarea:focus{outline:none;border-color:#C08428}' +
    '.kwa-send{padding:0 16px;border:0;border-radius:10px;background:#C08428;color:#17150F;font:600 14px/1 inherit;cursor:pointer}' +
    '.kwa-send:disabled{opacity:.5;cursor:default}' +
    '.kwa-foot{display:flex;justify-content:space-between;gap:10px;padding:8px 14px 12px;background:#211D14;color:#8A7F67;font-size:11.5px}' +
    '.kwa-foot a{color:#E0B96A;text-decoration:none}' +
    '.kwa-ts{padding:0 12px;background:#211D14}' +
    '.kwa-ts:empty{display:none}' +
    // Inline: the same panel, sitting in the page where the page puts it.
    '.kwa-panel.kwa-inline{position:static;display:flex;width:100%;height:auto;min-height:380px;max-height:560px;' +
    'border-radius:6px;box-shadow:none;z-index:auto}' +
    '.kwa-panel.kwa-inline .kwa-x{display:none}' +
    '.kwa-panel.kwa-inline .kwa-log{min-height:190px}' +
    '.kwa-chips{display:flex;flex-wrap:wrap;gap:8px}' +
    '.kwa-chip{min-height:40px;padding:0 12px;border:1px solid #3A3222;border-radius:4px;background:transparent;' +
    'color:#F7F1E2;font:inherit;font-size:14px;cursor:pointer}' +
    '.kwa-chip:hover{border-color:#C08428}';

  var el = function (tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  // The conversation lives in this page's memory and nowhere else. The
  // site promises visitors that nothing is stored on their device, so
  // there is no cookie and no browser storage of any kind: moving to
  // another page starts a fresh conversation, which is the price of
  // keeping that promise true.
  var state = { config: null, session: null, messages: [], turnstileToken: null, widgetId: null, busy: false };

  // Links in the assistant's replies become clickable; nothing else is
  // interpreted, so a reply can never inject markup.
  function render(text) {
    var frag = document.createDocumentFragment();
    var re = /(https?:\/\/[^\s)]+|kiernanworks\.com\/[a-z?=&-]+)/g;
    var last = 0, m;
    while ((m = re.exec(text))) {
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      var a = el('a', null, m[0]);
      a.href = m[0].indexOf('http') === 0 ? m[0] : 'https://' + m[0];
      a.target = '_top';
      frag.appendChild(a);
      last = m.index + m[0].length;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    return frag;
  }

  var style = el('style'); style.textContent = css; document.head.appendChild(style);

  var btn = el('button', 'kwa-btn');
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Ask about SHIFT');
  btn.appendChild(el('span', 'kwa-dot'));
  btn.appendChild(document.createTextNode('Ask about SHIFT'));
  btn.style.display = 'none';

  var panel = el('div', 'kwa-panel');
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', "Matt's AI assistant");
  var head = el('div', 'kwa-head');
  var title = el('div'); title.appendChild(el('b', null, "Matt's assistant"));
  title.appendChild(el('small', null, 'An AI, answering from the site. Always on.'));
  var x = el('button', 'kwa-x', '×'); x.type = 'button'; x.setAttribute('aria-label', 'Close');
  head.appendChild(title); head.appendChild(x);
  var log = el('div', 'kwa-log'); log.setAttribute('aria-live', 'polite');
  var ts = el('div', 'kwa-ts');
  var form = el('form', 'kwa-form');
  var input = el('textarea'); input.placeholder = 'Ask about SHIFT, ASK or LINE'; input.maxLength = 500; input.rows = 1;
  var send = el('button', 'kwa-send', 'Send'); send.type = 'submit';
  form.appendChild(input); form.appendChild(send);
  var foot = el('div', 'kwa-foot');
  var demo = el('a', null, 'Book a demo with Matt'); demo.href = CONTACT; demo.target = '_top';
  foot.appendChild(el('span', null, 'Messages are processed by Anthropic.'));
  foot.appendChild(demo);
  panel.appendChild(head); panel.appendChild(log); panel.appendChild(ts); panel.appendChild(form); panel.appendChild(foot);

  if (INLINE) panel.classList.add('kwa-inline');
  else { document.body.appendChild(btn); document.body.appendChild(panel); }

  function add(role, text) {
    var m = el('div', 'kwa-msg ' + (role === 'user' ? 'u' : role === 'thinking' ? 'a t' : 'a'));
    m.appendChild(render(text));
    log.appendChild(m); log.scrollTop = log.scrollHeight;
    return m;
  }

  function redraw() {
    log.textContent = '';
    add('assistant', state.config.greeting);
    if (!state.messages.length) {
      var chips = el('div', 'kwa-chips');
      SUGGESTIONS.forEach(function (q) {
        var c = el('button', 'kwa-chip', q); c.type = 'button';
        c.addEventListener('click', function () { chips.remove(); input.value = q; submit(); });
        chips.appendChild(c);
      });
      log.appendChild(chips);
    }
    state.messages.forEach(function (m) { add(m.role, m.content); });
  }

  function loadTurnstile() {
    if (window.turnstile) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      var s = el('script'); s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true; s.onload = resolve; s.onerror = reject; document.head.appendChild(s);
    });
  }

  // Turnstile is rendered once, invisibly for almost everyone. Its token
  // is exchanged for a session the first time the visitor sends anything.
  function turnstileToken() {
    if (state.turnstileToken) return Promise.resolve(state.turnstileToken);
    return loadTurnstile().then(function () {
      return new Promise(function (resolve, reject) {
        var settled = false;
        var timer = setTimeout(function () { if (!settled) { settled = true; reject(new Error('timeout')); } }, 45000);
        var done = function (tok) { if (settled) return; settled = true; clearTimeout(timer); state.turnstileToken = tok; resolve(tok); };
        if (state.widgetId != null) { window.turnstile.reset(state.widgetId); }
        state.widgetId = window.turnstile.render(ts, {
          sitekey: state.config.siteKey,
          appearance: 'interaction-only',
          callback: done,
          'error-callback': function () { if (!settled) { settled = true; clearTimeout(timer); reject(new Error('turnstile')); } },
          'expired-callback': function () { state.turnstileToken = null; }
        });
      });
    });
  }

  function post(path, body) {
    return fetch(ORIGIN + path, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    }).then(function (r) { return r.json().then(function (j) { j.__status = r.status; return j; }); });
  }

  function ensureSession() {
    if (state.session) return Promise.resolve(state.session);
    return turnstileToken().then(function (tok) {
      return post('/api/session', { turnstile: tok });
    }).then(function (r) {
      if (!r.session) throw new Error(r.error || 'no session');
      state.turnstileToken = null;
      state.session = r.session;
      return r.session;
    });
  }

  function ask(text, retried) {
    return ensureSession().then(function (session) {
      return post('/api/chat', { session: session, messages: state.messages });
    }).then(function (r) {
      if (r.__status === 401 && !retried) { state.session = null; return ask(text, true); }
      if (r.ended || r.limited === 'ended') state.closed = true;
      if (r.reply) return r.reply;
      throw new Error(r.error || 'no reply');
    });
  }

  function submit(e) {
    if (e) e.preventDefault();
    var text = input.value.trim();
    if (!text || state.busy) return;
    input.value = ''; input.style.height = '44px';
    var leftover = log.querySelector('.kwa-chips'); if (leftover) leftover.remove();
    state.messages.push({ role: 'user', content: text });
    add('user', text);
    var thinking = add('thinking', 'Thinking…');
    state.busy = true; send.disabled = true;
    ask(text, false).then(function (reply) {
      thinking.remove();
      state.messages.push({ role: 'assistant', content: reply });
      add('assistant', reply);
    }).catch(function (err) {
      thinking.remove();
      add('assistant', "I couldn't answer that just now. Matt can, at kiernanworks.com/contact." +
        (err && err.message === 'timeout' ? ' (The check that you are a person did not complete; reload and try again.)' : ''));
    }).then(function () {
      state.busy = false;
      if (state.closed) { input.disabled = true; send.disabled = true; input.placeholder = 'This conversation has closed'; return; }
      send.disabled = false; input.focus();
    });
  }

  form.addEventListener('submit', submit);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); }
  });
  input.addEventListener('input', function () {
    input.style.height = '44px'; input.style.height = Math.min(120, input.scrollHeight) + 'px';
  });

  function open() {
    panel.classList.add('open'); btn.style.display = 'none';
    redraw(); input.focus();
    turnstileToken().catch(function () { /* it will be retried on send */ });
  }
  function close() { panel.classList.remove('open'); btn.style.display = 'flex'; }
  btn.addEventListener('click', open);
  x.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('open')) close(); });

  // The button appears only once the assistant says it is configured.
  fetch(ORIGIN + '/api/config').then(function (r) { return r.ok ? r.json() : null; }).then(function (c) {
    if (!c || !c.siteKey) return;
    state.config = c;
    if (INLINE) {
      // In the page, the person-check still waits until the visitor
      // actually asks something, so nothing loads just by viewing it.
      HOST.textContent = '';
      HOST.appendChild(panel);
      redraw();
    } else {
      btn.style.display = 'flex';
    }
  }).catch(function () { /* stay hidden, and an inline host keeps its fallback */ });
})();
