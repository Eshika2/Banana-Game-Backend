import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, "secretKey");
            req.user = decoded;
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                res.status(401).json({
                    message: "Token expired",
                });
            } else if (error.name === "JsonWebTokenError"){
                res.status(401).json({
                    message: "Invalid token",
                });
            }
        }
    }
    if (!token) {
        res.status(401).json({
            success: false,
            message: "Authorization token not found"
        })
    }
};