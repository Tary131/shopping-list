import jwt from 'jsonwebtoken';


export const authenticateToken = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    console.log('Token:', token);

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded Token:', decoded);
            req.userId = decoded.id; // Attach decoded user ID to request
            next(); // Move to the next middleware or route handler
        } catch (err) {
            console.error('Token verification failed:', err);
            return res.status(403).json({
                message: 'No Access'
            });
        }
    } else {
        console.log('No token provided');
        return res.status(401).json({
            message: 'No Token'
        });
    }
};
