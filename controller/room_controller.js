const db = require('../pool');
const createRoom = require('../generator');

class UserController {
    async getAllRooms(req, res) {
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

    async updateOneRoom(req, res) {
        const rooms = await db.query('SELECT * FROM room');

        res.json(rooms.rows[0])
    }

    async deleteAllRooms(req, res) {
        const user = await db.query('DELETE FROM room where id < 1000');

        res.json(user.rows[0])
    }

    async createRooms(req, res) {
        const count = req.body.count;

        for(let i = 0; i < count; i++) {
            let elem = createRoom(); 

                await db.query(`INSERT INTO room (price, daystart, dayend, luxe, stars, reviewcount, beds, bedrooms, bathrooms, adult, children, babies, "number", photos, comfort) VALUES (${elem.price}, '${elem.dayStart}', '${elem.dayEnd}', ${elem.luxe}, ${elem.stars}, ${elem.reviewCount}, ${elem.beds}, ${elem.bedRooms}, ${elem.bathRooms}, ${elem.adult}, ${elem.children}, ${elem.babies}, ${elem.number}, '[${elem.photos.map((el) => `"${el}"`).join(", ")}]', '[${elem.comfort.map((el) => `"${el}"`).join(", ")}]')`);
        }
    }
}

module.exports = new UserController();