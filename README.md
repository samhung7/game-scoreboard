# 比賽記分板 (Game Scoreboard)

**App: https://samhung7.github.io/game-scoreboard/**

Phone- and tablet-friendly scoreboards with a built-in DJ panel. Add it to the home screen to use it like an app; it keeps working offline.
Languages: 繁體中文, 简体中文, English, 日本語, 한국어 (picked from the phone's language, changeable in each board's settings).

- **籃球** (`index.html`): 5v5 / 3v3, game clock with periods and overtime, shot clock, team fouls, timeouts.
- **羽球** (`badminton.html`): 21-point or 15-point system, best of 1/3/5, serve and service court tracking, interval and between-game rest timers.
- **排球** (`volleyball.html`): indoor (25 / deciding 15) or beach (21 / 15), rally scoring, timeouts, automatic change of courts.
- **網球** (`tennis.html`): 0-15-30-40 with deuce/advantage or no-ad, games and sets, 7-point tiebreak, final-set 10-point tiebreak or match tiebreak, serve and change of ends.
- **匹克球** (`pickleball.html`): traditional side-out scoring with server 1/2 and score call (0-0-2), or rally scoring; games to 11/15/21.
- **桌球** (`tabletennis.html`): games to 11, best of 3/5/7, serve every 2 points (every point from 10-10), change of ends in the deciding game.
- **DJ**: synthesized sound effects (cheer, whistle, sad trombone, brick, coin…), Spotify embed (no Premium needed) or local music files.

## Develop

```
src/
  *.html                       page markup (one per sport)
  css/base.css                 shared look (palette, buttons, sheets, score reel, DJ strip)
  css/basketball.css, css/badminton.css, css/rally.css
  js/config.js                 site settings (Spotify Client ID)
  js/spotify.js                Spotify sign-in (PKCE) and playlist list
  js/i18n.js, js/i18n/*.js     language switch and translation tables (keys are the Chinese source text)
  js/kit.js                    shared sounds, DJ pads, music player, score reel, haptics, wake lock
  js/basketball.js, js/badminton.js
  js/rally.js                  board engine for volleyball, tennis, pickleball, table tennis
  js/sports/*.js               the rules of each of those sports (window.SPORT)
  partials/music.html          music sheet markup used by every page
  partials/rally.html          board markup shared by the rally-sport pages
  partials/sportnav.html       sport dropdown
static/                        manifest, service worker, icons, sounds
i18n/                          translation sources (<lang>.json keyed by the Chinese text) and the scripts that build src/js/i18n/*.js
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
