// Vanilla-JS replacement for ctg-instrument-table.dc.html.
// Shared instrument-picker table used by ctg-select-instrument (and formerly
// the now-cut Read Plate modal on ctg-app-home).
//
// mountCtgInstrumentTable(container, {
//   selectedId,               // string | null - which instrument is selected
//   onSelect(id),             // called when a selectable row's radio is clicked
//   onValidityChange(invalid),// called whenever the selected instrument's
//                             // integration-time validity may have changed
// })
// Returns { setSelectedId(id) } so the parent can update selection after mount
// (the original relied on a re-render via props; here the parent calls this
// explicitly - direct callback instead of the old ctg:instrument-pick /
// ctg:integration-validity document events).
function mountCtgInstrumentTable(container, opts) {
  opts = opts || {};
  let selectedId = opts.selectedId || null;
  const onSelect = opts.onSelect || function () {};
  const onValidityChange = opts.onValidityChange || function () {};

  const getInstruments = () => (window.CTG && window.CTG.INSTRUMENTS) || [];

  // Same shape as the dashboard's Instruments tile: "Reading - Xd Yh left".
  // Fixed value, not a live timer - matches what's actually on screen there.
  const READING_TOTAL_SEC = 2 * 86400 + 15 * 3600;
  const fmtRemaining = (sec) => `${Math.floor(sec / 86400)}d ${Math.floor((sec % 86400) / 3600)}h`;

  const integration = {}; // id -> current value string

  function isValid(v) {
    if (v === '' || v == null) return false;
    const n = Number(v);
    return isFinite(n) && n <= 30;
  }
  function clamp(v) {
    const n = Number(v);
    if (!isFinite(n) || n > 30) return v;
    const rounded = Math.round(Math.max(n, 0.1) * 10) / 10;
    return String(rounded);
  }
  function announceValidity(idOverride) {
    const id = idOverride !== undefined ? idOverride : selectedId;
    const val = integration[id];
    const current = val === undefined ? 1 : val;
    const invalid = !!id && !isValid(current);
    onValidityChange(invalid);
  }

  container.innerHTML = `
    <div style="display:flex;flex-direction:column;min-height:0;height:100%;font-family:var(--pn-font-family-sans);">
      <div style="display:grid;grid-template-columns:60px 1fr 220px 260px;gap:16px;align-items:center;padding:0 0 12px;border-bottom:1px solid var(--pn-color-border-subtle);flex:none;">
        <span></span>
        <span style="display:flex;align-items:center;gap:6px;font:500 15px/1 var(--pn-font-family-sans);color:var(--pn-color-text-primary);">Name<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--pn-color-text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg></span>
        <span style="font:500 15px/1 var(--pn-font-family-sans);color:var(--pn-color-text-primary);">Integration Time (sec)</span>
        <span style="font:500 15px/1 var(--pn-font-family-sans);color:var(--pn-color-text-primary);">Status</span>
      </div>
      <div class="ctg-inst-rows" style="flex:1;min-height:0;overflow:auto;"></div>
    </div>
  `;
  const rowsEl = container.querySelector('.ctg-inst-rows');

  // Shared hover-note tooltip.
  let noteEl = null;
  function showNote(e) {
    const note = e.currentTarget.dataset.note;
    if (!note) return;
    if (!noteEl) {
      noteEl = document.createElement('div');
      noteEl.style.cssText = 'position:fixed;background:var(--pn-color-neutral-900);color:var(--pn-color-text-inverse);font:500 12px/1.3 var(--pn-font-family-sans);padding:6px 10px;border-radius:6px;pointer-events:none;z-index:2400;box-shadow:var(--pn-shadow-xs);max-width:220px;';
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

  function render() {
    rowsEl.innerHTML = '';
    getInstruments().forEach((i) => {
      const isSel = selectedId === i.id;
      const curVal = integration[i.id] === undefined ? 1 : integration[i.id];
      const invalid = i.selectable && !isValid(curVal);

      const row = document.createElement('div');
      row.style.cssText = 'display:grid;grid-template-columns:60px 1fr 220px 260px;gap:16px;align-items:center;padding:16px 0;border-bottom:1px solid var(--pn-color-border-subtle);';

      const radioStyle = 'width:22px;height:22px;border-radius:50%;padding:0;display:flex;align-items:center;'
        + 'justify-content:center;background:var(--pn-color-surface-default);'
        + 'border:2px solid ' + (isSel ? 'var(--pn-color-sol-500)' : 'var(--pn-color-border-default)') + ';'
        + 'cursor:' + (i.selectable ? 'pointer' : 'not-allowed') + ';'
        + (i.selectable ? '' : 'opacity:.5;');
      const radioDotBg = isSel ? 'var(--pn-color-sol-500)' : 'transparent';
      const nameStyle = 'font:500 15px/1.3 var(--pn-font-family-sans);overflow-wrap:anywhere;color:'
        + (i.selectable ? 'var(--pn-color-text-primary)' : 'var(--pn-color-text-muted)') + ';';
      const inputStyle = 'width:76px;padding:8px 10px;box-sizing:border-box;'
        + 'border-radius:var(--pn-border-radius-md);'
        + 'font:400 14px/1 var(--pn-font-family-sans);'
        + 'border:1px solid ' + (invalid ? 'var(--pn-color-status-error-border)' : 'var(--pn-color-border-default)') + ';'
        + (i.selectable
            ? 'background:var(--pn-color-surface-default);color:var(--pn-color-text-primary);'
            : 'background:var(--pn-color-surface-sunken);color:var(--pn-color-text-disabled);cursor:not-allowed;');
      const statusLabel = i.status === 'reading' ? `${i.statusLabel} - ${fmtRemaining(READING_TOTAL_SEC)} left` : i.statusLabel;

      row.innerHTML = `
        <button class="ctg-inst-radio" data-note="${i.note || ''}" style="${radioStyle}"><span style="width:10px;height:10px;border-radius:50%;background:${radioDotBg};display:block;"></span></button>
        <span style="${nameStyle}">${i.name}</span>
        <input class="ctg-inst-input" type="number" min="0.1" max="30" step="0.1" value="${curVal}" ${i.selectable ? '' : 'disabled'} style="${inputStyle}">
        <span style="display:flex;flex-direction:column;gap:6px;">
          <span style="height:4px;border-radius:2px;background:${i.color};"></span>
          <span style="font:400 var(--pn-font-size-xs)/1 var(--pn-font-family-sans);color:var(--pn-color-text-primary);">${statusLabel}</span>
        </span>
      `;

      const radioBtn = row.querySelector('.ctg-inst-radio');
      radioBtn.addEventListener('mouseenter', showNote);
      radioBtn.addEventListener('mousemove', moveNote);
      radioBtn.addEventListener('mouseleave', hideNote);
      radioBtn.addEventListener('click', () => {
        if (!i.selectable) return;
        selectedId = i.id;
        onSelect(i.id);
        announceValidity(i.id);
        render();
      });

      const input = row.querySelector('.ctg-inst-input');
      input.addEventListener('change', (e) => {
        const v = clamp(e.target.value);
        integration[i.id] = v;
        announceValidity();
        render();
      });

      rowsEl.appendChild(row);
    });
  }

  render();

  return {
    setSelectedId(id) {
      selectedId = id;
      render();
    },
  };
}
