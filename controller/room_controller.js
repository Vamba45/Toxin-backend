const db = require('../db');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
}

class UserController {

    async createRoom(req, res) {

        for(let i = 10; i < 100; i++) 
        {
            let images = [
                "https://cache.marriott.com/marriottassets/marriott/CHIDX/chidx-guestroom-0028-hor-clsc.jpg?interpolation=progressive-bilinear&",
                "https://www.izmailovo.ru/upload/iblock/fc2/fc2dad1b6e4eb0d18b8b17de1d4e16f1.jpg",
                "https://cdn.fishki.net/upload/post/201412/08/1344986/a30d07c81c868526816c49eef27b65c8.jpg",
                "https://idei.club/uploads/posts/2022-09/1662620716_38-idei-club-p-gostinichnii-nomer-s-kukhnei-oboi-56.jpg",
                "https://megotel.ru/images/rooms/66232/171408/bb0609a2e1146.jpg",
                "https://уральскаязвезда.рф/upload/iblock/141/141964584abf6ed3b25e5a92886fea9f.jpg",
                "https://www.uniqhotels.com/media/hotels/c3/8._room_mate_bruno_hotel_rotterdam_suite_red_2.jpg",
                "https://reallydesign.ru/upload/iblock/729/729ab094ee84a375c6dfaa9afa50dc86.jpg",
                "https://mykaleidoscope.ru/uploads/posts/2021-03/1616618234_35-p-interer-gostinichnogo-nomera-42.jpg",
                "https://rrbook.ru/wa-data/public/shop/products/28/84/8428/images/27256/27256.970x0.jpg",
                "https://mebellka.ru/wp-content/uploads/4/4/7/447078749e429a09d9cc9b2c8dadc175.jpeg",
                "https://travelinlife.ru/uploads/666/91777e687028b24947a9a37802c2c577.jpg"
            ];

            
            let comfort = ["smoke", "guests", "pets", "coridor", "helper", "breakfast", "table", "chair", "bed", "TV" ,"champoo"];

            let element = {
                "id": i,
                "number": Number(getRandomInt(1, 1000)),
                "luxe": getRandomInt(1, 10) % 3 === 0 ? true : false,
                "reviewCount": getRandomInt(1, 300),
        
                "beds": getRandomInt(1, 10),
                "bedRooms": getRandomInt(1, 10),
                "bathRooms": getRandomInt(1, 10),
        
                "adult": getRandomInt(1, 10),
                "children": getRandomInt(1, 10),
                "babies": getRandomInt(1, 10),
        
                "dayStart": `2024-06-01`,
                "dayEnd": `2024-06-25`,
        
                "stars": getRandomInt(3, 6),
        
                "price": getRandomInt(2500, 15000),
                "photos": [
                    images[getRandomInt(0, images.length - 1)],
                    images[getRandomInt(0, images.length - 1)],
                    images[getRandomInt(0, images.length - 1)],
                    images[getRandomInt(0, images.length - 1)]
                ],
                "comfort": [
                    "all",
                    comfort[getRandomInt(0, 2)], 
                    comfort[getRandomInt(3, 5)],
                    comfort[getRandomInt(6, comfort.length)]
                ]
            };

            await db.query(`INSERT INTO rooms (id, number, luxe, reviewcount, bedrooms, beds, bathrooms, adult, children, babies, daystart, dayend, stars, price, photos, comfort) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`, [element.id, element.number, element.luxe, element.reviewCount, element.bedRooms, element.beds, element.bathRooms, element.adult, element.children, element.babies, element.dayStart, element.dayEnd, element.stars, element.price, element.photos, element.comfort]);
        }
    }

    async getRooms(req, res) {
        let page = (req.query.page) || 1;
        let limit = (req.query.limit) || 12;

        const maxPrice = req.query.maxPrice || 100000;
        const minPrice = req.query.minPrice || 0;

        const total = await db.query(`SELECT count(*) FROM rooms WHERE price >= ${minPrice} AND price <= ${maxPrice}`);

        
        console.log(page, total, limit);

        if(Number(page) > Math.ceil(Number(total.rows[0].count) / Number(limit))) {
            page = '1';
        }

        const rooms = await db.query(`SELECT * FROM rooms WHERE price >= ${minPrice} AND price <= ${maxPrice} LIMIT ${limit} OFFSET ${page}`);

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
        const users = await db.query('SELECT * FROM rooms');

        res.json(users.rows[0])
    }

    async updateRoom(req, res) {
        const {id, name, surname} = req.body;
        const user = await db.query('UPDATE rooms set name = $1, surname = $2 where id = $3 RETURNING *', [name, surname, id]);

        res.json(user.rows[0])
    }
    async deleteRoom(req, res) {
        const id = req.params.id;
        const user = await db.query('DELETE FROM rooms where id = $1', [id]);

        res.json(user.rows[0])
    }
}

module.exports = new UserController();