// PM2 is an alternative process supervisor for non-container deployments.
// Build first; environment variables must be supplied by the host.
module.exports = {
  apps: [
    { name: 'sheet-api', cwd: './apps/api', script: 'dist/main.js', env: { NODE_ENV: 'production', PORT: '3001' } },
    { name: 'sheet-web', cwd: './apps/web', script: 'node_modules/next/dist/bin/next', args: 'start -p 3000', env: { NODE_ENV: 'production' } },
  ],
};
