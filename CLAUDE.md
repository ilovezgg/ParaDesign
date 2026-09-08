@AGENTS.md

# Project conventions (PARA Web Design — Next.js 16, Tailwind v4)

## Design tokens, not magic values
All colors, spacing, radii and font sizes must come from `src/app/globals.css`'s `@theme` block
(`--text-display`, `--text-h2`, `--text-h3`, `--text-body`, `--text-body-sm`, plus the color tokens
defined there) or from `Container`/existing utility patterns already used in `src/components/`.
Never introduce a raw hex color or an arbitrary Tailwind value (`mt-[17px]`, `w-[342px]`,
`rounded-[13px]`) unless it's a genuine one-off tied to a specific asset's exact dimensions — and
say so in a comment when it is. When in doubt, grep how an existing section solved the same need
before inventing a new value.

## Layout rules — no truncation, no fixed widths on text
- Never use `text-overflow: ellipsis`, `white-space: nowrap`, `line-clamp`, or `truncate` on content
  that isn't explicitly meant to be truncated. Long text wraps (`break-words` / `overflow-wrap`).
- No fixed pixel widths on text-bearing elements — they size to their grid/flex cell (`w-full`),
  not to a magic px value.
- Prefer normal document flow + CSS grid/flexbox over `position: absolute` for layout. Reach for
  `position: absolute` only for genuinely overlaid decoration, never for primary content flow.
- Any layout change must be checked at 375, 768, 1024, 1280, 1440px before being considered done —
  use the Playwright MCP to actually open the page and look, don't assume from code.

## Responsive breakpoints (Tailwind defaults used throughout)
`md:` = 768px, `lg:` = 1024px. `Container` caps content at `max-w-[1280px]` with `px-6 md:px-10`.

## Hero heading chips (`src/components/sections/Hero.tsx`)
Inline chip images: height ≈ 0.62em, width ≈ 1.6em (not 2.6em — that was a past bug: the spec's
"width ≈ 2.6 × height" was briefly misread as "2.6 × font-size"), `rounded-full`, `object-cover`,
`align-middle`, hidden below `md:`. Content line-breaks are controlled explicitly via
`hero.titleLines` in `src/content.ts` — never let a chip end up alone on a line without an adjacent
word; split lines in `content.ts` rather than relying on natural wrapping.

## Before non-trivial changes
For anything more involved than a one-line fix (new section, multi-file rewrite, layout overhaul),
state the plan first and get it confirmed before editing — don't patch code whose current shape you
haven't read and understood.
