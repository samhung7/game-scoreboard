/* Spotify account sign-in (Authorization Code with PKCE, no server needed) and playlist lookup.
   Works for free accounts: we only read the user's playlists, playback happens in the Spotify embed or the Spotify app.
   Needs a Client ID from developer.spotify.com in js/config.js, with this site's folder URL registered as a Redirect URI. */
const SpotifyAuth = (() => {
  const CLIENT_ID = (window.SCOREBOARD_CONFIG || {}).spotifyClientId || "";
  const SCOPES = "playlist-read-private playlist-read-collaborative";
  const KEY = "scoreboard-spotify";
  const redirectUri = () => new URL("./", location.href).href; // one URI for every page: the site folder
  let tok = null;
  try { tok = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) {}
  const store = () => { try { tok ? localStorage.setItem(KEY, JSON.stringify(tok)) : localStorage.removeItem(KEY); } catch (e) {} };

  const b64url = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const randomString = (n) => b64url(crypto.getRandomValues(new Uint8Array(n)));

  async function login() {
    if (!CLIENT_ID) throw new Error("not-configured");
    const verifier = randomString(48);
    const challenge = b64url(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier)));
    const state = randomString(12);
    sessionStorage.setItem("sp-pkce", JSON.stringify({ verifier, state, back: location.pathname.split("/").pop() || "" }));
    const q = new URLSearchParams({ response_type: "code", client_id: CLIENT_ID, scope: SCOPES, redirect_uri: redirectUri(), code_challenge_method: "S256", code_challenge: challenge, state });
    location.assign("https://accounts.spotify.com/authorize?" + q);
  }

  async function tokenRequest(params) {
    const r = await fetch("https://accounts.spotify.com/api/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: CLIENT_ID, ...params }) });
    if (!r.ok) throw new Error("token " + r.status);
    const j = await r.json();
    tok = { access: j.access_token, refresh: j.refresh_token || tok?.refresh, exp: Date.now() + (j.expires_in - 60) * 1000 };
    store();
  }

  // Called on page load: finishes the sign-in when Spotify sends the user back with ?code=
  async function handleRedirect() {
    const q = new URLSearchParams(location.search);
    if (!q.has("code") && !q.has("error")) return null;
    let pk = null; try { pk = JSON.parse(sessionStorage.getItem("sp-pkce") || "null"); } catch (e) {}
    sessionStorage.removeItem("sp-pkce");
    history.replaceState(null, "", location.pathname);
    if (q.has("error")) return { error: q.get("error") };
    if (!pk || pk.state !== q.get("state")) return { error: "state" };
    try { await tokenRequest({ grant_type: "authorization_code", code: q.get("code"), redirect_uri: redirectUri(), code_verifier: pk.verifier }); }
    catch (e) { return { error: "token" }; }
    if (pk.back && pk.back !== (location.pathname.split("/").pop() || "")) { location.replace(pk.back); return { moved: true }; }
    return { ok: true };
  }

  async function access() {
    if (!tok) throw new Error("signed-out");
    if (Date.now() > tok.exp) {
      try { await tokenRequest({ grant_type: "refresh_token", refresh_token: tok.refresh }); }
      catch (e) { tok = null; store(); throw new Error("signed-out"); }
    }
    return tok.access;
  }
  async function api(path) {
    const r = await fetch("https://api.spotify.com/v1" + path, { headers: { Authorization: "Bearer " + (await access()) } });
    if (r.status === 401) { tok = null; store(); throw new Error("signed-out"); }
    if (r.status === 403) throw new Error("forbidden"); // usually: account not added to the app's user list
    if (!r.ok) throw new Error("api " + r.status);
    return r.json();
  }
  async function playlists() {
    const out = [];
    let next = "/me/playlists?limit=50";
    while (next && out.length < 200) {
      const j = await api(next);
      out.push(...j.items.filter(Boolean).map((p) => ({ id: p.id, name: p.name, img: p.images?.[p.images.length - 1]?.url || "", count: p.tracks?.total ?? p.items?.total ?? "" })));
      next = j.next ? j.next.replace("https://api.spotify.com/v1", "") : null;
    }
    return out;
  }

  return {
    configured: () => !!CLIENT_ID,
    signedIn: () => !!tok,
    login, handleRedirect, playlists,
    me: () => api("/me"),
    logout: () => { tok = null; store(); },
  };
})();
