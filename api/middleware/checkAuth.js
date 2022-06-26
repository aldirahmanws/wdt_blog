const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                status: false,
                message:
                    "Request does not find access token in Header"
            });
        }
        const token = req.headers.authorization.split(" ")[1];

        const decoded = await jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );
        req.userData = decoded;
        req.accessToken = token;

        next();
    } catch (error) {
        switch (error.message) {
            case "jwt expired":
                
                return res.status(401).json({
                    status: false,
                    message: "Token expired",
                });
        
            default:
                return res.status(401).json({
                    status: false,
                    message:
                        "Token not valid",
                });
        }
    }
};
