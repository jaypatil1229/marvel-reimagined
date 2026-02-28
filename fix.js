const fs = require('fs');
const files = fs.readdirSync('components').filter(f => f.endsWith('.jsx'));
files.forEach(f => {
  let c = fs.readFileSync('components/' + f, 'utf8');
  c = c.replace(/`"use client`";/, '"use client";');
  fs.writeFileSync('components/' + f, c);
});
