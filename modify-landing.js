const fs = require('fs');
const path = 'c:/Figma/Ssrn/pages/Landing/landing-page-anonymous.html';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split(/\r?\n/);
let outputLines = [];
let skip1 = false;
let skip2 = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes('<!-- Calendar/Time Picker Overlay -->')) {
        skip1 = true;
    }

    if (skip1 && line.includes('<!-- Hero Section -->')) {
        skip1 = false;
    }

    if (!skip1 && !skip2 && line.includes('let selectedDate = null;')) {
        skip2 = true;
    }

    if (skip2 && line.includes("window.addEventListener('resize', setupDatetimeInputs);")) {
        skip2 = false;
        continue;
    }

    if (skip2 && line.includes("document.getElementById('mobileMenuOverlay').addEventListener('click', function (e)")) {
        // Just a safety check if we pass the end
    }

    if (!skip1 && !skip2) {
        outputLines.push(line);
    }
}

fs.writeFileSync(path, outputLines.join('\n'), 'utf8');
console.log('Mobile picker removed');
