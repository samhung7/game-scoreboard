# Game Scoreboard

Phone- and tablet-friendly scoreboards with a built-in DJ panel. Add it to the home screen to use it like an app; it keeps working offline.

- **籃球** (`index.html`): 5v5 / 3v3, game clock with periods and overtime, shot clock, team fouls, timeouts.
- **羽球** (`badminton.html`): 21-point or 15-point system, best of 1/3/5, serve and service court tracking, interval and between-game rest timers.
- **DJ**: synthesized sound effects (cheer, air horn, brick, coin…), Spotify embed (no Premium needed) or local music files.

## Develop

```
src/
  index.html, badminton.html   page markup
  css/base.css                 shared look (palette, buttons, sheets, score reel, DJ strip)
  css/basketball.css, css/badminton.css
  js/config.js                 site settings (Spotify Client ID)
  js/spotify.js                Spotify sign-in (PKCE) and playlist list
  js/kit.js                    shared sounds, DJ pads, music player, score reel, haptics, wake lock
  js/basketball.js, js/badminton.js
  partials/music.html          music sheet markup used by both pages
static/                        manifest, service worker, icons, sounds
```

`build.py` adds the `<head>` (PWA tags) around each page, pulls in partials and copies everything to `site/`:

```sh
python3 build.py        # writes site/ (and preview/)
python3 -m http.server -d site 8000
```

Pushing to `main` builds and deploys `site/` to GitHub Pages (see `.github/workflows/pages.yml`).

## Replacing a sound with a recording

Put an audio file in `static/sounds/` and list it in `static/sounds/manifest.json`, e.g. `{"cheer": "cheer.mp3"}`. Keys: `cheer`, `airhorn`, `sadhorn`, `brick`, `coin`, `swish`, `smash`, `defense`, `buzzer`.

## Spotify sign-in

1. Create an app at https://developer.spotify.com/dashboard (Web API) with Redirect URI `https://samhung7.github.io/game-scoreboard/`.
2. Put its Client ID in `src/js/config.js` (it is public, no secret is needed).
3. While the app is in development mode, add each Spotify account that should sign in under the app's User Management.
