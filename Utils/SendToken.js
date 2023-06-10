import jwt from "jsonwebtoken";

export const SendToken = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWTSECRET);
  res
    .status(201)
    .cookie("token", token, { httpOnly: true, maxAge: 5 * 60 * 1000 ,sameSite:process.env.NODE_URL==="Development"?"lax":"none",secure:process.env.NODE_URL==="Development"?false:true})
    .json({
      success: true,
      message,
    });
};
