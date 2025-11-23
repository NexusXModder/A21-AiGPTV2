// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase web app configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSgJ3dP9iOcp-yc-pZqh2e8kynygrs2sk",
  authDomain: "ai-21gpt.firebaseapp.com",
  projectId: "ai-21gpt",
  storageBucket: "ai-21gpt.firebasestorage.app",
  messagingSenderId: "1032282591164",
  appId: "1:1032282591164:web:1d99408401f0e8025165b9",
  measurementId: "G-FSEJP366FD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load config from Firestore
export async function loadConfig() {
  try {
    const ref = doc(db, "config", "8ClMdBSkaYH2wZAtsNks");
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      console.error("❌ Firestore config document not found!");
      return null;
    }

    const data = snap.data();

    window.GEMINI_API_KEY = data.geminiApiKey;
    window.ADMIN_PASSWORD = data.adminPassword;

    console.log("✅ Remote config loaded:", data);
    return data;

  } catch (error) {
    console.error("❌ Error loading config:", error);
    return null;
  }
}