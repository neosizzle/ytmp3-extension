//video routes file
const express = require('express')
const { showVideo , deleteVideo } = require('../controllers/videoController')

const router = express.Router();

router.get('/:url' , showVideo)

router.delete('/:url' , deleteVideo)

module.exports = router