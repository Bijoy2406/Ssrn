const fs = require('fs');
const content = fs.readFileSync('c:/Figma/Ssrn/js/pages/profile.js', 'utf8');
const lines = content.split(/\r?\n/);
let outputLines = [];
outputLines.push(lines[0]); // const Profile = {
outputLines.push("    countryCodes: [],");
outputLines.push("");
outputLines.push("    async loadCountries() {");
outputLines.push("        try {");
outputLines.push("            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,idd,flags');");
outputLines.push("            if (!response.ok) throw new Error('Network response was not ok');");
outputLines.push("            const data = await response.json();");
outputLines.push("            ");
outputLines.push("            this.countryCodes = [];");
outputLines.push("            data.forEach(country => {");
outputLines.push("                if (!country.idd || !country.idd.root) return;");
outputLines.push("                ");
outputLines.push("                const root = country.idd.root;");
outputLines.push("                const suffixes = country.idd.suffixes || [];");
outputLines.push("                ");
outputLines.push("                if (suffixes.length === 0) {");
outputLines.push("                    this.countryCodes.push({ code: root, name: country.name.common, flagUrl: country.flags.svg });");
outputLines.push("                } else if (suffixes.length === 1) {");
outputLines.push("                    this.countryCodes.push({ code: root + suffixes[0], name: country.name.common, flagUrl: country.flags.svg });");
outputLines.push("                } else {");
outputLines.push("                    this.countryCodes.push({ code: root, name: country.name.common, flagUrl: country.flags.svg });");
outputLines.push("                    suffixes.forEach(suffix => {");
outputLines.push("                        this.countryCodes.push({ code: root + suffix, name: country.name.common, flagUrl: country.flags.svg });");
outputLines.push("                    });");
outputLines.push("                }");
outputLines.push("            });");
outputLines.push("            ");
outputLines.push("            this.countryCodes.sort((a, b) => b.code.length - a.code.length);");
outputLines.push("            ");
outputLines.push("            if (this.mobileInput && this.mobileInput.value) {");
outputLines.push("                this.detectCountryCode();");
outputLines.push("            }");
outputLines.push("        } catch (error) {");
outputLines.push("            console.error('Error fetching country data:', error);");
outputLines.push("        }");
outputLines.push("    },");

let inDetect = false;
for (let i = 113; i < lines.length; i++) {
    const line = lines[i];

    // Skip the sorting line
    if (line.includes('// Sort country codes by length')) {
        outputLines.push('        // Fetch countries on load');
        outputLines.push('        this.loadCountries();');
        i++; // skip next line: this.countryCodes.sort...
        continue;
    }

    if (line === '    detectCountryCode() {') {
        inDetect = true;

        // append new detectCountryCode
        outputLines.push(`    detectCountryCode() {
        const value = this.mobileInput.value.trim();
        
        let searchCode = value;
        if (searchCode.length > 0 && !searchCode.startsWith('+')) {
            searchCode = '+' + searchCode;
        }

        let matched = null;
        if (searchCode.startsWith('+')) {
            for (const country of this.countryCodes) {
                if (searchCode.startsWith(country.code)) {
                    matched = country;
                    break;
                }
            }
        }

        if (matched) {
            if (this.mobilePrefix) this.mobilePrefix.style.display = 'flex';
            if (this.mobileFlag) {
                if (matched.flagUrl) {
                    this.mobileFlag.innerHTML = "<img src='" + matched.flagUrl + "' alt='" + matched.name + " flag' style='width: 24px; height: 16px; object-fit: cover; border-radius: 2px;'>";
                } else {
                    this.mobileFlag.textContent = matched.name;
                }
            }
            if (this.mobileCode) this.mobileCode.textContent = matched.code;
        } else {
            if (value.length > 0) {
                if (this.mobilePrefix) this.mobilePrefix.style.display = 'flex';
            } else {
                if (this.mobilePrefix) this.mobilePrefix.style.display = 'none';
            }
            if (this.mobileFlag) this.mobileFlag.innerHTML = '<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" rx="2" fill="#E0E0E0"/><circle cx="12" cy="8" r="5" fill="none" stroke="#999" stroke-width="1.5"/><path d="M12 3V13M7 8H17M8 4.5Q12 7 16 4.5M8 11.5Q12 9 16 11.5" fill="none" stroke="#999" stroke-width="0.8"/></svg>';
            if (this.mobileCode) this.mobileCode.textContent = '';
        }
    },`);
        continue;
    }

    if (inDetect) {
        if (line === '    toggleDropdown(dropdown) {') {
            inDetect = false;
            outputLines.push(line);
        }
        continue; // skip original detectCountryCode lines
    }

    if (!inDetect) {
        outputLines.push(line);
    }
}

fs.writeFileSync('c:/Figma/Ssrn/js/pages/profile.js', outputLines.join('\n'));
console.log('Update absolute complete.');
