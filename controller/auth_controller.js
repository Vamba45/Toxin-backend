const db = require('../db');
const bcrypt = require('bcryptjs');

class authController {
    async registration(req, res) {
        try {
            const {username, password} = req.body;

            console.log(username, password);

            const candidate = await db.query(`SELECT * FROM "Users" WHERE username = '${username}'`);

            if(candidate.rowCount > 0) {
                return res.status(400).json({message: "Пользователь с таки именем существует"});
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            
            const user = await db.query(`INSERT INTO "Users" (username, "password") VALUES ('${username}', '${hashPassword}')`);
        } catch(e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {

        } catch {

        }
    }

    async getUsers(req, res) {
        try {

        } catch (e) {

        }
    }
}

module.exports = new authController();