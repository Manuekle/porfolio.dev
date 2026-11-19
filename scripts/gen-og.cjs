// Compatibility entry point. All social images use the exact portfolio font.
// Run: node scripts/gen-og.cjs (requires uv).
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const result = spawnSync('uv', ['run', path.join(__dirname, 'gen-social.py')], { stdio: 'inherit' });
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
