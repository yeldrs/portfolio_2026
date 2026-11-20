# Figma sync scripts

File: https://www.figma.com/design/K7PVQ3rcJ798wM2hgjocwm/Portfolio-web
Written while the Figma MCP quota was exhausted (Starter plan). Syntax-checked locally only, never run.

Run each file as the `code` of ONE `use_figma` call, in order. Total: 4 write calls
(session id already exists: 24ca7ed0-63cc-4778-9b2f-87aaf0d837f0; otherwise 1 `create_session`).

| # | File | What it does |
|---|------|--------------|
| 1 | `01-dark-mode.js` | `Layout/page-max-width` token, **Dark** mode on `Semantic`, "DS · Dark mode" board (section 03), `HomePage mobile · Dark` (section 02) |
| 2 | `02-ui-kit.js` | UI kit (section 04): FilterChip, IconButton, DeviceChip, BonusTag, WorkshopCard, Footer |
| 3 | `03-pages.js` with `MOBILE = false` | New section 07: About, Workflow, Workshop, 404 + missing case study, desktop |
| 4 | `03-pages.js` with `MOBILE = true` | New section 08: same pages, mobile (all 3 case studies, no mobile project page existed) |

Notes
- Order matters: 3 and 4 look up the Footer, FilterChip, DeviceChip and WorkshopCard made by 2.
- Existing frames are never edited. New content goes in new sections or free space.
- Every colour is bound to a `Semantic` variable, so new pages and components switch to dark with the mode.
- Case-study pages are wireframes (title, client, description, role, section headings, placeholder bars).
- Not covered: updating the existing navbar / Button / Skill components, FR pages.
- If a call fails, the error says whether it is safe to retry; scripts 1, 2, 3 and 4 refuse to run twice.
- The app is now called "Solene Food Journal" (site labels in `src/i18n/ui.ts` already renamed).
