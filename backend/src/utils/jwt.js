import jwt from "jsonwebtoken";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_EXPIRES = process.env.JWT_EXPIRES_IN || "15m";
const REFRESH_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES_IN || "30d";

// create access token
export function createAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
}

// create refresh token (random string) — we will hash it before storing
export function createRefreshToken() {
  return crypto.randomBytes(48).toString("hex");
}

// helper to hash refresh token for DB storage
export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// verify access token
export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
