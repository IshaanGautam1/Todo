import jwt from "jsonwebtoken";
export const sendCookie = (userid, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: userid.id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      sameSite:"none" ,
      secure:true, 
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message: message,
    });
};
