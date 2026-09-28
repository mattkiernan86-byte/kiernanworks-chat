# Kiernan Works: what the site says

Source: kiernanworks.com, September 2026. This file is the assistant's memory of
the public site. Keep it in step with the pages; the assistant knows nothing
that is not written here or in today.md.

## Who and where

- Kiernan Works is Matt Kiernan's software workshop, based in Dubai, UAE.
- Matt Kiernan: nineteen years in retail, including Toys R Us UK, and seventeen of
  them with one international retailer, from
  the shop floor to running its international operations. Chartered Manager
  (CMgr). MBA with Distinction, University of Buckingham. Has worked in twelve
  markets: UAE, Qatar, Saudi Arabia, India, Pakistan, Indonesia, Malaysia,
  Singapore, Azerbaijan, Cyprus, Malta and Gibraltar.
- Career background: The Entertainer, Early Learning Centre (UAE and Qatar),
  ALGT Middle East, Toys R Us UK.
- He is currently accountable for the Early Learning Centre franchise estate in
  the UAE and Qatar, operated by The Entertainer: 29 stores, two countries,
  including Reem Mall in Abu Dhabi. He is not going independent full time; the
  workshop runs alongside that role, with a limited number of engagements at
  a time.
- The offer: software for multi-store retail, built by an operator who had the
  problem, plus a block of his time to put it in properly.
- Everything on the site, and the products, were built by one operator working
  with AI. Claude writes most of the code; other models handle voice, vision
  and translation where they are better at the job. He says so openly.

## The three products

All three are in service today.

### SHIFT: the store's whole day in one app

Rotas, clock-in, checklists, chat, store email, tasks, calls, petty cash,
policies and people development. One app, on the till the shops already have
and the phones staff already carry. ASK and LINE bolt on to it.

Headline numbers: in service across 29 stores in two countries; used seven
days a week with pay depending on it; over 7,000 automated tests; a week's
rota goes from about two hours to seconds.

What the shop floor gets (staff sign in on the store till or their own phone,
PIN attributed, so the app always knows who did what):

- Today: who is rostered, checks due, unread messages and tasks, one search box.
- Clock: PIN clock-in with breaks, geotagged. Bad Wi-Fi queues offline and
  syncs later; a punch is never lost and a replay can never pay somebody twice.
  PINs are hashed and verified on the server, with a lockout after failed tries.
- Checks: opening and closing checklists with photo evidence attached to the
  item, signed by a named person and scored. Head Office sees completion live.
- Chat: store to Head Office messaging that retires unofficial WhatsApp groups.
- Email: every store gets a real address and a shared inbox that survives staff
  turnover.
- News: announcements by company, country or store, with read visibility.
  Every person confirms with their PIN, not a store-level tick box.
- Tasks: assigned with deadlines; can require a photo before they can be marked
  done.
- Calls: one-tap video, store to store or Head Office ringing through. Two
  standing rooms per store. No licences, no meeting links.
- Policies: always the current version, readable at the till, answerable in
  plain language (with ASK).
- Badges and petty cash: milestones announced in chat. Petty cash claims with
  a photo of the receipt; an approved claim gets a code finance can match
  against the bank.
- Voice: surveys, ideas, in-app bug reports, and a confidential route that
  bypasses the store entirely, reachable from the login screen itself.

What managers and Head Office get:

- Rota planner: two hours to seconds for a store manager, half a day to an hour
  for an area manager. Split shifts, cross-store cover, an AI draft from one
  line of context, and a server-side guard that refuses to save a shift over
  booked holiday, so it holds even with two managers editing the same week.
- Time and pay oversight: live clock status, audited amendments, holiday, sick
  and TOIL balances computed from the rota. A daily email flags a negative
  balance before payroll finds it. Rostered but never clocked in shows up as
  exactly that.
- Compliance board: completion by store in real time, missed checks surfaced.
  Replaces the 9am phone round.
- Store visit reports: RAG scores and geotagged photos. Actions route to the
  store, which must acknowledge, complete with evidence, or decline with a
  reason. The loop closes itself.
- Scorecard: trade, customer, operations and people on one card per store,
  rolled up by area and country. No composite score, on purpose.
- People development: reviews, a promotion matrix with no composite score,
  induction tracking, and an accrual forecast so leave crunches show up months
  early.
- Recognition, designed so it cannot become a stick: kudos capped at three a
  day and 140 characters and never linked to pay; streaks belong to the store,
  never a person; "most improved" rather than "most"; fifteen badges computed
  overnight from real numbers. Presence indicators, personal attendance streaks
  and individual leaderboards were deliberately rejected.
- Customer feedback and NPS land on the executive report.
- The part that protects you: anonymous concerns, a full audit trail, and a log
  of every PIN reveal.
- ASK built in: a spoken morning brief, a nightly sweep for anomalies, drafted
  store emails. Read and advise only; it never touches pay data.

Why it beats five separate tools: one login, one audit trail. It replaces
WhatsApp groups, email chains, paper checklists, a rota spreadsheet and a
clock machine. Pay-safe by construction (7,000+ tests between a code change
and wages). Built for the till: no app store installs, no per-seat hardware.
Same-day fixes: staff report a bug with a screenshot and routinely see it fixed
in production that day. Multi-country from day one: different weekend days per
market, a 3am to 3am trading day, per-country holiday calendars.

Your own tenant: your brand and your product vocabulary (if you call them
Extras rather than Add-ons, the app says Extras); only the modules you turn on;
your timezone and currency per tenant; your own address so a device boots
straight into your tenant; isolation in the database (every call carries its
tenant and an unscoped call is refused); provisioned and hardened as part of
the rollout.

Proof: SHIFT went live in one go across all 28 stores of the Early Learning
Centre franchise for the UAE and Qatar, operated by The Entertainer, and runs
29 today. Two countries, two different weekend conventions, roughly 104 staff a
day, zero lost offline clock events, and a full payroll audit trail from day
one.

### ASK: the policy expert who never goes home

Staff ask a question in their own language and get an answer from the
company's actual documents, with the source attached (for example "Thirty days
for anything over five days. Source: Leave Policy, section 4.2"). It cannot
bluff and it cannot run up a bill. It speaks more than 20 languages, six of them a
single tap away. In the estate it
came from it has answered over 2,400 shop floor questions; a third were about
termination and leave, clustered at specific stores, which turned out to be a
training and documentation gap and surfaced two welfare issues. The query data
turned out to be worth more than the answers.

### LINE: customer service on one official WhatsApp number

One official number instead of dozens of store phones. AI handles the routine
and refuses to guess stock. When a human takes over, whatever English they type
is rewritten on brand before it is sent, in English or Arabic. Every customer
conversation is on the record. In service, live on WhatsApp. Each retailer names
its own assistant; in the Early Learning Centre estate it is called Jack.

## The tour

Twenty-eight short videos on kiernanworks.com/tour, 60 to 100 seconds each,
39 minutes end to end. Three follow one person through a whole working day
(store manager, area manager, head office); the rest take the software a
feature at a time. Recorded against a demo estate; every store, colleague and
number in it is invented. Nothing is a mock-up or a slide.

## Pricing

Matt does not publish his prices on the site, by choice. What the site does say:

- It is priced per store, per month, never per user, because retail hires for
  Christmas and shares tills, and per-user pricing would encourage shared logins.
- Billed monthly, in UAE dirhams. Taking it annually is cheaper.
- There is a one-off implementation fee, which covers data migration,
  configuration, training, and setting up and securing the customer's own
  deployment.
- Larger estates pay a lower rate per store.
- It is built for estates of ten stores or more.
- For a figure, a visitor should ask Matt at kiernanworks.com/contact with the
  number of stores and the markets they trade in. He replies personally.

The assistant never states a price, a rate, a discount, a band, a minimum
charge or a fee amount, even if a visitor says they have seen one.

## Straight answers (kiernanworks.com/answers)

- Payroll: SHIFT produces the hours, exceptions and approvals payroll runs on,
  and exports them. A direct feed into a payroll system is built as part of
  putting it in, against whatever the customer uses. Matt will say whether it is
  a day or a fortnight once he knows the system.
- Leaving: you take your data. A full export of your tenant on request at any
  point. No hostage clause, no exit fee.
- Where data lives: in your own isolated tenant, not a shared table.
- Support: the person who built it, not a ticket queue. Response times are
  agreed up front and written down.
- Time to live: ten days in your stores first, then pilot stores, then the
  estate. Weeks rather than quarters for a typical estate.
- Commitment: billed monthly, annual cheaper, implementation fee one-off, no
  long tie-in.
- Security: PIN attribution rather than shared logins, an audit trail on every
  write, a log of every time somebody's details are revealed, 7,000+ automated
  tests.
- Hours back: a week's rota takes a store manager about two hours; on SHIFT it
  takes seconds. Two hours per store per week over 52 weeks: 10 stores, 1,040
  hours a year; 29 stores, 3,016; 50 stores, 5,200; 100 stores, 10,400. That is
  the rota alone, one job of twelve.

## Putting it in (kiernanworks.com/rollout)

Software does not land on its own. Customers book a block of Matt's time
alongside it: ten days in their stores at the busiest trading pattern, then a
rollout two or three days a week (pilot stores first, then the estate, data
migrated, standards written, managers trained on the floor at trading time),
then the teams run it themselves. Based in Dubai, working wherever the estate
is. The first conversation is free and without obligation; if he is not the
right person, you hear that instead of a proposal.

## Who it is for

It fits if you run ten stores or more anywhere in the world, your teams work
shifts and share a till, you trade in more than one country, currency or
language, and head office has no live view of what stores are doing today.

It does not fit if you have fewer than ten shops, you have no physical stores,
or you want software that changes nothing about how people work.

## How to get in touch

- Book a demo or ask for a price: kiernanworks.com/contact (a demo takes about
  thirty minutes, on the live software with realistic data).
- Matt replies personally. The first conversation is free and without
  obligation.
- WhatsApp and LinkedIn links are in the site footer.

## TRADE, not for sale

TRADE is an autonomous portfolio agent, a passion project mentioned on the site
only as proof the workshop can build autonomous systems that handle money. It
is not a product and not for sale; do not discuss its performance or details.
