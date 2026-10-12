# Game Scoreboard

Phone- and tablet-friendly scoreboards with a built-in DJ panel. Add it to the home screen to use it like an app; it keeps working offline.

- **籃球** (`index.html`): 5v5 / 3v3, game clock with periods and overtime, shot clock, team fouls, timeouts.
- **羽球** (`badminton.html`): 21-point or 15-point system, best of 1/3/5, serve and service court tracking, interval and between-game rest timers.
- **DJ**: synthesized sound effects (cheer, air horn, brick, coin…), Spotify embed (no Premium needed) or local music files.

## Develop

Pages live in `src/` and share code from `src/shared/`. Build the site:

```sh
python3 build.py        # writes site/ (and preview/)
python3 -m http.server -d site 8000
```

Pushing to `main` builds and deploys `site/` to GitHub Pages (see `.github/workflows/pages.yml`).

## Replacing a sound with a recording

Put an audio file in `static/sounds/` and list it in `static/sounds/manifest.json`, e.g. `{"cheer": "cheer.mp3"}`. Keys: `cheer`, `airhorn`, `sadhorn`, `brick`, `coin`, `swish`, `smash`, `defense`, `buzzer`.
