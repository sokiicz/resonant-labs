const fs = require('fs');
const base = 'D:/AI/apps/resonant-studio/';
const main = fs.readFileSync(base + 'js/main.js', 'utf8');
console.log('main.js uses SITE_DATA:', main.includes('window.SITE_DATA'));
console.log('main.js no hardcoded apps:', main.indexOf("'music-mouse'") === -1);
const data = fs.readFileSync(base + 'js/site-data.js', 'utf8');
console.log('site-data.js apps:', (data.match(/id: '/g) || []).length);
['index.html','apps/music-mouse.html','blog/art-of-prompting.html'].forEach(function(p) {
  const h = fs.readFileSync(base + p, 'utf8');
  console.log(p + ' has site-data:', h.includes('site-data.js'));
});
