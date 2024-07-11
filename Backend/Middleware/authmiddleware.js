import jwt from "jsonwebtoken";

const JWT_KEY = "tamseelasif";


export const fetch_user = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_KEY); // Replace 'your_jwt_secret' with your actual secret
        req.users = decoded.id; // Set the user ID on the req object
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};