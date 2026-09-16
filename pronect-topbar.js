// Vanilla-JS replacement for pronect-topbar.dc.html.
// Call mountPronectTopbar(container) once per page.
function mountPronectTopbar(container) {
  container.innerHTML = `
    <header style="width:100%;box-sizing:border-box;background:var(--pn-color-surface-default);box-shadow:inset 0 -1px 0 rgba(0,0,0,.05);display:flex;align-items:center;justify-content:flex-end;gap:clamp(16px,1.5vw,32px);padding:12px clamp(16px,2vw,48px);flex:none;">
      <button class="pn-topbar-hover-btn" data-note="This signs you out of ProNect." style="display:flex;align-items:center;gap:6px;font:400 var(--pn-font-size-sm)/1 var(--font-sans);color:var(--pn-color-text-primary);cursor:not-allowed;background:none;border:0;padding:0;">
        <span>Promega Scientist</span>
        <svg viewBox="0 0 24 24" fill="var(--pn-color-text-primary)" width="16" height="16"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
      </button>
      <span style="width:1px;height:19px;background:var(--pn-color-neutral-200);"></span>
      <a href="https://www.promega.com" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:8px;font:400 var(--pn-font-size-sm)/1 var(--font-sans);color:var(--pn-color-text-primary);text-decoration:none;cursor:pointer;">
        <span>Support</span>
        <img src="assets/icon-support.svg" alt="" style="width:24px;height:24px;">
      </a>
    </header>
  `;

  // Shared hover-note tooltip, positioned at the cursor.
  let noteEl = null;
  function showNote(e) {
    const note = e.currentTarget.dataset.note;
    if (!note) return;
    if (!noteEl) {
      noteEl = document.createElement('div');
      noteEl.style.cssText = 'position:fixed;background:var(--pn-color-neutral-900);color:var(--pn-color-text-inverse);font:500 var(--pn-font-size-xs)/1.3 var(--font-sans);padding:8px 12px;border-radius:8px;pointer-events:none;z-index:2000;box-shadow:var(--pn-shadow-xs);max-width:220px;';
      document.body.appendChild(noteEl);
    }
    noteEl.textContent = note;
    noteEl.style.left = (e.clientX + 14) + 'px';
    noteEl.style.top = (e.clientY + 18) + 'px';
  }
  function moveNote(e) {
    if (!noteEl) return;
    noteEl.style.left = (e.clientX + 14) + 'px';
    noteEl.style.top = (e.clientY + 18) + 'px';
  }
  function hideNote() {
    if (noteEl) { noteEl.remove(); noteEl = null; }
  }
  container.querySelectorAll('.pn-topbar-hover-btn').forEach((btn) => {
    btn.addEventListener('mouseenter', showNote);
    btn.addEventListener('mousemove', moveNote);
    btn.addEventListener('mouseleave', hideNote);
  });

  // Reports this page's real height to a Foleon Embed Source element hosting the
  // demo, so its "Dynamic height" iframe setting can size to content instead of a
  // fixed number. Every page here is a full navigation (not an SPA), and this
  // module is the shared chrome on all of them but index.html (which runs the
  // same observer inline), so this one observer covers every other page.
  // document.documentElement (not a specific content div) because nothing in
  // this codebase clamps html/body to a fixed height.
  let lastHeight = 0;
  function reportHeight() {
    const h = document.documentElement.scrollHeight;
    if (h === lastHeight) return;
    lastHeight = h;
    window.parent.postMessage(
      JSON.stringify({ src: location.toString(), context: 'iframe.resize', height: h }),
      '*'
    );
  }
  new ResizeObserver(reportHeight).observe(document.documentElement);
}
