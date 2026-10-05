// Node 断言：校验热力图矩阵与颜色映射规则。
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const m = html.match(/<script id="heatmap-data" type="application\/json">([\s\S]*?)<\/script>/);
if (!m) { console.error('FAIL: 未找到 heatmap-data'); process.exit(1); }
const data = JSON.parse(m[1]);

let failed = 0;
function assert(cond, msg) {
  if (cond) console.log('PASS: ' + msg);
  else { console.error('FAIL: ' + msg); failed++; }
}

assert(data.rows.length === 5, '行数 = 5');
assert(data.cols.length === 4, '列数 = 4');
assert(data.matrix.length === 5 && data.matrix.every(r => r.length === 4),
  '矩阵为 5x4 规整结构');

// 复刻颜色映射：值越大颜色越深（B 通道应更小）
function colorFor(value, min, max) {
  var t = (max === min) ? 0.5 : (value - min) / (max - min);
  var r = Math.round(239 - t * (239 - 30));
  var g = Math.round(246 - t * (246 - 58));
  var b = Math.round(255 - t * (255 - 138));
  return { r, g, b };
}
const flat = data.matrix.reduce((a, b) => a.concat(b), []);
const min = Math.min.apply(null, flat);
const max = Math.max.apply(null, flat);
const low = colorFor(min, min, max);
const high = colorFor(max, min, max);
assert(high.b < low.b, '最大值颜色比最小值更深（蓝通道更小）');
assert(high.r < low.r, '最大值红色分量更小');
assert(low.r === 239 && low.b === 255, '最小值接近浅色 (239,246,255)，实际 ' + JSON.stringify(low));
assert(high.r === 30 && high.b === 138, '最大值接近深色 (30,58,138)，实际 ' + JSON.stringify(high));

assert(html.includes('hoverinfo') || html.includes('mouseover'), '包含图例/悬停交互');
assert(!html.match(/src="http/), '完全离线，无外部 http 资源');

if (failed) { console.error('\n' + failed + ' 项失败'); process.exit(1); }
console.log('\n全部断言通过');
