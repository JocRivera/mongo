import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Agrega los datos del usuario al objeto `req`
        next(); // Continúa con la siguiente función
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};
