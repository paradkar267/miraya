const fs = require('fs');
const path = require('path');
const walk = dir => {
    fs.readdirSync(dir).forEach(file => {
        const p = path.join(dir, file);
        if(fs.statSync(p).isDirectory()) walk(p);
        else if(p.endsWith('.jsx')) {
            let content = fs.readFileSync(p, 'utf8');
            let newContent = content.replace(/'\$\{API_URL\}(.*?)'/g, (m, p1) => `\`\${API_URL}${p1}\``);
            if(content !== newContent) fs.writeFileSync(p, newContent);
        }
    });
};
walk('./src');
