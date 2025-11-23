// --------------------------------------------------
//  Firebase SDK Imports
// --------------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --------------------------------------------------
//  Your Firebase Web App Config
// --------------------------------------------------
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCSgJ3dP9iOcp-yc-pZqh2e8kynygrs2sk",
  authDomain: "ai-21gpt.firebaseapp.com",
  projectId: "ai-21gpt",
  storageBucket: "ai-21gpt.firebasestorage.app",
  messagingSenderId: "1032282591164",
  appId: "1:1032282591164:web:1d99408401f0e8025165b9",
  measurementId: "G-FSEJP366FD"
};

// --------------------------------------------------
//  Initialize Firebase
// --------------------------------------------------
const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);

// --------------------------------------------------
//  Load remote Firestore config document
// --------------------------------------------------
export async function loadConfig() {
  try {
    const ref = doc(db, "config", "8ClMdBSkaYH2wZAtsNks");
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      console.error("❌ Config document not found in Firestore!");
      return;
    }

    const data = snap.data();

    // IMPORTANT: Set global variables for admin_panel.html
    window.FIREBASE_CONFIG = FIREBASE_CONFIG;
    window.ADMIN_PASSWORD = data.adminPassword;
    window.GEMINI_API_KEY = data.geminiApiKey;

    console.log("✅ Config loaded!", data);

  } catch (err) {
    console.error("❌ Error loading config:", err);
  }
}

// Load immediately
loadConfig();