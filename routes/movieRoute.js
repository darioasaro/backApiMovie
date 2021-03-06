const express = require( 'express' )
const movieController = require('../controllers/movieController')
const secure = require('../middleware/secure')
const router = express.Router()

router.get('/', movieController.index  )
router.get('/:movie',secure.admin,movieController.search)
router.get('/find/:id',movieController.find)
router.post('/', secure.admin,movieController.store )
router.get('/list/:id', movieController.edit )
router.delete('/:id', secure.admin,movieController.delete )
router.patch('/:id', secure.admin,movieController.update )

module.exports = router 