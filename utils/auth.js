import jwt from "jsonwebtoken";

export const generateTokenForUser = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.firstName + user.lastName,
      email: user.email,
    },
    "JWT_TOKEN_SECRETKEY"
  );
};

// Validate the jwt token with the secret key
export const validateUserToken = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, "JWT_TOKEN_SECRETKEY");
  } catch (error) {
    return null;
  }
};
