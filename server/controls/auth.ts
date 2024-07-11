const bcrypt = require('bcrypt');

function login(req, res) {
    try {
        const { name, email, password, id, about } = req.body;
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}

function signup(req, res) {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}

module.exports = { login, signup };