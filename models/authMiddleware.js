

export const authMiddleware = (req, res, next) => {
    // Your authentication logic here
    if (req.isAuthenticated()) { // Example using session
        // User is authenticated, proceed to next middleware
        next();
    } else {
        // User is not authenticated, redirect to login page or send an error response
        res.status(401).send('Unauthorized');
    }
};
