const fs = require('fs');
const data = JSON.parse(fs.readFileSync('figma-2116-143855.json', 'utf8'));

function rgbaToHex(r, g, b) {
  const toHex = v => Math.round(v * 255).toString(16).padStart(2, '0');
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

function extractNode(node, depth, maxDepth) {
  if (depth > maxDepth) return;
  const indent = '  '.repeat(depth);
  let info = indent + node.name + ' (' + node.type + ')';
  if (node.absoluteBoundingBox) {
    const bb = node.absoluteBoundingBox;
    info += ' [' + Math.round(bb.width) + 'x' + Math.round(bb.height) + ']';
  }
  if (node.layoutMode) info += ' layout:' + node.layoutMode;
  if (node.itemSpacing !== undefined) info += ' gap:' + node.itemSpacing;
  if (node.paddingLeft || node.paddingTop) {
    info += ' pad:' + (node.paddingTop||0) + '/' + (node.paddingRight||0) + '/' + (node.paddingBottom||0) + '/' + (node.paddingLeft||0);
  }
  if (node.cornerRadius) info += ' r:' + node.cornerRadius;
  if (node.fills && node.fills.length > 0) {
    node.fills.forEach(f => {
      if (f.type === 'SOLID' && f.color) info += ' bg:' + rgbaToHex(f.color.r, f.color.g, f.color.b);
    });
  }
  if (node.strokes && node.strokes.length > 0) {
    node.strokes.forEach(s => {
      if (s.type === 'SOLID' && s.color) info += ' border:' + rgbaToHex(s.color.r, s.color.g, s.color.b);
    });
  }
  if (node.strokeWeight && node.strokeWeight > 0) info += ' bw:' + node.strokeWeight;
  if (node.type === 'TEXT') {
    info += ' "' + (node.characters || '').substring(0, 80) + '"';
    if (node.style) {
      info += ' ' + node.style.fontFamily + '/' + node.style.fontSize + '/' + node.style.fontWeight;
      if (node.style.lineHeightPx) info += ' lh:' + Math.round(node.style.lineHeightPx);
    }
  }
  if (node.componentProperties) {
    const props = {};
    for (const [k, v] of Object.entries(node.componentProperties)) {
      if (v.value !== undefined) props[k.split('#')[0]] = v.value;
    }
    if (Object.keys(props).length) info += ' ' + JSON.stringify(props);
  }
  console.log(info);
  if (node.children) node.children.forEach(c => extractNode(c, depth + 1, maxDepth));
}

const nodeData = data.nodes['2116:143855'];
if (nodeData && nodeData.document) {
  const doc = nodeData.document;
  console.log('Name:', doc.name);
  console.log('Type:', doc.type);
  console.log('');
  if (doc.children) {
    doc.children.forEach(child => {
      console.log('\n=== ' + child.name + ' ===');
      extractNode(child, 0, 10);
    });
  }
} else {
  console.log('Node not found. Keys:', Object.keys(data.nodes || {}));
  console.log(JSON.stringify(data).substring(0, 500));
}
