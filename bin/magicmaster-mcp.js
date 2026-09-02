#!/usr/bin/env node
// Thin stdio bridge: clients that cannot speak streamable HTTP reach the hosted
// Magic Master MCP server through mcp-remote. Set MAGICMASTER_MCP_URL to use the
// anonymous endpoint (https://magicmaster.pro/mcp) instead of the OAuth one.
const { spawn } = require('child_process');
const url = process.env.MAGICMASTER_MCP_URL || 'https://magicmaster.pro/mcp/oauth';
const child = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['-y', 'mcp-remote', url], { stdio: 'inherit' });
child.on('exit', (code) => process.exit(code ?? 0));
