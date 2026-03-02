/* ============================================
   RESONANT STUDIO — Idea Chatbot Widget
   ============================================ */

(function () {
  'use strict';

  const WEB3FORMS_KEY  = '42850de2-a56e-41b1-b23a-3070a5560d6e';
  // Paste your Google Apps Script web app URL here after deploying it
  const ADMIN_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwhtgGKh2cOVhkYT2oa93VdpGYDj-Exgsfu26ARru_ayMppzhhrx3cmcv6X-c1axm6rtg/exec';

  const FLOW = [
    {
      bot: 'Hey! Got an app idea? I\'d love to hear it. What would you like to build?',
      placeholder: 'Describe your idea...',
      key: 'idea',
    },
    {
      bot: 'Nice one! What problem does it solve, or what feeling should it give the person using it?',
      placeholder: 'What problem does it solve?',
      key: 'problem',
    },
    {
      bot: 'What\'s your name? So I know who to credit if it gets built.',
      placeholder: 'Your name (optional)',
      key: 'name',
      optional: true,
    },
    {
      bot: 'Last one — want me to be able to get back to you? Drop your email. No spam, ever. I\'ll only write if your idea gets picked up.',
      placeholder: 'your@email.com (optional)',
      key: 'email',
      optional: true,
    },
  ];

  const answers = {};
  let step = 0;
  let open = false;
  let submitted = false;

  /* ---- DOM helpers ---- */
  function buildWidget() {
    const widget = document.createElement('div');
    widget.id = 'idea-chatbot';
    widget.innerHTML = `
      <button class="chatbot-trigger" id="chatbot-trigger" aria-label="Share your app idea" aria-expanded="false">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
        <span class="chatbot-trigger-label">Got an idea?</span>
      </button>
      <div class="chatbot-panel" id="chatbot-panel" role="dialog" aria-label="Share your app idea" aria-hidden="true">
        <div class="chatbot-header">
          <div class="chatbot-avatar" aria-hidden="true">💡</div>
          <div>
            <div class="chatbot-title">Share your app idea</div>
            <div class="chatbot-subtitle">No login. No forms. Just chat.</div>
          </div>
          <button class="chatbot-close" id="chatbot-close" aria-label="Close chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="chatbot-messages" id="chatbot-messages" aria-live="polite"></div>
        <div class="chatbot-input-row" id="chatbot-input-row">
          <input type="text" id="chatbot-input" class="chatbot-input" placeholder="Type here..." maxlength="500" aria-label="Your message" autocomplete="off" />
          <button class="chatbot-send" id="chatbot-send" aria-label="Send message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(widget);
  }

  function addMessage(text, who) {
    const msgs = document.getElementById('chatbot-messages');
    if (!msgs) return;
    const msg = document.createElement('div');
    msg.className = 'chatbot-msg chatbot-msg-' + who;
    msg.textContent = text;
    msgs.appendChild(msg);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showBotMessage(text, delay) {
    const msgs = document.getElementById('chatbot-messages');
    if (!msgs) return;
    setTimeout(() => {
      const typing = document.createElement('div');
      typing.className = 'chatbot-msg chatbot-msg-bot chatbot-typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      msgs.appendChild(typing);
      msgs.scrollTop = msgs.scrollHeight;
      setTimeout(() => {
        typing.remove();
        addMessage(text, 'bot');
      }, 700);
    }, delay || 0);
  }

  function setInputPlaceholder(ph) {
    const input = document.getElementById('chatbot-input');
    if (input) input.placeholder = ph || 'Type here...';
  }

  /* ---- Final step: newsletter checkbox + send button ---- */
  function showFinalStep() {
    const row = document.getElementById('chatbot-input-row');
    if (!row) return;
    const hasEmail = !!(answers.email && answers.email.trim());
    row.innerHTML = `
      <div class="chatbot-final-step">
        <label class="chatbot-newsletter-label">
          <input type="checkbox" id="chatbot-newsletter" class="chatbot-newsletter-check" ${hasEmail ? '' : 'disabled'} />
          <span class="chatbot-newsletter-text">
            Subscribe me to the Sunday newsletter
            ${!hasEmail ? '<span style="color:var(--text-4);"> (add email above first)</span>' : ''}
          </span>
        </label>
        ${hasEmail ? '<p class="chatbot-privacy-note">Unsubscribe anytime. Your email is only used for this.</p>' : ''}
        <button class="chatbot-send-final" id="chatbot-send-final">
          Send my idea
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    `;
    document.getElementById('chatbot-send-final').addEventListener('click', submitIdea);
  }

  /* ---- Submit via Web3Forms; optionally subscribe to Buttondown ---- */
  function submitIdea() {
    if (submitted) return;
    submitted = true;

    const btn = document.getElementById('chatbot-send-final');
    if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }

    const newsletterChecked = !!(document.getElementById('chatbot-newsletter') || {}).checked;
    const email = (answers.email || '').trim();

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: 'App idea from ' + (answers.name || 'a visitor') + ' — Resonant Studio',
      from_name: answers.name || 'Resonant Studio visitor',
      idea: answers.idea || '',
      problem: answers.problem || '',
      name: answers.name || 'Not given',
      email: email || 'Not given',
      newsletter_opt_in: newsletterChecked ? 'Yes' : 'No',
    };

    // Main submission
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(r => r.json())
      .then(data => {
        const row = document.getElementById('chatbot-input-row');
        if (data.success) {
          if (row) row.innerHTML = '';
          showBotMessage('Sent! I\'ll read it soon. Thanks for sharing 🙌', 200);

          // Newsletter opt-in is captured in the Web3Forms submission above.
          // Manually add them to Buttondown from your dashboard if newsletter_opt_in === 'Yes'.

          // Also save to your Google Apps Script inbox (silent fail if not configured)
          // text/plain avoids CORS preflight — Apps Script still receives valid JSON
          if (ADMIN_SCRIPT_URL) {
            fetch(ADMIN_SCRIPT_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'text/plain' },
              body: JSON.stringify({
                idea: answers.idea || '',
                problem: answers.problem || '',
                name: answers.name || '',
                email: email || '',
                newsletter_opt_in: newsletterChecked ? 'Yes' : 'No',
              }),
            }).catch(() => {});
          }
        } else {
          submitted = false;
          if (btn) { btn.textContent = 'Send my idea'; btn.disabled = false; }
        }
      })
      .catch(() => {
        submitted = false;
        const row = document.getElementById('chatbot-input-row');
        if (row) {
          row.innerHTML = '<p style="font-size:0.82rem;color:var(--text-4);padding:12px;">Couldn\'t send — please email me at contactme@resonantstudio.online</p>';
        }
      });
  }

  /* ---- Conversation flow ---- */
  function handleSend() {
    const input = document.getElementById('chatbot-input');
    if (!input) return;
    const val = input.value.trim();
    if (!val && !FLOW[step].optional) return;

    if (val) addMessage(val, 'user');
    answers[FLOW[step].key] = val;
    input.value = '';
    step++;

    if (step < FLOW.length) {
      setInputPlaceholder(FLOW[step].placeholder);
      showBotMessage(FLOW[step].bot, 400);
    } else {
      showBotMessage('Perfect, I have everything I need!', 400);
      setTimeout(() => showFinalStep(), 1300);
    }
  }

  /* ---- Panel open/close ---- */
  function openPanel() {
    open = true;
    const panel = document.getElementById('chatbot-panel');
    const trigger = document.getElementById('chatbot-trigger');
    if (panel) { panel.classList.add('open'); panel.setAttribute('aria-hidden', 'false'); }
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    if (step === 0) {
      showBotMessage(FLOW[0].bot, 300);
      setInputPlaceholder(FLOW[0].placeholder);
    }
    setTimeout(() => {
      const input = document.getElementById('chatbot-input');
      if (input) input.focus();
    }, 400);
  }

  function closePanel() {
    open = false;
    const panel = document.getElementById('chatbot-panel');
    const trigger = document.getElementById('chatbot-trigger');
    if (panel) { panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true'); }
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }

  function init() {
    buildWidget();
    document.getElementById('chatbot-trigger').addEventListener('click', () => open ? closePanel() : openPanel());
    document.getElementById('chatbot-close').addEventListener('click', closePanel);
    document.getElementById('chatbot-send').addEventListener('click', handleSend);
    document.getElementById('chatbot-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) closePanel(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
