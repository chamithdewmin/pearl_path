// Fix for @babel/plugin-transform-runtime nested babel-plugin-polyfill-corejs3
// missing core-js-compat/get-modules-list-for-target-version.js (and deps).
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'node_modules', 'core-js-compat');
const dest = path.join(root, 'node_modules', '@babel', 'plugin-transform-runtime', 'node_modules', 'babel-plugin-polyfill-corejs3', 'core-js-compat');

const files = ['get-modules-list-for-target-version.js', 'helpers.js', 'modules.json', 'modules-by-versions.json'];

if (fs.existsSync(src) && fs.existsSync(dest)) {
  for (const f of files) {
    const s = path.join(src, f);
    const d = path.join(dest, f);
    if (fs.existsSync(s)) fs.copyFileSync(s, d);
  }
}
