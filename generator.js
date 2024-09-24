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
        "https://travelinlife.ru/uploads/666/91777e687028b24947a9a37802c2c577.jpg",
        "https://riverahotel.ru/upload/iblock/0ab/12.jpg",
        "https://s.101hotelscdn.ru/uploads/image/hotel_image/650012/4475839.jpg",
        "https://premium.tophotels.ru/icache/reviewimage/477d54e05043c52d39f6a3b0c05e0c01/89.jpg",
        "https://avatars.mds.yandex.net/get-altay/1001354/2a000001661908ac62fa13fe7e5a12b08e71/XXL",
        "https://blog.postel-deluxe.ru/wp-content/uploads/hm/1e0daccaf1c9a5f55b3277e752c6d64553d41b083b0ebca68b4348bbad127daa.jpeg",
        "https://uahotels.info/cache/images/4/e/8/4e8e6070c4f28e3db2605fef5fdd0d75.jpg",
        "https://www.rghk.com.hk/uploads/images/gallery-03-170728105100.jpg",
        "https://avatars.mds.yandex.net/i?id=a9cf09051534f4d3b7ad3f546dd6a5fe_l-4869221-images-thumbs&n=13",
        "https://i.pinimg.com/originals/85/29/0e/85290e2dfe74ab9e44351d2de2c8ee16.jpg",
        "https://saletur.ru/galery/tfoto/big/139/31/1393154.jpg",
        "https://www.hotelpasquale.it/images/photos/sl-rooms-hotel-pasquale-monterosso-cinque-terre-liguria-italy-1.jpg",
        "https://s.101hotelscdn.ru/uploads/image/hotel_image/2271/3235140.jpg"
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