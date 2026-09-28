# kiernanworks-chat

The assistant on kiernanworks.com. A visitor opens a small panel and asks
about SHIFT, ASK or LINE; this Worker answers from the site's own copy and
nothing else. It has no tools, no web search and no access to anything but
`knowledge/*.md` and the Claude API.

It is a separate Worker from the one that serves the site on purpose. That
Worker also runs an autonomous trading agent. A public endpoint that spends
money per request should not share a process or an API key with it.

## What is in here

| Path | What it is |
|---|---|
| `worker.js` | The API (`/api/config`, `/api/session`, `/api/chat`, `/health`) and the `Meter` Durable Object |
| `public/widget.js` | The button and panel the site loads with one script tag |
| `knowledge/site.md` | What the site says, in plain text. Edit this when the site changes |
| `knowledge/today.md` | What SHIFT does today and does not yet. **Matt corrects this** |
| `data/knowledge.json` | The two files above, bundled. Rebuild after editing: `npm run build` |
| `tools/chattest.mjs` | The harness. `npm test` |

## What stands between the internet and the bill

1. Cloudflare Turnstile on the first message of every conversation.
2. A signed session token issued only after Turnstile passes, valid two hours.
3. Three counters in one Durable Object: messages per visitor per hour
   (`HOURLY_PER_VISITOR`, 20), messages per conversation (`TURNS_PER_SESSION`,
   12), and messages per day across everyone (`DAILY_CAP`, 300). At the daily
   cap the assistant says it is resting and points to the contact form.
4. A monthly spend limit on the API key, set in the Anthropic console. The one
   limit that holds if everything above is wrong.

Without `ANTHROPIC_API_KEY`, `TURNSTILE_SECRET` and `TURNSTILE_SITE_KEY` the
API answers 503 and the button never appears on the site.

## Setting it up, once

Everything below is done in a browser. Nothing secret goes in this repository.

**1. Anthropic console** (console.anthropic.com)

- Settings > Workspaces > Create workspace, named `kiernanworks-chat`.
- On that workspace, set a monthly spend limit. Something like $30 is plenty
  to start; a busy day at the default caps is a few pounds.
- Inside that workspace, API keys > Create key. Copy it once; it is shown once.

**2. Cloudflare Turnstile** (dash.cloudflare.com > Turnstile)

- Add widget. Hostname: `kiernanworks.com`. Widget mode: Managed.
- It gives you a **site key** (public) and a **secret key**. Keep both to hand.

**3. Cloudflare Worker** (dash.cloudflare.com > Workers & Pages)

- Create > Import a repository > this repository. Build command: leave empty.
  Deploy command: `npx wrangler deploy`. Deploy.
- Settings > Variables and Secrets. Add:
  - `ANTHROPIC_API_KEY` (secret) from step 1
  - `TURNSTILE_SECRET` (secret) from step 2
  - `TURNSTILE_SITE_KEY` (variable, plain text) from step 2
  - `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` (secrets), the same pair the
    trading agent uses, so conversation summaries land in the same chat.
    Optional: without them the chat works and nothing is reported.
- Deploy once more so the new variables take effect.
- The address, `chat.kiernanworks.com`, is declared in `wrangler.jsonc` and set
  up by the deploy itself. There is nothing to click for it.
- Do not add `TURNSTILE_SITE_KEY` to `wrangler.jsonc`. A deploy replaces plain
  variables with what the file says, so an entry there, even an empty one,
  would wipe the value set in the dashboard.

**4. Check it**

- `https://chat.kiernanworks.com/health` should say `"configured": true`.
- Open any product page on kiernanworks.com once the script tag is on it. An
  "Ask about SHIFT" button appears bottom right.

## Keeping it truthful

The assistant knows only what is in `knowledge/`. When the site changes,
change `site.md`. When SHIFT gains or loses a capability, change `today.md`.
Then `npm run build`, commit both the markdown and `data/knowledge.json`, and
merge. CI fails if the JSON is stale.

`today.md` is the one that matters. The assistant is told that anything not
in the "does today" list is "not something I can confirm", never a yes.

## Running the tests

    npm test

Node 20 or later, nothing to install. The harness drives the real Worker and
the real Durable Object class with Turnstile, Claude and Telegram stubbed.
