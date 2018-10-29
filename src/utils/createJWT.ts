import jwt from "jsonwebtoken";

const createJWT = (id: number): string => {
  const token = jwt.sign({ id }, process.env.JWT_TOKEN || "token_secret");
  return token;
};

export default createJWT;
