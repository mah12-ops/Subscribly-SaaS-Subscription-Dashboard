import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev_secret";

export const signToken = (payload: object, options?: jwt.SignOptions) => {
  return jwt.sign(payload, SECRET, { expiresIn: "7d", ...(options || {}) });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
};
