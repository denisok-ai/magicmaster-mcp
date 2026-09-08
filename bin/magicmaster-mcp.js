#!/usr/bin/env node
// Thin stdio bridge: clients that cannot speak streamable HTTP reach the hosted
// Magic Master MCP server through mcp-remote. Set MAGICMASTER_MCP_URL to use the
// anonymous endpoint (https://magicmaster.pro/mcp) instead of the OAuth one.
//
// mcp-remote is a real dependency, so the copy next to us is used when it is
// installed (container builds, `npm i -g magicmaster-mcp`). Only when it is
// missing — a bare `npx -y magicmaster-mcp` with no install step — do we fall
// back to fetching it from the registry: a container must not depend on the
// registry being reachable at run time.
const { spawn } = require('child_process');

const url = process.env.MAGICMASTER_MCP_URL || 'https://magicmaster.pro/mcp/oauth';

let cmd;
let args;
try {
  cmd = process.execPath;
  args = [require.resolve('mcp-remote/dist/proxy.js'), url];
} catch (_) {
  cmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  args = ['-y', 'mcp-remote', url];
}

const child = spawn(cmd, args, { stdio: 'inherit' });
child.on('exit', (code) => process.exit(code ?? 0));
