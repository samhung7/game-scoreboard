/* Site settings. Fill in spotifyClientId after creating an app at https://developer.spotify.com/dashboard
   (Redirect URI: https://samhung7.github.io/game-scoreboard/). The Client ID is public and safe to commit. */
window.SCOREBOARD_CONFIG = {
  spotifyClientId: "a2ef01914d3e41459b1f1a1b835f305b",
  // donate page (Buy Me a Coffee, Ko-fi, Portaly...); empty hides the donate links
  donateUrl: "https://portaly.cc/samhungstudio",
  // live sharing (js/share.js): the web app config from the Firebase console; null hides the share button
  // (Firebase web config is public by design; access is controlled by database.rules.json)
  firebase: {
    apiKey: "AIzaSyASJTzrU47YnMjHeh6hiy48sKWlL5w_Wrk",
    authDomain: "game-scoreboard-f8e84.firebaseapp.com",
    databaseURL: "https://game-scoreboard-f8e84-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "game-scoreboard-f8e84",
    appId: "1:177242444088:web:81eb2d872ce82d4dc3b1cd",
  },
};
