# Magic Master MCP — audio mastering for AI agents

Remote [MCP](https://modelcontextprotocol.io) server that lets Claude, ChatGPT, Cursor, VS Code, Claude Code and any other MCP client **master audio**: hit a LUFS target with True Peak limiting, strip the **Suno / Udio AI fingerprint**, and get a mastering passport back in the chat.

- Server: `https://magicmaster.pro/mcp` (streamable HTTP, protocol `2026-07-28`, also `2025-11-25` / `2025-06-18`)
- OAuth endpoint for paid tools: `https://magicmaster.pro/mcp/oauth`
- Registry entry: [`pro.magicmaster/mastering`](https://registry.modelcontextprotocol.io/v0/servers?search=magicmaster)
- Agent playbook: <https://magicmaster.pro/agents.md> · machine manifest: <https://magicmaster.pro/agent.json>
- Human page (RU/EN): <https://magicmaster.pro/mcp>

Nothing to install: the server is hosted. This repository holds the connection recipes and a tiny stdio bridge for clients that cannot speak HTTP.

## One-click install

[![Add to Cursor](https://img.shields.io/badge/Cursor-Add_Magic_Master-000000?logo=cursor)](cursor://anysphere.cursor-deeplink/mcp/install?name=magicmaster&config=eyJ1cmwiOiJodHRwczovL21hZ2ljbWFzdGVyLnByby9tY3AifQ==)
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Magic_Master-0098FF?logo=visualstudiocode)](vscode:mcp/install?%7B%22name%22%3A%22magicmaster%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmagicmaster.pro%2Fmcp%22%7D)

## Connect

**Claude Code**

```bash
claude mcp add --transport http magicmaster https://magicmaster.pro/mcp
```

**claude.ai / Claude Desktop (custom connector, OAuth):** Settings → Connectors → *Add custom connector* → URL `https://magicmaster.pro/mcp/oauth` → sign in on the consent page. Use `https://magicmaster.pro/mcp` if you only need the free tools.

**Claude Desktop (`claude_desktop_config.json`)**

```json
{ "mcpServers": { "magicmaster": { "type": "http", "url": "https://magicmaster.pro/mcp" } } }
```

**Cursor (`.cursor/mcp.json`)**

```json
{ "mcpServers": { "magicmaster": { "url": "https://magicmaster.pro/mcp" } } }
```

**VS Code (`.vscode/mcp.json`)**

```json
{ "servers": { "magicmaster": { "type": "http", "url": "https://magicmaster.pro/mcp" } } }
```

**ChatGPT (Developer mode → Connectors → Create):** URL `https://magicmaster.pro/mcp/oauth`, authentication OAuth.

**stdio-only clients** — bridge through [`mcp-remote`](https://www.npmjs.com/package/mcp-remote):

```json
{ "mcpServers": { "magicmaster": { "command": "npx", "args": ["-y", "mcp-remote", "https://magicmaster.pro/mcp/oauth"] } } }
```

or the npm package — `npx -y magicmaster-mcp` ([magicmaster-mcp on npm](https://www.npmjs.com/package/magicmaster-mcp)), a one-line wrapper around the same bridge:

```json
{ "mcpServers": { "magicmaster": { "command": "npx", "args": ["-y", "magicmaster-mcp"] } } }
```

## Tools

| Tool | What it does | Cost |
|---|---|---|
| `analyze_track` | LUFS, true peak, duration, correlation, genre hint | free |
| `clean_ai_trace` | removes the Suno / Udio digital fingerprint, loudness untouched | free |
| `master_track` | mastering: 24 presets, LUFS target, 6 export formats | 1 token |
| `get_job` | status + result metrics, with a mastering passport widget (MCP Apps) | free |
| `check_limits` | balance, remaining free quota, reset time | free |
| `list_presets`, `get_pricing`, `get_service_info` | presets with target loudness, live prices, service manifest | free |
| `create_topup_link` | prepares a checkout for the human — the agent cannot pay by itself | free |

Typical flow: `analyze_track` → (`clean_ai_trace` for AI-generated tracks) → `master_track` → poll `get_job`. A master takes 20–60 s.

## Access and pricing

- Free tools need no account.
- Mastering: 3 per month per IP without an account, 1 per day with a free account.
- Register an agent once (`POST /api/agents/register`) and get **3 trial masters**; afterwards 1 token = 1 full PRO master. Tokens never expire. Live prices: `GET /api/tokens/packages`.
- Rules for agents, error codes and the payment protocol: <https://magicmaster.pro/agents.md>.

## Links

Terms <https://magicmaster.pro/terms> · Privacy <https://magicmaster.pro/privacy> · Public OpenAPI <https://magicmaster.pro/openapi-public.json> · Support support@magicmaster.pro

---

### По-русски

Удалённый MCP-сервер Magic Master: мастеринг под целевую громкость (LUFS, True Peak), снятие цифрового следа Suno/Udio, паспорт результата прямо в чате. Ставить ничего не нужно — адрес `https://magicmaster.pro/mcp`. Подробности и подключение по-русски: <https://magicmaster.pro/mcp>.
