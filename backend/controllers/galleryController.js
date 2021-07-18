const express = require('express');
const {getPictures} = require('../services/galleryService');
const app = express();
app.use(express.json());

//get random pictures from an open API
const get = async function (req, res) {
    try {
        const data = await getPictures();
        res.status(200).send({
            data
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

module.exports = {
    get
}
