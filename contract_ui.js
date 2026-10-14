/*
 * 雇用契約書の表示・保存（入社フォーム／雇用契約書フォーム共通）
 *   NPDocs（docs.js）の契約書をA4で描画し、縮小プレビュー・全画面表示・画像保存・PDF保存を行う。
 *   画像化に html2canvas、PDFに jsPDF を使用（必要になったときに読み込む）。
 */
(function () {
  'use strict';
  const LIBS = {
    html2canvas: 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
    jspdf: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  };
  const loaded = {};
  function load(name) {
    if (loaded[name]) return loaded[name];
    loaded[name] = new Promise((ok, ng) => {
      const s = document.createElement('script'); s.src = LIBS[name]; s.async = true;
      s.onload = ok; s.onerror = () => { loaded[name] = null; ng(new Error('読み込みに失敗しました（通信状況をご確認ください）')); };
      document.head.appendChild(s);
    });
    return loaded[name];
  }

  const CSS = `
.np-prev{position:relative;width:100%;overflow:hidden;border:1px solid #d0d7de;border-radius:6px;background:#eef1f4;cursor:zoom-in}
.np-prev .np-inner{position:absolute;left:0;top:0;transform-origin:0 0;box-shadow:0 1px 4px rgba(0,0,0,.15)}
.np-prev .np-badge{position:absolute;right:8px;bottom:8px;background:rgba(31,78,121,.9);color:#fff;font-size:12px;border-radius:12px;padding:3px 10px}
.np-viewer{position:fixed;inset:0;z-index:1000;background:rgba(30,34,40,.92);display:flex;flex-direction:column}
.np-viewer .np-bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;padding:10px 12px;background:#1f2328;color:#fff}
.np-viewer .np-bar b{flex:1;font-size:15px;min-width:120px}
.np-viewer .np-bar button{font-size:14px;padding:8px 12px;border:0;border-radius:6px;background:#e7edf3;color:#1f4e79;cursor:pointer}
.np-viewer .np-bar button.p{background:#2f81f7;color:#fff}
.np-viewer .np-body{flex:1;overflow:auto;-webkit-overflow-scrolling:touch;padding:12px}
.np-viewer .np-page{margin:0 auto;transform-origin:0 0;background:#fff}
.np-viewer .np-msg{color:#fff;text-align:center;font-size:13px;padding:6px}
.np-viewer img.np-shot{display:block;max-width:100%;margin:0 auto;background:#fff}
.np-off{position:fixed;left:-10000px;top:0;width:794px;pointer-events:none}
`;
  let cssDone = false;
  function css() {
    if (cssDone) return; cssDone = true;
    NPDocs.injectCss();
    const s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s);
  }

  /** 縮小プレビューを el に描画（幅に合わせて縮小） */
  function preview(el, data, onClick) {
    css();
    el.classList.add('np-prev');
    el.innerHTML = '<div class="np-inner">' + NPDocs.contractHtml(data) + '</div><span class="np-badge">タップで拡大</span>';
    const fit = () => {
      const w = el.clientWidth || 300, s = w / 794;
      const inner = el.querySelector('.np-inner'); if (!inner) return;
      inner.style.transform = 'scale(' + s + ')';
      el.style.height = Math.ceil(inner.firstChild.offsetHeight * s) + 'px';
    };
    fit();
    if (!el._npFit) { el._npFit = true; window.addEventListener('resize', fit); if (window.ResizeObserver) new ResizeObserver(fit).observe(el); }
    el.onclick = onClick || null;
  }

  /** 契約書を画像（canvas）にする */
  async function toCanvas(data, scale) {
    css();
    await load('html2canvas');
    const box = document.createElement('div'); box.className = 'np-off';
    box.innerHTML = NPDocs.contractHtml(data);
    document.body.appendChild(box);
    try {
      const imgs = Array.from(box.querySelectorAll('img'));
      await Promise.all(imgs.map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
      return await window.html2canvas(box.firstChild, { scale: scale || 2, backgroundColor: '#fff', useCORS: true, logging: false, windowWidth: 794 });
    } finally { box.remove(); }
  }
  /** 送信用のJPEG（data URL） */
  async function toJpeg(data) {
    const c = await toCanvas(data, 1.4);
    return c.toDataURL('image/jpeg', 0.82);
  }
  function fileName(data, ext) { return '雇用契約書_' + (data.name || '') + '_' + (data.date || '').replace(/-/g, '') + '.' + ext; }

  async function savePdf(data) {
    const c = await toCanvas(data, 2);
    await load('jspdf');
    const pdf = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
    pdf.addImage(c.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, 210, 297);
    pdf.save(fileName(data, 'pdf'));
  }

  /** 全画面で表示（確認・画像保存・PDF保存） */
  function open(data, title) {
    css();
    const v = document.createElement('div'); v.className = 'np-viewer';
    v.innerHTML = '<div class="np-bar"><b>' + (title || '雇用契約書') + '</b>' +
      '<button type="button" data-a="img">画像で保存</button><button type="button" data-a="pdf">PDFで保存</button><button type="button" class="p" data-a="close">閉じる</button></div>' +
      '<div class="np-msg"></div><div class="np-body"><div class="np-page">' + NPDocs.contractHtml(data) + '</div></div>';
    document.body.appendChild(v);
    document.body.style.overflow = 'hidden';
    const page = v.querySelector('.np-page'), body = v.querySelector('.np-body'), msg = v.querySelector('.np-msg');
    const fit = () => { const s = Math.min(1, (body.clientWidth - 24) / 794); page.style.width = '794px'; page.style.transform = 'scale(' + s + ')'; page.style.height = (page.firstChild.offsetHeight * s) + 'px'; page.style.marginLeft = Math.max(0, (body.clientWidth - 24 - 794 * s) / 2) + 'px'; };
    fit(); window.addEventListener('resize', fit);
    const close = () => { window.removeEventListener('resize', fit); v.remove(); document.body.style.overflow = ''; };
    v.querySelector('[data-a=close]').onclick = close;
    v.querySelector('[data-a=pdf]').onclick = async () => {
      msg.textContent = 'PDFを作成しています…';
      try { await savePdf(data); msg.textContent = 'PDFを保存しました（端末のダウンロード／ファイルに保存されます）。'; } catch (e) { msg.textContent = 'PDFを作成できませんでした：' + e.message; }
    };
    v.querySelector('[data-a=img]').onclick = async () => {
      msg.textContent = '画像を作成しています…';
      try {
        const url = (await toCanvas(data, 2)).toDataURL('image/png');
        const a = document.createElement('a'); a.href = url; a.download = fileName(data, 'png');
        document.body.appendChild(a); a.click(); a.remove();
        body.innerHTML = '<img class="np-shot" src="' + url + '" alt="雇用契約書">';
        msg.textContent = '画像を保存しました。保存されない場合は、画像を長押しして「写真に保存」を選んでください。';
      } catch (e) { msg.textContent = '画像を作成できませんでした：' + e.message; }
    };
    return { close: close };
  }

  window.NPContractUI = { preview: preview, open: open, toCanvas: toCanvas, toJpeg: toJpeg, savePdf: savePdf, load: load };
})();
