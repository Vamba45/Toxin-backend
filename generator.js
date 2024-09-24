function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
}

function createRoom() {
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
        "number": Number(getRandomInt(1, 1000)),
        "luxe": getRandomInt(1, 10) % 3 === 0 ? true : false,
        "reviewCount": getRandomInt(1, 300),

        "beds": getRandomInt(1, 10),
        "bedRooms": getRandomInt(1, 10),
        "bathRooms": getRandomInt(1, 10),

        "adult": getRandomInt(1, 10),
        "children": getRandomInt(1, 10),
        "babies": getRandomInt(1, 10),

        "dayStart": `2024-09-${getRandomInt(11, 30)}`,
        "dayEnd": `2024-10-${getRandomInt(11, 30)}`,

        "stars": getRandomInt(3, 6),

        "price": getRandomInt(2500, 15000),
        "photos": [
            images[getRandomInt(0, images.length - 1)],
            images[getRandomInt(0, images.length - 1)],
            images[getRandomInt(0, images.length - 1)],
            images[getRandomInt(0, images.length - 1)]
        ],
        "comfort": [
            comfort[getRandomInt(0, 2)], 
            comfort[getRandomInt(3, 5)],
            comfort[getRandomInt(6, comfort.length)],
        ]
    };

    return element;
}


module.exports = createRoom;