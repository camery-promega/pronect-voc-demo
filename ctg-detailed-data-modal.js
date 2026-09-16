// Vanilla-JS replacement for ctg-detailed-data.dc.html (the modal component).
// Named "-modal" to avoid colliding with ctg-detailed-data.js, the generated
// data module (window.CTG_DETAILED) this reads from - load that script first.
//
// mountCtgDetailedDataModal(container, {
//   open,          // boolean, initial open state (default false)
//   analysisName,  // string shown under the "Detailed Data" title
//   onClose(),     // called when Close is clicked
// })
// Returns { show(analysisName), hide() }.
function mountCtgDetailedDataModal(container, opts) {
  opts = opts || {};
  const onClose = opts.onClose || function () {};

  let open = !!opts.open;
  let analysisName = opts.analysisName || '';
  let bookIdx = 0;
  let sheetIdx = 0;

  const getBooks = () => (window.CTG_DETAILED && window.CTG_DETAILED.workbooks) || [];

  const SURFACE = {
    'series-1': 'var(--pn-color-plate-group-1)',
    'series-2': 'var(--pn-color-plate-group-2)',
    'standard': 'var(--ctg-plate-standard-surface)',
    'background': 'var(--pn-color-plate-background-surface)',
    'control': 'var(--pn-color-plate-control-surface)',
    'sample': 'var(--pn-color-plate-sample-surface)',
  };
  const CV_SCALE = [
    ['#FEFEFD', false], ['#E8EAF6', false], ['#C5CAE9', false], ['#9FA8DA', false],
    ['#7986CB', false], ['#5C6BC0', true], ['#3F51B5', true], ['#3949AB', true],
    ['#303F9F', true], ['#283593', true], ['#1A237E', true],
  ];

  function paint(cell) {
    if (cell && cell.cv !== undefined) {
      const band = CV_SCALE[cell.cv] || CV_SCALE[CV_SCALE.length - 1];
      return { bg: band[0], color: band[1] ? 'var(--pn-color-text-inverse)' : '#141414' };
    }
    const f = cell && cell.f;
    return { bg: f ? SURFACE[f] || null : null, color: '#141414' };
  }

  function plain(v) {
    const s = String(v);
    if (s.indexOf('e') < 0) return s;
    const parts = s.split('e');
    const exp = parseInt(parts[1], 10);
    if (exp >= 0) return v.toFixed(0);
    const neg = parts[0].charAt(0) === '-';
    const digits = parts[0].replace('-', '').replace('.', '');
    return (neg ? '-' : '') + '0.' + new Array(-exp).join('0') + digits;
  }

  function fmt(v, code) {
    if (v === null || v === undefined || v === '') return '';
    if (typeof v !== 'number') return String(v);
    if (code === '00') return (v < 10 && v >= 0 ? '0' : '') + v;
    const dp = code && code.match(/^0\.(0+)$/);
    if (dp) {
      const out = v.toFixed(dp[1].length);
      if (v !== 0 && Number(out) === 0) return plain(v);
      return out;
    }
    return plain(v);
  }

  function bookTabStyle(active) {
    return 'background:transparent;border:0;border-bottom:3px solid '
      + (active ? 'var(--pn-color-sol-500)' : 'transparent') + ';'
      + 'padding:10px 18px;margin-bottom:-1px;cursor:pointer;'
      + 'font:' + (active ? '500' : '400') + ' 16px/1 var(--pn-font-family-sans);'
      + 'color:' + (active ? 'var(--pn-color-text-primary)' : 'var(--pn-color-text-muted)') + ';';
  }
  function sheetTabStyle(active) {
    return 'border:1px solid ' + (active ? 'var(--pn-color-sol-500)' : 'var(--pn-color-border-default)') + ';'
      + 'background:' + (active ? 'var(--pn-color-sol-500)' : 'var(--pn-color-surface-default)') + ';'
      + 'color:var(--pn-color-text-primary);'
      + 'border-radius:var(--pn-border-radius-full);padding:8px 18px;cursor:pointer;'
      + 'font:400 14px/1 var(--pn-font-family-sans);';
  }

  const CELL = 'border-bottom:1px solid var(--pn-color-border-subtle);'
    + 'border-right:1px solid var(--pn-color-border-subtle);padding:10px 14px;';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderTable(sheet) {
    const headerHtml = sheet.headers.map((h) => {
      const style = CELL + 'position:sticky;top:0;z-index:1;background:var(--pn-color-surface-sunken);text-align:left;font-weight:600;color:#141414;';
      return `<th style="${style}">${esc(h)}</th>`;
    }).join('');
    const rowsHtml = sheet.rows.map((r) => {
      const cellsHtml = r.cells.map((c) => {
        const own = paint(c);
        const bg = own.bg || (r.band ? SURFACE[r.band] : null);
        const style = CELL + (bg ? 'background:' + bg + ';' : '') + 'color:' + own.color + ';';
        return `<td style="${style}">${esc(fmt(c.v, c.n))}</td>`;
      }).join('');
      return `<tr>${cellsHtml}</tr>`;
    }).join('');
    return `
      <table style="border-collapse:separate;border-spacing:0;font:400 14px/1.3 var(--pn-font-family-sans);white-space:nowrap;">
        <thead><tr>${headerHtml}</tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    `;
  }

  function renderPlate(sheet) {
    const colsHtml = sheet.cols.map((c) =>
      `<span style="text-align:center;font:500 14px/1 var(--pn-font-family-sans);color:var(--pn-color-text-muted);padding-bottom:4px;">${esc(c)}</span>`
    ).join('');
    const rowsHtml = sheet.rows.map((letter) => {
      const wellsHtml = sheet.cols.map((c) => {
        const w = sheet.wells[letter + c];
        const p = paint(w);
        const style = 'min-height:56px;border-radius:var(--pn-border-radius-sm);padding:7px 10px;'
          + 'display:flex;flex-direction:column;gap:2px;box-sizing:border-box;'
          + (p.bg ? 'background:' + p.bg + ';' : 'background:transparent;border:1px dashed var(--pn-color-border-subtle);');
        const linesHtml = (w ? w.lines : []).map((t, i) => {
          const lineStyle = 'font:' + (i === 0 ? '600' : '400') + ' 13px/1.25 var(--pn-font-family-sans);color:' + p.color + ';';
          return `<span style="${lineStyle}">${esc(t)}</span>`;
        }).join('');
        return `<div style="${style}">${linesHtml}</div>`;
      }).join('');
      return `<span style="display:flex;align-items:center;justify-content:center;font:500 14px/1 var(--pn-font-family-sans);color:var(--pn-color-text-muted);">${esc(letter)}</span>${wellsHtml}`;
    }).join('');
    return `
      <div style="padding:18px;display:inline-block;min-width:100%;box-sizing:border-box;">
        <div style="display:grid;grid-template-columns:34px repeat(12, minmax(96px, 1fr));gap:4px;min-width:1220px;">
          <span></span>${colsHtml}${rowsHtml}
        </div>
      </div>
    `;
  }

  function render() {
    if (!open) {
      container.innerHTML = '';
      return;
    }
    const books = getBooks();
    const book = books[bookIdx];
    const sheets = book ? book.sheets : [];
    const sheet = sheets[sheetIdx];

    const booksHtml = books.map((b, i) =>
      `<button class="dd-book-tab" data-i="${i}" style="${bookTabStyle(i === bookIdx)}">${esc(b.name)}</button>`
    ).join('');
    const tabsHtml = sheets.map((s, i) =>
      `<button class="dd-sheet-tab" data-i="${i}" style="${sheetTabStyle(i === sheetIdx)}">${esc(s.name)}</button>`
    ).join('');

    let bodyHtml = '';
    if (sheet && sheet.kind === 'table') bodyHtml = renderTable(sheet);
    else if (sheet && sheet.kind === 'plate') bodyHtml = renderPlate(sheet);

    container.innerHTML = `
      <div class="dd" style="position:fixed;inset:0;background:rgba(20,20,20,.5);z-index:2100;display:flex;align-items:center;justify-content:center;padding:24px;">
        <div style="background:var(--pn-color-surface-default);border-radius:var(--pn-border-radius-lg);width:1500px;max-width:100%;height:880px;max-height:100%;box-shadow:var(--pn-shadow-3);display:flex;flex-direction:column;padding:32px 40px;box-sizing:border-box;font-family:var(--pn-font-family-sans);">
          <h2 style="margin:0 0 4px;font:600 24px/1.2 var(--pn-font-family-sans);color:var(--pn-color-text-primary);flex:none;">Detailed Data</h2>
          <p style="margin:0 0 18px;font:400 15px/1.3 var(--pn-font-family-sans);color:var(--pn-color-text-muted);flex:none;">${esc(analysisName)}</p>
          <div style="display:flex;gap:4px;border-bottom:1px solid var(--pn-color-border-subtle);flex:none;">${booksHtml}</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;padding:16px 0 18px;flex:none;">${tabsHtml}</div>
          <div style="flex:1;min-height:0;overflow:auto;border:1px solid var(--pn-color-border-subtle);border-radius:var(--pn-border-radius-md);">${bodyHtml}</div>
          <div style="display:flex;justify-content:center;padding-top:24px;flex:none;">
            <button class="dd-close-btn" style="background:var(--pn-color-surface-default);border:1px solid var(--pn-color-border-default);border-radius:var(--pn-border-radius-md);padding:12px 48px;cursor:pointer;font:400 15px/1 var(--pn-font-family-sans);color:var(--pn-color-text-primary);">Close</button>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('.dd-book-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        bookIdx = Number(btn.dataset.i);
        sheetIdx = 0;
        render();
      });
    });
    container.querySelectorAll('.dd-sheet-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        sheetIdx = Number(btn.dataset.i);
        render();
      });
    });
    container.querySelector('.dd-close-btn').addEventListener('click', () => onClose());
  }

  render();

  return {
    show(name) {
      open = true;
      if (name !== undefined) analysisName = name;
      render();
    },
    hide() { open = false; render(); },
  };
}
