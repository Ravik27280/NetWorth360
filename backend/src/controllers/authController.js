import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { createAccessToken, createRefreshToken, hashToken } from "../utils/jwt.js";
import { v4 as uuidv4 } from "uuid";

const REFRESH_COOKIE_NAME = "nw360_rt";

// POST /auth/signup (email/password)
export async function signup(req, res) {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: "email and password required" });

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: "User already exists" });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ email, passwordHash, name, provider: "local" });

  // issue tokens
  return issueTokensAndSend(user, res);
}

// POST /auth/login (email/password)
export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "email and password required" });

  const user = await User.findOne({ email });
  if (!user || !user.passwordHash) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  return issueTokensAndSend(user, res);
}

// GET /auth/google -> passport redirect
// GET /auth/google/callback -> passport callback handled in routes

// POST /auth/refresh  -> rotate refresh token
export async function refreshToken(req, res) {
  try {
    const token = req.cookies[REFRESH_COOKIE_NAME];
    if (!token) return res.status(401).json({ error: "No refresh token" });

    const tokenHash = hashToken(token);
    const user = await User.findOne({ "refreshTokens.tokenHash": tokenHash });
    if (!user) return res.status(401).json({ error: "Invalid refresh token" });

    // remove the used refresh token (rotation)
    user.refreshTokens = user.refreshTokens.filter(rt => rt.tokenHash !== tokenHash);

    // issue new tokens
    const accessToken = createAccessToken({ sub: user._id, email: user.email });
    const newRefreshPlain = createRefreshToken();
    const newRefreshHash = hashToken(newRefreshPlain);

    // set expiry date for refresh token
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days
    user.refreshTokens.push({ tokenHash: newRefreshHash, expiresAt });

    await user.save();

    // set cookie
    setRefreshCookie(res, newRefreshPlain);

    return res.json({ accessToken, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

// POST /auth/logout
export async function logout(req, res) {
  // clear the cookie (client should also call refresh to revoke)
  res.clearCookie(REFRESH_COOKIE_NAME, cookieOptions());
  return res.json({ ok: true });
}

// helper: issue tokens and set refresh cookie & store refresh hash in DB
async function issueTokensAndSend(user, res) {
  const accessToken = createAccessToken({ sub: user._id, email: user.email });
  const refreshPlain = createRefreshToken();
  const refreshHash = hashToken(refreshPlain);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30d

  user.refreshTokens = user.refreshTokens || [];
  user.refreshTokens.push({ tokenHash: refreshHash, expiresAt });
  await user.save();

  setRefreshCookie(res, refreshPlain);

  return res.json({
    accessToken,
    user: { id: user._id, email: user.email, name: user.name, avatar: user.avatar },
  });
}

// cookie setter
function setRefreshCookie(res, tokenPlain) {
  res.cookie(REFRESH_COOKIE_NAME, tokenPlain, cookieOptions());
}

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    domain: process.env.COOKIE_DOMAIN || undefined,
    path: "/",
  };
}
