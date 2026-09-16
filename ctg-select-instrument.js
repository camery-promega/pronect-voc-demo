// Vanilla-JS replacement for ctg-select-instrument.dc.html.
// Requires ctg-instrument-table.js to be loaded first (uses mountCtgInstrumentTable).
//
// mountCtgSelectInstrument(container, {
//   open,          // boolean, initial open state (default false)
//   destination,   // URL Next navigates to (default 'ctg-read-in-progress.html?from=platemap')
//   onCancel(),    // called when Cancel is clicked (host decides what "closed" means)
// })
// Returns { show(), hide() } so the host page can open/close it on demand.
function mountCtgSelectInstrument(container, opts) {
  opts = opts || {};
  const destination = opts.destination || 'ctg-read-in-progress.html?from=platemap';
  const onCancel = opts.onCancel || function () {};

  let open = !!opts.open;
  let selectedId = null;
  let analysisName = '';
  let integrationInvalid = false;
  let defaulted = false;
  let tableApi = null;

  function stamp() {
    const d = new Date(), p = (n) => String(n).padStart(2, '0');
    let h = d.getHours();
    const ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return 'CellTiter-Glo ' + d.getFullYear() + ' ' + p(d.getMonth() + 1) + ' ' + p(d.getDate())
      + ' ' + h + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds()) + ' ' + ap + ' - Analysis';
  }

  function render() {
    if (!open) {
      container.innerHTML = '';
      return;
    }
    if (!analysisName) analysisName = stamp();
    if (!selectedId && !defaulted) {
      defaulted = true;
      const found = ((window.CTG && window.CTG.INSTRUMENTS) || []).find((i) => i.selectable);
      if (found) selectedId = found.id;
    }

    const canNext = !!selectedId && !integrationInvalid;
    const nextStyle = `border:1px solid ${canNext ? 'var(--pn-color-sol-500)' : 'var(--pn-color-border-subtle)'};background:${canNext ? 'var(--pn-color-sol-500)' : 'var(--pn-color-surface-sunken)'};color:${canNext ? 'var(--pn-color-text-primary)' : 'var(--pn-color-text-disabled)'};border-radius:var(--pn-border-radius-md);padding:8px 12px;font:400 15px/1 var(--pn-font-family-sans);cursor:${canNext ? 'pointer' : 'default'};`;

    container.innerHTML = `
      <div style="position:fixed;inset:0;background:rgba(20,20,20,.5);z-index:2100;display:flex;align-items:center;justify-content:center;padding:24px;">
        <div style="background:var(--pn-color-surface-default);border-radius:var(--pn-border-radius-lg);width:1200px;max-width:100%;height:760px;max-height:100%;box-shadow:var(--pn-shadow-3);display:flex;flex-direction:column;padding:32px 40px;font-family:var(--pn-font-family-sans);">
          <h2 style="margin:0 0 16px;font:600 24px/1.2 var(--pn-font-family-sans);color:var(--pn-color-text-primary);">Select Instrument</h2>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:14px 16px;border-radius:var(--pn-border-radius-md);background:var(--pn-color-status-success-surface);border:1px solid var(--pn-color-status-success-border);flex:none;margin-bottom:8px;">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--pn-color-status-success-border)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex:none;margin-top:1px;"><path d="M20 6L9 17l-5-5"/></svg>
            <span style="font:400 14px/1.45 var(--pn-font-family-sans);color:var(--pn-color-text-primary);">ProNect checks the plate map before a read starts, so an issue surfaces here rather than after the data is collected. This plate map has no errors to show.</span>
          </div>
          <div style="display:flex;align-items:center;gap:24px;padding:20px 0;flex:none;">
            <span style="font:500 15px/1 var(--pn-font-family-sans);color:var(--pn-color-text-primary);flex:none;">Analysis Results Name</span>
            <span style="flex:1;font:400 15px/1 var(--pn-font-family-sans);color:var(--pn-color-text-muted);overflow-wrap:anywhere;">${analysisName}</span>
            <button class="csi-rename-btn" data-note="The analysis name can be edited before the read starts."
                    style="flex:none;background:var(--pn-color-surface-default);border:1px solid var(--pn-color-border-default);border-radius:var(--pn-border-radius-md);padding:8px 12px;cursor:not-allowed;font:400 15px/1 var(--pn-font-family-sans);color:var(--pn-color-text-primary);">Rename</button>
          </div>
          <div class="csi-table-host" style="width:100%;flex:1;min-height:0;"></div>
          <div style="display:flex;justify-content:center;gap:16px;padding-top:24px;flex:none;">
            <button class="csi-cancel-btn" style="background:var(--pn-color-surface-default);border:1px solid var(--pn-color-border-default);border-radius:var(--pn-border-radius-md);padding:8px 12px;cursor:pointer;font:400 15px/1 var(--pn-font-family-sans);color:var(--pn-color-text-primary);">Cancel</button>
            <button class="csi-next-btn" ${canNext ? '' : 'disabled'} style="${nextStyle}">Next</button>
          </div>
        </div>
      </div>
    `;

    const tableHost = container.querySelector('.csi-table-host');
    tableApi = mountCtgInstrumentTable(tableHost, {
      selectedId,
      onSelect(id) { selectedId = id; },
      onValidityChange(invalid) {
        integrationInvalid = invalid;
        // Only Next's enabled state needs to change; re-render is cheap here
        // since the table manages its own internal re-render already.
        const nextBtn = container.querySelector('.csi-next-btn');
        if (nextBtn) {
          const stillCanNext = !!selectedId && !integrationInvalid;
          nextBtn.disabled = !stillCanNext;
          nextBtn.style.cssText = `border:1px solid ${stillCanNext ? 'var(--pn-color-sol-500)' : 'var(--pn-color-border-subtle)'};background:${stillCanNext ? 'var(--pn-color-sol-500)' : 'var(--pn-color-surface-sunken)'};color:${stillCanNext ? 'var(--pn-color-text-primary)' : 'var(--pn-color-text-disabled)'};border-radius:var(--pn-border-radius-md);padding:8px 12px;font:400 15px/1 var(--pn-font-family-sans);cursor:${stillCanNext ? 'pointer' : 'default'};`;
        }
      },
    });

    // Shared hover-note tooltip (Rename button only).
    let noteEl = null;
    const renameBtn = container.querySelector('.csi-rename-btn');
    renameBtn.addEventListener('mouseenter', (e) => {
      noteEl = document.createElement('div');
      noteEl.style.cssText = 'position:fixed;background:var(--pn-color-neutral-900);color:var(--pn-color-text-inverse);font:500 12px/1.3 var(--pn-font-family-sans);padding:6px 10px;border-radius:6px;pointer-events:none;z-index:2200;box-shadow:var(--pn-shadow-xs);max-width:220px;';
      noteEl.textContent = e.currentTarget.dataset.note;
      noteEl.style.left = (e.clientX + 14) + 'px';
      noteEl.style.top = (e.clientY + 18) + 'px';
      document.body.appendChild(noteEl);
    });
    renameBtn.addEventListener('mousemove', (e) => {
      if (!noteEl) return;
      noteEl.style.left = (e.clientX + 14) + 'px';
      noteEl.style.top = (e.clientY + 18) + 'px';
    });
    renameBtn.addEventListener('mouseleave', () => {
      if (noteEl) { noteEl.remove(); noteEl = null; }
    });

    container.querySelector('.csi-cancel-btn').addEventListener('click', () => onCancel());
    container.querySelector('.csi-next-btn').addEventListener('click', () => {
      const stillCanNext = !!selectedId && !integrationInvalid;
      if (!stillCanNext) return;
      window.location.href = destination;
    });
  }

  render();

  return {
    show() { open = true; render(); },
    hide() { open = false; render(); },
  };
}
