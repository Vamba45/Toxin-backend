const db = require('../pool');

class authController {
    async getUser(req, res) {
        try {
            const {email, password} = req.query;

            const user = await db.query(`SELECT * FROM "user" WHERE email = '${email}' and "password" = '${password}'`);

            res.json(user.rows[0]);
        } catch (e) {
            res.status(400).json({message: 'Registration error'})
        }
    }

    async createUser(req, res) {
        try {
            const {email, password, gender, birthdate, name, surname} = req.body;

            const check = await db.query(`SELECT * FROM "user" WHERE email = '${email}' or ("name" = '${name}' and surname = '${surname}')`); 
            
            if(check.rowCount > 0) {
                throw new Error();
            }

            await db.query(`INSERT INTO "user" ("password", email, "name", surname, birthdate, gender) VALUES ('${password}', '${email}', '${name}', '${surname}', '${birthdate}', ${gender})`);

            res.json({message: 'Success'}); 
        } catch(e) {
            res.status(400).json({message: 'Insert data error'})
        }
    }

    async removeUser(req, res) {
        try {
            const email = req.query.email;

            await db.query(`DELETE FROM "user" WHERE email = '${email}'`);

            res.json({message: 'Success'});
        } catch(e) {
            res.status(400).json({message: 'Remove data error'})
        }
    }
}

module.exports = new authController();