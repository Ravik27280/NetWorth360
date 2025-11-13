import express from "express";
import dotenv from "dotenv";
dotenv.config();

console.log("Loaded env: GOOGLE_CLIENT_ID present? ", !!process.env.GOOGLE_CLIENT_ID);

import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.js";
import "./src/passport/googleStrategy.js";





const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND = process.env.FRONTEND_URL || "http://localhost:5173";

await connectDB();

app.use(express.json());
app.use(cookieParser());

// CORS: allow frontend to send cookies
app.use(cors({
  origin: FRONTEND,
  credentials: true,
}));

// NOTE: No server session storage for JWT approach — we only use passport for OAuth callback
app.use(session({
  secret: process.env.SESSION_SECRET || "replace_this_in_prod",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === "production", httpOnly: true }
}));

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Auth server running on ${PORT}`));
