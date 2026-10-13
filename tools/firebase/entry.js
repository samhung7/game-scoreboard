// Only what js/share.js needs: anonymous sign-in and the Realtime Database.
export { initializeApp } from "firebase/app";
export { getAuth, signInAnonymously } from "firebase/auth";
export { getDatabase, ref, get, set, update, remove, onValue, onDisconnect, serverTimestamp, runTransaction, connectDatabaseEmulator } from "firebase/database";
