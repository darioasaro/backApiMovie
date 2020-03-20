const express = require( 'express' )
const movieController = require('../controllers/movieController')
const secure = require('../middleware/secure')
const router = express.Router()

router.get('/', movieController.index  )
router.get('/:movie',secure.admin,movieController.search)
router.get('/find/:id',movieController.find)
router.post('/', secure.admin,movieController.store )
router.post('/:id', secure.admin,movieController.store )
//router.post('/list/:id', movieController.autoStore )
router.delete('/:id', secure.admin,movieController.delete )
router.patch('/:id', secure.admin,movieController.update )

module.exports = router 