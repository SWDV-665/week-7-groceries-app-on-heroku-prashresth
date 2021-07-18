const request = require('superagent');

// tried a different way of exporting methods since there was only one.
module.exports = { async getPictures() {
    try {
        // moved to frontend so that all non employee pages do not need the API running.
        let images = [];
        let imageList = (await request.get(`https://dog.ceo/api/breeds/image/random/12`)).body.message;
        imageList.map(il => {
            let image = {};
            image.message = il;
            image.breed = il.split('/')[4];
            images.push(image);
        });

        return {images};
    } catch (e) {
        console.log(e);
        return e;
    }
}}