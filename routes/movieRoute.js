const express = require( 'express' )
const movieController = require('../controllers/movieController')
const router = express.Router()

router.get('/', movieController.index  )
router.post('/', movieController.store )
router.get('/:id', movieController.edit )
router.delete('/:id', movieController.delete )
router.patch('/:id', movieController.update )

module.exports = router 