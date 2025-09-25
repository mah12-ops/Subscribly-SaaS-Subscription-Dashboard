import { verifyToken } from "./utils/jwt";

export const context = ({ req }: any) => {
  const authHeader = req.headers.authorization || "";
  let user = null;

  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.replace("Bearer ", "");
    try {
      user = verifyToken(token); // { id, email, role }
    } catch (err) {
      console.log("Invalid token:", err);
    }
  }

  return { user }; // must be { user } for resolvers
};
