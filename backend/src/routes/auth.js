import express from "express";
import passport from "passport";
import {
  signup,
  login,
  refreshToken,
  logout
} from "../controllers/authController.js";

const router = express.Router();

// local
router.post("/signup", signup);
router.post("/login", login);

// refresh
router.post("/refresh", refreshToken);

// logout
router.post("/logout", logout);

// Google OAuth: redirect
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// callback — passport will set req.user then we issue tokens like in controller
router.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth` }), async (req, res) => {
  // req.user is the User model returned in googleStrategy
  // Issue tokens similarly to signup/login
  const user = req.user;
  // Create tokens and set refresh cookie (copy logic)
  // We import helpers here to avoid circular dependency
  import("../controllers/authController.js").then(mod => {
    // reuse helper by calling issueTokensAndSend via internal route: but function is not exported.
    // Instead recreate small logic here:
    const { createAccessToken } = require("../utils/jwt"); // cannot use require in ESM; workaround below
  }).catch(err => console.error(err));

  // Simpler: redirect to frontend with a temporary code flow — but for now we will issue tokens server-side and redirect.
  // Because we cannot import synchronous in ESM dynamic import below:
  (async () => {
    try {
      const { createAccessToken, createRefreshToken, hashToken } = await import("../utils/jwt.js");
      const User = (await import("../models/User.js")).default;
      // create access + refresh tokens
      const accessToken = createAccessToken({ sub: user._id, email: user.email });
      const refreshPlain = createRefreshToken();
      const refreshHash = hashToken(refreshPlain);
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

      user.refreshTokens = user.refreshTokens || [];
      user.refreshTokens.push({ tokenHash: refreshHash, expiresAt });
      await user.save();

      // set cookie & redirect to frontend with a success indicator
      res.cookie("nw360_rt", refreshPlain, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 1000 * 60 * 60 * 24 * 30,
        domain: process.env.COOKIE_DOMAIN || undefined,
        path: "/",
      });

      // Redirect to frontend — include access token in query (short-lived) OR have frontend call /auth/refresh to get access token.
      const frontend = process.env.FRONTEND_URL || "http://localhost:5173";
      // Redirect to frontend callback route — frontend should call /auth/refresh to pick up cookie and get access token.
      return res.redirect(`${frontend}/auth/success`);
    } catch (err) {
      console.error("OAuth callback error", err);
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth`);
    }
  })();
});

export default router;
