// Vanilla-JS replacement for pronect-sidebar.dc.html.
// Call mountPronectSidebar(container, { dashboardHref }) once per page.
// dashboardHref: "" (or omitted) means "this page IS the dashboard" - the
// Dashboard button does nothing, same behavior as the original component.
function mountPronectSidebar(container, opts) {
  opts = opts || {};
  const dashboardHref = opts.dashboardHref || '';

  container.innerHTML = `
    <aside style="width:100%;height:100%;background:var(--pn-color-surface-inverse);display:flex;flex-direction:column;color:var(--pn-color-text-inverse);">
      <div style="width:100%;height:clamp(45px,7vh,80px);display:flex;align-items:center;justify-content:center;overflow:hidden;">
        <a href="index.html" style="width:100%;height:100%;display:block;">
          <img src="assets/logo-lockup.svg" alt="ProNect by Promega" style="width:100%;height:100%;object-fit:cover;display:block;">
        </a>
      </div>
      <nav style="display:flex;flex-direction:column;">
        <button class="pn-sidebar-dashboard-btn" style="position:relative;height:clamp(80px,10vh,160px);width:100%;display:flex;align-items:center;justify-content:center;cursor:pointer;border:0;background:transparent;padding:0;">
          <span style="position:absolute;left:0;top:0;bottom:0;width:2.8%;background:var(--pn-color-sol-500);opacity:1;"></span>
          <span style="display:flex;flex-direction:column;align-items:center;gap:clamp(6px,0.5vw,20px);opacity:1;">
            <img src="assets/icon-nav_dashboard.svg" alt="" style="width:clamp(32px,2vw,64px);height:clamp(32px,2vw,64px);display:block;">
            <span style="font:500 var(--pn-font-size-base)/24px var(--font-sans);color:var(--pn-color-text-inverse);">Dashboard</span>
          </span>
        </button>
        <button class="pn-sidebar-hover-btn" data-note="Resources opens the Resource Center, with support material for ProNect and MyGlo."
          style="position:relative;height:clamp(80px,10vh,160px);width:100%;display:flex;align-items:center;justify-content:center;cursor:not-allowed;border:0;background:transparent;padding:0;">
          <span style="position:absolute;left:0;top:0;bottom:0;width:2.8%;background:var(--pn-color-sol-500);opacity:0;"></span>
          <span style="display:flex;flex-direction:column;align-items:center;gap:clamp(6px,0.5vw,20px);opacity:.5;">
            <svg viewBox="0 0 24 24" fill="var(--pn-color-text-inverse)" style="width:clamp(32px,2vw,64px);height:clamp(32px,2vw,64px);display:block;"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9l-2.5-1.5L14 11V4h5v7z"/></svg>
            <span style="font:500 var(--pn-font-size-base)/24px var(--font-sans);color:var(--pn-color-text-inverse);">Resources</span>
          </span>
        </button>
        <button class="pn-sidebar-hover-btn" data-note="Settings opens your ProNect account settings."
          style="position:relative;height:clamp(80px,10vh,160px);width:100%;display:flex;align-items:center;justify-content:center;cursor:not-allowed;border:0;background:transparent;padding:0;">
          <span style="position:absolute;left:0;top:0;bottom:0;width:2.8%;background:var(--pn-color-sol-500);opacity:0;"></span>
          <span style="display:flex;flex-direction:column;align-items:center;gap:clamp(6px,0.5vw,20px);opacity:.5;">
            <img src="assets/icon-nav_settings.svg" alt="" style="width:clamp(32px,2vw,64px);height:clamp(32px,2vw,64px);display:block;">
            <span style="font:500 var(--pn-font-size-base)/24px var(--font-sans);color:var(--pn-color-text-inverse);">Settings</span>
          </span>
        </button>
      </nav>
    </aside>
  `;

  const dashboardBtn = container.querySelector('.pn-sidebar-dashboard-btn');
  dashboardBtn.addEventListener('click', () => {
    if (dashboardHref) window.location.href = dashboardHref;
  });

  // Shared hover-note tooltip, positioned at the cursor, for the not-yet-built nav items.
  let noteEl = null;
  function showNote(e) {
    const note = e.currentTarget.dataset.note;
    if (!note) return;
    if (!noteEl) {
      noteEl = document.createElement('div');
      noteEl.style.cssText = 'position:fixed;background:var(--pn-color-neutral-900);color:var(--pn-color-text-inverse);font:500 var(--pn-font-size-xs)/1.3 var(--pn-font-family-sans);padding:6px 10px;border-radius:6px;pointer-events:none;z-index:2000;box-shadow:var(--pn-shadow-xs);max-width:220px;';
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
  container.querySelectorAll('.pn-sidebar-hover-btn').forEach((btn) => {
    btn.addEventListener('mouseenter', showNote);
    btn.addEventListener('mousemove', moveNote);
    btn.addEventListener('mouseleave', hideNote);
  });
}
