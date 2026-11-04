/*
 * 【partnerグループALL】氏名名簿（アプリ12）
 *   退職届のリンクを発行して、本人に送る。
 *   ・一覧画面：上の「退職届リンクを発行」→ 氏名を選ぶ → 退職日を指定
 *   ・レコード詳細：「退職届リンクを発行」→ 退職日を指定
 *   発行すると resign_link_date / resign_link_token / resign_link_at に保存し、
 *   本人は taishoku.html?r=レコードID&t=キー を開いて、生年月日で本人確認 → 署名・提出する。
 *   リンクは1回だけ有効（提出されると無効）。発行し直すと前のリンクは使えなくなる。
 *
 * 設置：アプリの設定 → JavaScript / CSSでカスタマイズ → PC用・スマートフォン用の両方に追加
 */
(function () {
  'use strict';

  const FORM_URL = 'https://newpartnercontact-bit.github.io/nyusha/taishoku.html';
  const F = {
    NAME: '文字列__1行_', KANA: 'フリガナ', ENROLL: '在籍', LEAVE: '日付_0', EMAIL: 'email',
    STATUS: 'resign_status', LINK_DATE: 'resign_link_date', LINK_AT: 'resign_link_at', TOKEN: 'resign_link_token',
  };

  const isMobile = () => typeof kintone.mobile !== 'undefined' && /^\/k\/m\//.test(location.pathname);
  const appId = () => (isMobile() ? kintone.mobile.app.getId() : kintone.app.getId());
  const val = (rec, code) => (rec && rec[code] && rec[code].value != null ? rec[code].value : '');
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const todayJst = () => { const d = new Date(Date.now() + 9 * 3600e3); return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()); };
  function wareki(s) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); if (!m) return '';
    const y = +m[1], key = y * 10000 + (+m[2]) * 100 + (+m[3]);
    const e = key >= 20190501 ? ['令和', y - 2018] : ['平成', y - 1988];
    return e[0] + (e[1] === 1 ? '元' : e[1]) + '年' + (+m[2]) + '月' + (+m[3]) + '日';
  }
  function newToken() {
    const a = new Uint8Array(18); crypto.getRandomValues(a);
    return Array.from(a, b => b.toString(16).padStart(2, '0')).join('');
  }
  const linkOf = (id, token) => FORM_URL + '?r=' + encodeURIComponent(id) + '&t=' + encodeURIComponent(token);
  const messageOf = (name, date, url) =>
    name + ' さん\n\nお疲れさまです。退職の手続きとして、退職届の提出をお願いします。\n\n退職日：' + wareki(date) +
    '\n\n下のリンクを開き、生年月日を入力して、内容を確認のうえ署名・提出してください（このリンクは1回だけ使えます）。\n' + url;

  /* ---------- 画面（ダイアログ） ---------- */
  const CSS = `
#np-rs{position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.45);display:flex;align-items:flex-start;justify-content:center;overflow:auto;padding:40px 12px}
#np-rs .box{background:#fff;border-radius:10px;width:100%;max-width:520px;padding:18px 18px 16px;font-size:14px;color:#222;line-height:1.7;box-shadow:0 6px 24px rgba(0,0,0,.3)}
#np-rs h3{margin:0 0 10px;font-size:17px;color:#1f4e79}
#np-rs label{display:block;font-weight:600;margin:10px 0 4px}
#np-rs input,#np-rs textarea{width:100%;box-sizing:border-box;font-size:15px;padding:8px;border:1px solid #c9d1d9;border-radius:6px;font-family:inherit}
#np-rs textarea{min-height:150px;font-size:13px}
#np-rs .hint{font-size:12px;color:#666;margin-top:3px}
#np-rs .warn{background:#fff8e1;border:1px solid #ffe082;border-radius:6px;padding:8px;font-size:13px;margin-top:10px}
#np-rs .err{color:#c62828;font-size:13px;min-height:1em;margin-top:6px}
#np-rs .btns{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;margin-top:14px}
#np-rs button,#np-rs a.b{font-size:14px;padding:8px 14px;border:0;border-radius:6px;cursor:pointer;text-decoration:none;display:inline-block}
#np-rs .p{background:#1f4e79;color:#fff}
#np-rs .s{background:#e7edf3;color:#1f4e79}
#np-rs .line{background:#06c755;color:#fff}
#np-rs .who{font-size:16px;font-weight:700}
.np-rs-btn{font-size:13px;padding:6px 12px;border:1px solid #b23b3b;border-radius:6px;background:#fff;color:#b23b3b;cursor:pointer;margin:6px 8px;vertical-align:middle}`;
  function injectCss() {
    if (document.getElementById('np-rs-css')) return;
    const s = document.createElement('style'); s.id = 'np-rs-css'; s.textContent = CSS; document.head.appendChild(s);
  }
  function dialog(html) {
    injectCss();
    const old = document.getElementById('np-rs'); if (old) old.remove();
    const ov = document.createElement('div'); ov.id = 'np-rs';
    ov.innerHTML = '<div class="box">' + html + '</div>';
    ov.addEventListener('click', e => { if (e.target === ov) ov.remove(); });
    document.body.appendChild(ov);
    return ov;
  }

  /** 在籍中の名簿（氏名の候補） */
  async function loadPeople() {
    const out = [];
    for (let offset = 0; ; offset += 500) {
      const r = await kintone.api(kintone.api.url('/k/v1/records', true), 'GET', {
        app: appId(), fields: ['$id', F.NAME, F.KANA, F.ENROLL, F.STATUS],
        query: 'order by ' + F.KANA + ' asc limit 500 offset ' + offset,
      });
      r.records.forEach(x => out.push({ id: x.$id.value, name: val(x, F.NAME), kana: val(x, F.KANA), enroll: val(x, F.ENROLL), status: val(x, F.STATUS) }));
      if (r.records.length < 500) break;
    }
    return out;
  }

  /** ① 発行画面（rec があれば氏名は固定） */
  async function openIssue(rec) {
    let people = null;
    const fixed = !!rec;
    const ov = dialog(
      '<h3>退職届リンクを発行</h3>' +
      (fixed ? '<div class="who">' + esc(val(rec, F.NAME)) + ' さん</div>'
        : '<label>氏名</label><input type="text" id="rs-name" list="rs-names" placeholder="氏名・フリガナで検索" autocomplete="off"><datalist id="rs-names"></datalist><div class="hint" id="rs-nhint">名簿を読み込み中…</div>') +
      '<label>退職日</label><input type="date" id="rs-date">' +
      '<div class="hint">本人と相談して決めた退職日を入れてください。本人は変更できません。</div>' +
      '<div id="rs-warn"></div><div class="err" id="rs-err"></div>' +
      '<div class="btns"><button type="button" class="s" data-a="close">閉じる</button><button type="button" class="p" data-a="issue">リンクを発行</button></div>');
    const $ = s => ov.querySelector(s);
    $('[data-a=close]').onclick = () => ov.remove();
    $('#rs-date').value = (rec && (val(rec, F.LINK_DATE) || val(rec, F.LEAVE))) || '';

    const warnFor = (status, enroll) => {
      const w = [];
      if (/提出済/.test(status)) w.push('この人の退職届はすでに「' + status + '」です。発行し直すと、もう一度提出してもらうことになります。');
      else if (status === 'リンク送付済') w.push('すでにリンクを送付済みです。発行し直すと、前のリンクは使えなくなります。');
      if (enroll === '退職') w.push('在籍はすでに「退職」になっています（提出されると、退社日は指定した日付で上書きされます）。');
      $('#rs-warn').innerHTML = w.length ? '<div class="warn">' + w.map(esc).join('<br>') + '</div>' : '';
    };
    if (fixed) warnFor(val(rec, F.STATUS), val(rec, F.ENROLL));
    else {
      try {
        people = await loadPeople();
        const dl = $('#rs-names');
        people.forEach(p => { const o = document.createElement('option'); o.value = p.name; o.label = (p.kana || '') + (p.enroll === '退職' ? '（退職）' : ''); dl.appendChild(o); });
        $('#rs-nhint').textContent = '名前の一部を入れると候補が出ます（' + people.length + '人）。';
      } catch (e) { $('#rs-nhint').textContent = '名簿を読み込めませんでした：' + (e.message || e); }
      $('#rs-name').addEventListener('input', () => {
        const p = people && people.filter(x => x.name.replace(/[\s　]/g, '') === $('#rs-name').value.replace(/[\s　]/g, ''));
        if (p && p.length === 1) warnFor(p[0].status, p[0].enroll); else $('#rs-warn').innerHTML = '';
      });
    }

    $('[data-a=issue]').onclick = async () => {
      const err = $('#rs-err'), btn = $('[data-a=issue]');
      err.textContent = '';
      const date = $('#rs-date').value;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) { err.textContent = '退職日を入れてください。'; return; }
      let id, name;
      if (fixed) { id = rec.$id.value; name = val(rec, F.NAME); }
      else {
        const q = $('#rs-name').value.replace(/[\s　]/g, '');
        const hit = (people || []).filter(x => x.name.replace(/[\s　]/g, '') === q);
        if (!q) { err.textContent = '氏名を選んでください。'; return; }
        if (hit.length === 0) { err.textContent = '名簿に「' + $('#rs-name').value + '」さんが見つかりません。候補から選んでください。'; return; }
        if (hit.length > 1) { err.textContent = '同じ氏名の人が複数います。レコードの詳細画面から発行してください。'; return; }
        id = hit[0].id; name = hit[0].name;
      }
      btn.disabled = true; btn.textContent = '発行しています…';
      try {
        const token = newToken();
        const record = {};
        record[F.LINK_DATE] = { value: date };
        record[F.TOKEN] = { value: token };
        record[F.LINK_AT] = { value: new Date().toISOString().replace(/\.\d+Z$/, 'Z') };
        record[F.STATUS] = { value: 'リンク送付済' };
        await kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', { app: appId(), id: id, record: record });
        const full = await kintone.api(kintone.api.url('/k/v1/record', true), 'GET', { app: appId(), id: id });
        openResult(full.record, date, linkOf(id, token), fixed);
      } catch (e) {
        btn.disabled = false; btn.textContent = 'リンクを発行';
        err.textContent = '発行できませんでした：' + ((e && e.message) || JSON.stringify(e));
      }
    };
  }

  /** ② 発行結果：コピー・LINE・メール */
  function openResult(rec, date, url, reloadOnClose) {
    const name = val(rec, F.NAME), email = val(rec, F.EMAIL);
    const msg = messageOf(name, date, url);
    const ov = dialog(
      '<h3>退職届リンクを発行しました</h3>' +
      '<div class="who">' + esc(name) + ' さん　退職日：' + esc(wareki(date)) + '</div>' +
      '<label>送る文面（そのままコピーして送れます）</label><textarea id="rs-msg">' + esc(msg) + '</textarea>' +
      '<div class="hint">リンクは1回だけ使えます。提出されると、名簿の在籍が「退職」、退社日が ' + esc(wareki(date)) + ' になります。</div>' +
      '<div class="btns">' +
      '<button type="button" class="s" data-a="copyurl">リンクだけコピー</button>' +
      '<button type="button" class="s" data-a="copy">文面をコピー</button>' +
      '<a class="b line" target="_blank" rel="noopener" href="https://line.me/R/msg/text/?' + encodeURIComponent(msg) + '">LINEで送る</a>' +
      (email ? '<a class="b s" href="mailto:' + esc(email) + '?subject=' + encodeURIComponent('【退職届】提出のお願い') + '&body=' + encodeURIComponent(msg) + '">メールで送る</a>' : '') +
      '<button type="button" class="p" data-a="close">閉じる</button></div>' +
      (email ? '' : '<div class="hint" style="text-align:right">名簿にメールアドレスが無いため、メール送信ボタンは出ていません。</div>'));
    const copy = (text, btn) => {
      const done = () => { const t = btn.textContent; btn.textContent = 'コピーしました'; setTimeout(() => { btn.textContent = t; }, 1500); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => fallback());
      else fallback();
      function fallback() { const ta = ov.querySelector('#rs-msg'); const keep = ta.value; ta.value = text; ta.select(); try { document.execCommand('copy'); done(); } catch (_) {} ta.value = keep; }
    };
    ov.querySelector('[data-a=copy]').onclick = e => copy(ov.querySelector('#rs-msg').value, e.target);
    ov.querySelector('[data-a=copyurl]').onclick = e => copy(url, e.target);
    ov.querySelector('[data-a=close]').onclick = () => { ov.remove(); if (reloadOnClose) location.reload(); };
  }

  /* ---------- ボタンの設置 ---------- */
  function button(label, onClick) {
    injectCss();
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'np-rs-btn'; b.textContent = label; b.onclick = onClick;
    return b;
  }
  function onIndex(event) {
    const space = isMobile() ? kintone.mobile.app.getHeaderSpaceElement() : kintone.app.getHeaderMenuSpaceElement();
    if (!space || document.getElementById('np-rs-index')) return event;
    const b = button('📝 退職届リンクを発行', () => openIssue(null)); b.id = 'np-rs-index';
    space.appendChild(b);
    return event;
  }
  function onDetail(event) {
    const space = isMobile() ? kintone.mobile.app.record.getHeaderSpaceElement() : kintone.app.record.getHeaderMenuSpaceElement();
    if (!space || document.getElementById('np-rs-detail')) return event;
    const rec = event.record;
    const st = val(rec, F.STATUS);
    const b = button('📝 退職届リンクを発行' + (st && st !== '未提出' ? '（' + st + '）' : ''), () => openIssue(rec)); b.id = 'np-rs-detail';
    space.appendChild(b);
    return event;
  }

  kintone.events.on('app.record.index.show', onIndex);
  kintone.events.on('mobile.app.record.index.show', onIndex);
  kintone.events.on('app.record.detail.show', onDetail);
  kintone.events.on('mobile.app.record.detail.show', onDetail);
})();
