const db = require('../pool');

class UserController {
    async getRooms(req, res) {
        let page = (req.query.page) || 1;
        let limit = (req.query.limit) || 12;

        const maxPrice = req.query.maxPrice || 100000;
        const minPrice = req.query.minPrice || 0;

        const dayStart = req.query.dayStart || '2024-09-01';
        const dayEnd = req.query.dayEnd || '2025-06-30';
        
        const adult = req.query.adult || 0;
        const children = req.query.children || 0;
        const babies = req.query.babies || 0;

        const beds = req.query.beds || 0;
        const bedrooms = req.query.bedrooms || 0;
        const bathrooms = req.query.bathrooms || 0; 

        const comfort = req.query.comfort?.split(',');
        const updatedComf = comfort ? comfort.map(el => `'` + el + `'`) : undefined;

        let totalQuery = `SELECT count(*) FROM room WHERE price >= ${minPrice} AND price <= ${maxPrice} `  + 
                        `AND daystart >= '${dayStart}' and dayend <= '${dayEnd}' ` + 
                        `AND beds >= ${beds} AND bedrooms >= ${bedrooms} AND bathrooms >= ${bathrooms} ` + 
                        `AND adult >= ${adult} AND children >= ${children} AND babies >= ${babies} ` + 
                        `${updatedComf ? `AND comfort::jsonb ?& ARRAY[${updatedComf.join(',')}] ` : ' '}`;

        const total = await db.query(totalQuery);

        if(Number(page) > Math.ceil(Number(total.rows[0].count) / Number(limit))) {
            page = '1';
        }

        let roomsQuery = `SELECT * FROM room WHERE price >= ${minPrice} AND price <= ${maxPrice} `  + 
                        `AND daystart >= '${dayStart}' and dayend <= '${dayEnd}' ` + 
                        `${updatedComf ? `AND comfort::jsonb ?& ARRAY[${updatedComf.join(',')}] ` : ' '}` +
                        `AND adult >= ${adult} AND children >= ${children} AND babies >= ${babies} ` +
                        `AND beds >= ${beds} AND bedrooms >= ${bedrooms} AND bathrooms >= ${bathrooms} ORDER BY price LIMIT ${limit} OFFSET ${(page - 1) * limit}`;

        const rooms = await db.query(roomsQuery);

        console.log(rooms);

        res.json({
            error: false,
            total: (total.rows[0].count),
            page: Number(page),
            limit: Number(limit),
            rooms: rooms.rows
        })
    }

    async getOneRoom(req, res) {
        const id = req.params.id;
        const users = await db.query(`SELECT * FROM room WHERE id = ${id}`);

        res.json(users.rows[0]);
    }

    async updateRoom(req, res) {
        const rooms = await db.query('SELECT * FROM room');
        res.json(rooms.rows[0])
    }

    async deleteRoom(req, res) {
        const id = req.params.id;
        const user = await db.query('DELETE FROM room where id = $1', [id]);

        res.json(user.rows[0])
    }
}

module.exports = new UserController();