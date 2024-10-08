const jwt = require('jsonwebtoken');

const generateJwtAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'strict'
    });

    return token;
}

export default generateJwtAndSetCookie