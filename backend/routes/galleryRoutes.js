const express = require('express');
const galleryRouter = express.Router();

const GalleryController = require('../controllers/galleryController');

// route for retrieving random images for the gallery
// moved to frontend so that all non employee pages do not need the API running.
galleryRouter.get('/', GalleryController.get)

module.exports = galleryRouter;
