// src/passport/googleStrategy.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

// quick masked logger for visibility (does not print full secret)
function mask(str) {
  if (!str) return "<missing>";
  if (str.length <= 8) return str;
  return str.slice(0, 4) + "..." + str.slice(-4);
}

console.log("▶ Google OAuth config:", {
  GOOGLE_CLIENT_ID: mask(CLIENT_ID),
  GOOGLE_CLIENT_SECRET: CLIENT_SECRET ? "present" : "<missing>",
  CALLBACK: `${BASE_URL}/auth/google/callback`,
});

// Fail fast with a clear message instead of a cryptic stack
if (!CLIENT_ID || !CLIENT_SECRET) {
  throw new Error(
    "Missing Google OAuth config. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your environment (.env). " +
    "See README for how to create credentials in Google Cloud Console."
  );
}

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: `${BASE_URL}/auth/google/callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const email = profile.emails && profile.emails[0] && profile.emails[0].value;
        if (!email) return done(new Error("No email from Google profile"));

        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            email,
            name: profile.displayName,
            avatar: profile.photos && profile.photos[0] && profile.photos[0].value,
            provider: "google",
          });
        } else {
          user.provider = "google";
          user.name = user.name || profile.displayName;
          user.avatar = user.avatar || (profile.photos && profile.photos[0] && profile.photos[0].value);
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user || null);
  } catch (err) {
    done(err, null);
  }
});
