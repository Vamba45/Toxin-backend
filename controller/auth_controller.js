const db = require('../pool');

class authController {
    async getUser(req, res) {
        try {
            const user = await db.query(`SELECT * FROM users`);
            res.json(user.rows);
        } catch (e) {
            res.status(400).json({message: 'Registration error'})
        }
    }
}

module.exports = new authController();