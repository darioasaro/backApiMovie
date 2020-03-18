const express = require( 'express' )
const movieController = require('../controllers/movieController')
const secure = require('../middleware/secure')
const router = express.Router()

router.get('/', movieController.index  )
router.get('/:movie',secure.secure,movieController.search)
router.post('/', movieController.store )
router.get('/list/:id', movieController.edit )
router.delete('/:id', movieController.delete )
router.patch('/:id', movieController.update )

module.exports = router 