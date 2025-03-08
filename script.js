const colorMap = {
    'aliceblue': '#f0f8ff', 'antiquewhite': '#faebd7', 'aqua': '#00ffff',
    // ... (include all 140+ color mappings)
    'yellowgreen': '#9acd32'
};

function obfuscate() {
    const input = document.getElementById('inputCSS').value;
    const obfuscated = obfuscateCSS(input);
    document.getElementById('outputCSS').value = obfuscated;
}

function obfuscateCSS(css) {
    // Remove comments
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');

    // Minify
    css = css.replace(/\s+/g, ' ').trim();

    // Convert color names to hex codes
    css = css.replace(/\b([a-zA-Z]+)\b/g, (match) => {
        const lower = match.toLowerCase();
        return colorMap[lower] || match;
    });

    // Obfuscate identifiers (excluding strings/URLs)
    css = css.replace(/(url\([^)]+\)|"([^"]*)"|'([^']*)')|([a-zA-Z0-9-_]+)/g, 
        (match, p1, p2, p3, p4) => {
            if (p1) return p1; // Leave URLs/strings
            return p4.split('').map(c => 
                `\\${c.charCodeAt(0).toString(16)}`
            ).join('');
        }
    );

    return css;
}

function download() {
    const output = document.getElementById('outputCSS').value;
    const blob = new Blob([output], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'obfuscated.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
