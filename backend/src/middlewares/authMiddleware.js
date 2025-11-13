import { verifyAccessToken } from "../utils/jwt.js";

export function requireAuth(req, res, next) {
  // expect header: Authorization: Bearer <token>
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "No token" });
  const parts = header.split(" ");
  if (parts.length !== 2) return res.status(401).json({ error: "Invalid token" });
  const token = parts[1];
  const payload = verifyAccessToken(token);
  if (!payload) return res.status(401).json({ error: "Invalid or expired token" });
  req.user = payload;
  return next();
}
