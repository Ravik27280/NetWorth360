import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  tokenHash: { type: String, required: true }, // store hashed refresh tokens
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true, unique: true },
  name: { type: String },
  avatar: { type: String },
  provider: { type: String, default: "local" }, // 'local' or 'google'
  passwordHash: { type: String }, // only for local accounts
  refreshTokens: [refreshTokenSchema], // multiple refresh tokens allowed (per device)
}, { timestamps: true });

export default mongoose.model("User", userSchema);

