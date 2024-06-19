const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    password: 'gikin13579',
    host: 'localhost',
    port: 5432,
    database: "toxin"
})

module.exports = pool