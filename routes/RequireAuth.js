/**
 *
 * @param req request parameter
 * @param res response parameter
 * @param next if user is authenticated and everything is ok , next is for continue middleware fn
 * @returns {*} returns 401 if user hasn't session or is not authenticated to the server
 * or session user is null
 */
function requireAuth(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
}

module.exports = requireAuth;