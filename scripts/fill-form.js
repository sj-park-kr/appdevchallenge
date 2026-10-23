// 기획서.md 원고를 접수양식 docx 02장(1~8번 칸, 앱명)에 채운다.
// 사용: node scripts/fill-form.js [원본.docx] [원고.md] [출력.docx]
// 01·04장(개인정보·서명)은 건드리지 않는다.
const fs = require('fs');
const zlib = require('zlib');

const [src = 'contest-application-consent.docx', mdPath = '기획서.md', out = 'contest-application-filled.docx'] = process.argv.slice(2);

// --- 최소 zip 읽기/쓰기 (stored·deflate만 지원) ---
function readZip(buf) {
  let eocd = buf.length - 22;
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) throw new Error('zip EOCD not found');
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const entries = [];
  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error('bad central dir');
    const method = buf.readUInt16LE(p + 10), csize = buf.readUInt32LE(p + 20);
    const nlen = buf.readUInt16LE(p + 28), xlen = buf.readUInt16LE(p + 30), clen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nlen);
    const dataStart = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const raw = buf.subarray(dataStart, dataStart + csize);
    if (method !== 0 && method !== 8) throw new Error(`unsupported zip method ${method}: ${name}`);
    entries.push({ name, data: method === 8 ? zlib.inflateRawSync(raw) : Buffer.from(raw) });
    p += 46 + nlen + xlen + clen;
  }
  return entries;
}

function writeZip(entries) {
  const locals = [], centrals = [];
  let offset = 0;
  for (const { name, data } of entries) {
    const nameBuf = Buffer.from(name, 'utf8'), comp = zlib.deflateRawSync(data), crc = zlib.crc32(data);
    const h = Buffer.alloc(30);
    h.writeUInt32LE(0x04034b50, 0); h.writeUInt16LE(20, 4); h.writeUInt16LE(0x0800, 6); h.writeUInt16LE(8, 8);
    h.writeUInt32LE(0x00210000, 10); // 1980-01-01 고정 시각
    h.writeUInt32LE(crc, 14); h.writeUInt32LE(comp.length, 18); h.writeUInt32LE(data.length, 22); h.writeUInt16LE(nameBuf.length, 26);
    const c = Buffer.alloc(46);
    c.writeUInt32LE(0x02014b50, 0); c.writeUInt16LE(20, 4); c.writeUInt16LE(20, 6); c.writeUInt16LE(0x0800, 8); c.writeUInt16LE(8, 10);
    c.writeUInt32LE(0x00210000, 12); c.writeUInt32LE(crc, 16); c.writeUInt32LE(comp.length, 20); c.writeUInt32LE(data.length, 24);
    c.writeUInt16LE(nameBuf.length, 28); c.writeUInt32LE(offset, 42);
    locals.push(h, nameBuf, comp); centrals.push(c, nameBuf);
    offset += 30 + nameBuf.length + comp.length;
  }
  const cd = Buffer.concat(centrals), e = Buffer.alloc(22);
  e.writeUInt32LE(0x06054b50, 0); e.writeUInt16LE(entries.length, 8); e.writeUInt16LE(entries.length, 10);
  e.writeUInt32LE(cd.length, 12); e.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, cd, e]);
}

// --- 원고 파싱: "## 앱명", "## 1".."## 8" 섹션 ---
const sections = {};
let cur = null;
for (const line of fs.readFileSync(mdPath, 'utf8').split(/\r?\n/)) {
  const m = line.match(/^## (.+)$/);
  if (m) { cur = m[1].trim(); sections[cur] = []; continue; }
  if (cur && line.trim()) sections[cur].push(line.trim());
}
const appName = (sections['앱명'] || [])[0] || '';

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const run = (text, bold) => `<w:r><w:rPr>${bold ? '<w:b/><w:bCs/>' : ''}<w:lang w:eastAsia="ko-KR"/></w:rPr><w:t xml:space="preserve">${esc(text)}</w:t></w:r>`;
function para(line) {
  const ind = line.startsWith('- ') ? '<w:ind w:left="200" w:hanging="200"/>' : '';
  const text = line.startsWith('- ') ? '· ' + line.slice(2) : line;
  // **굵게** 구간 지원
  const runs = text.split(/(\*\*[^*]+\*\*)/).filter(Boolean)
    .map(t => t.startsWith('**') ? run(t.slice(2, -2), true) : run(t, false)).join('');
  return `<w:p><w:pPr><w:spacing w:after="60" w:line="300" w:lineRule="auto"/>${ind}</w:pPr>${runs}</w:p>`;
}
const block = lines => (lines.length ? lines : [' ']).map(para).join('');

// --- document.xml 수정 ---
const entries = readZip(fs.readFileSync(src));
const doc = entries.find(e => e.name === 'word/document.xml');
let xml = doc.data.toString('utf8');

// 1~8번 칸: 내용 컨트롤(sdt)이 든 문단을 원고 문단으로 교체 (문서 순서 = 1..8)
const sdtCount = (xml.match(/<w:sdt>/g) || []).length;
if (sdtCount !== 8) throw new Error(`expected 8 answer boxes, found ${sdtCount}`);
for (let n = 1; n <= 8; n++) {
  const s = xml.indexOf('<w:sdt>');
  const pStart = xml.lastIndexOf('<w:p ', s);
  const pEnd = xml.indexOf('</w:p>', xml.indexOf('</w:sdt>', s)) + '</w:p>'.length;
  xml = xml.slice(0, pStart) + block(sections[String(n)] || []) + xml.slice(pEnd);
}

// 앱명 칸: "프로젝트명:" 문단의 밑줄을 앱명으로
if (appName) {
  xml = xml.replace(/<w:p [^>]*>(?:(?!<\/w:p>).)*?프로젝트명:(?:(?!<\/w:p>).)*?<\/w:p>/g, p => {
    let filled = false;
    return p.replace(/(<w:t[^>]*>)([^<]*)(<\/w:t>)/g, (all, a, t, b) => {
      if (filled) return a + t.replace(/_+/g, '') + b;
      if (!/_{3,}/.test(t)) return all;
      filled = true;
      return a + t.replace(/_+/, esc(appName)).replace(/_+/g, '') + b;
    });
  });
}

doc.data = Buffer.from(xml, 'utf8');
// [Content_Types].xml을 맨 앞에
entries.sort((a, b) => (b.name === '[Content_Types].xml') - (a.name === '[Content_Types].xml'));
fs.writeFileSync(out, writeZip(entries));
console.log(`wrote ${out} (app name: ${appName || '없음'})`);
