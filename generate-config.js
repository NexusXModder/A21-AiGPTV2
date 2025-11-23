const fs = require("fs");

// Detect Base64-encoded Firebase config JSON
function decodeBase64IfValid(value) {
    try {
        const decoded = Buffer.from(value, "base64").toString("utf8");
        JSON.parse(decoded);
        return decoded;
    } catch {
        return value;
    }
}

const firebaseConfigInput = process.env.FIREBASE_CONFIG || "{}";
const firebaseConfig = decodeBase64IfValid(firebaseConfigInput);

const geminiKey = process.env.GEMINI_API_KEY || "";
const adminPass = process.env.ADMIN_PASSWORD || "";

const output = `
window.FIREBASE_CONFIG = ${firebaseConfig};
window.GEMINI_API_KEY = "${geminiKey}";
window.ADMIN_PASSWORD = "${adminPass}";
`;

fs.writeFileSync("config.js", output.trim());

console.log("✔ config.js generated successfully.");