const fs = require('fs');

const path = 'c:/Figma/Ssrn/pages/Landing/landing-page-anonymous.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove the mobile picker HTML overlay
const patternHTML = /<!-- Calendar\/Time Picker Overlay -->[\s\S]*?<\/div>\s*<\/div>\s*<!-- Hero Section -->/;
content = content.replace(patternHTML, '<!-- Hero Section -->');

// 2. Remove the JS code associated with the mobile picker
// Match from "let selectedDate = null;" to "window.addEventListener('resize', setupDatetimeInputs);"
const patternJS = /let selectedDate = null;[\s\S]*?window\.addEventListener\('resize',\s*setupDatetimeInputs\);/;
content = content.replace(patternJS, '');

fs.writeFileSync(path, content, 'utf8');
console.log('Mobile datetime picker removed successfully');
