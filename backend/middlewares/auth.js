const jwt = require('jsonwebtoken');

const authenticate = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.body._id = decoded?.id;
        }
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = authenticate;