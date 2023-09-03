import { verify } from 'jsonwebtoken';

const authMiddleware = {};

authMiddleware.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Assuming Bearer TOKEN structure

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user;  // Assign the payload of verified token to request object
        next();
    });
};

export default authMiddleware;
