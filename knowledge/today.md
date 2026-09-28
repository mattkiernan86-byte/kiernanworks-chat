# What SHIFT does today, and what it does not yet

DRAFT for Matt to correct. Drafted from the site copy on 28 September 2026.
The assistant treats this file as the truth about current capability. Anything
a visitor asks about that is not in the "does today" list is answered as
"not something I can confirm; Matt can tell you", never as yes.

## Does today, in production

- Rotas: AI-drafted week from one line of context, split shifts, cross-store
  cover, a server-side guard against saving over booked holiday, two managers
  editing the same week.
- Clock-in and out: PIN on a shared till or a colleague's own phone, breaks,
  geotagging, offline queue with replay protection, server-side PIN
  verification with lockout.
- Opening and closing checklists with photo evidence, scoring, and a live
  compliance board for Head Office.
- Store visit reports with RAG scores, geotagged photos, and actions the store
  must acknowledge, complete with evidence, or decline with a reason.
- Chat (store to Head Office), news with per-person read confirmation, tasks
  with deadlines and photo evidence, one-tap video calls, a real email address
  and shared inbox per store.
- Leave, sick and TOIL balances computed from the rota, an accrual forecast,
  a daily email on negative balances, audited amendments to time records.
- Petty cash claims with receipt photos and a finance matching code.
- Scorecard (trade, customer, operations, people) per store, rolled up by area
  and country; area KPIs; targets set once and read everywhere.
- People development: reviews, promotion matrix, induction tracking.
- Recognition: capped kudos, store streaks, "most improved", fifteen badges
  computed overnight.
- Voice: surveys, ideas, in-app bug reports, and a confidential concern route
  reachable from the login screen.
- Audit: an audit trail on every write and a log of every PIN reveal.
- Multi-country: different weekend days per market, a 3am to 3am trading day,
  per-country holiday calendars, timezone and currency per tenant.
- Multi-tenant: your brand, your vocabulary, only the modules you turn on,
  your own address, database-level isolation.
- Exports: the hours, exceptions and approvals that payroll runs on. A full
  export of your tenant on request.
- ASK built in: spoken morning brief, nightly anomaly sweep, drafted store
  emails, policy answers in the language asked with the source cited. Read
  and advise only; never touches pay data.
- LINE: one official WhatsApp number, AI for the routine, human takeover with
  on-brand rewriting in English or Arabic, no stock guessing.

## Not yet, or built per customer during rollout

- A direct feed into a specific payroll system: built during implementation
  against the system the customer uses, not an off-the-shelf connector.
- Integrations with specific HR, EPOS or accounting systems: ask Matt; not
  something the assistant can confirm.
- Languages: ASK answers in the language asked, in five languages so far. LINE
  rewrites in English or Arabic. Other languages: ask Matt.
- Native app store apps: SHIFT runs on the till and on staff phones without
  app store installs; the assistant should not claim a native iOS or Android
  app.
- Self-serve sign-up or a free trial: there is none. Every deployment is
  provisioned and hardened during a rollout with Matt.
- Estates under ten stores: not a fit, by Matt's own rule.
- On-premise or self-hosted deployment: ask Matt; not something the assistant
  can confirm.
- Customer-facing features beyond LINE (loyalty, e-commerce, gift cards): not
  part of SHIFT; the assistant should not claim them.

## Things the assistant must never do

- Quote a price that is not on the pricing page, or offer a discount.
- Promise a delivery date, response time or contract term.
- Claim a feature, integration or certification that is not listed above.
- Discuss TRADE beyond the one sentence on the site.
- Give advice on employment law, payroll compliance or tax. Point to Matt.
