const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unathorized,No token Provided!",
        success: false,
      });
    }
    const user = await jwt.verify(
      token,
      "thisiskhalidfarooqandmyfatehernmaeisksdlkfjsl234234234kl@35^%$#"
    );

    req.user = user.UserId;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = isAuthenticated;
