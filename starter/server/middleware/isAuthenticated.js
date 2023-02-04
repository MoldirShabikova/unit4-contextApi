require("dotenv").config();
const jwt = require("jsonwebtoken");
//line requires the "jsonwebtoken" library, which is used to encode and decode JSON Web Tokens (JWTs). The library is used in the authentication middleware to verify the token passed in the request header.

const { SECRET } = process.env;


//The code exports an object with a single method named isAuthenticated that will be used as middleware to check if a request is authenticated. The method takes three arguments: req, res, and next.
module.exports = {
  isAuthenticated: (req, res, next) => {
    const headerToken = req.get("Authorization");

    if (!headerToken) {
      console.log("ERROR IN auth middleware");
      res.sendStatus(401);
    }
    //If the header is missing, it sends a 401 Unauthorized response

    let token;

    try {
      token = jwt.verify(headerToken, SECRET);
      //  If the token is present, it tries to verify the token using the jwt.verify method, passing in the token and the SECRET variable.
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }

    if (!token) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }
    //If the token is successfully verified, the method calls the next function to move on to the next middleware in the chain.

    next();

    //The next function is a standard argument in Express middleware, and it allows the control flow to move to the next middleware in the chain after the current one has finished executing. If the next function is not called, the control flow will stop and the response will not be sent back to the client.
  },
};
