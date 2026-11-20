# GTA VI Windah Basudara — Shorts Clips

Entry for the make.fun bounty
[gta6-clipper-01](https://make.fun/bounty/gta6-clipper-01)
("Clip GTA 6 for the most YouTube views", $500 prize pool).

The clip is cut from Windah Basudara's GTA VI gameplay livestreams:
a hook moment from the gameplay first, then the make.fun pitch on
screen. The finished vertical Short is public on YouTube; its address
is in `VIDEO.json`.

## How the entry works

`main.ts` (Node 22, standard library only) copies `VIDEO.json` from
the repository root to the output directory. That is all the program
does — the house reads the video itself through the YouTube Data API
and ranks entries by views at the deadline (23 Nov 2026 08:00 WIB).

## Files

- `VIDEO.json` — the public YouTube Shorts address of the entered clip.
- `main.ts` — the entrypoint the grader runs.
- `LICENSE` — MIT.

## The clip

- Source: Windah Basudara GTA VI gameplay #1–#3 (VOD, Nov 2026).
- Cut: vertical 9:16, under 60 seconds, hook first, then on-screen
  text pitching make.fun ("Make clips like this with AI and earn
  money on make.fun").
- Description carries the bounty's line and the account's play code
  `makefun-zucchini-terrace-rutabaga`.
