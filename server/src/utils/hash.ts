import bcrypt from "bcryptjs";

export const hashPassword = async (plain: string) => {
  const saltRounds = 10;
  return bcrypt.hash(plain, saltRounds);
};

export const comparePassword = async (plain: string, hash: string) => {
  return bcrypt.compare(plain, hash);
};
