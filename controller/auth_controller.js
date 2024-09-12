const db = require('../pool');

class authController {
    async getUser(req, res) {
        try {
            const user = await db.query(`SELECT * FROM users WHERE id = 1`);
            res.json({
                user: user.rows[0],
                error: false,
            })
        } catch (e) {
            res.status(400).json({message: 'Registration error'})
        }
    }
}

module.exports = new authController();