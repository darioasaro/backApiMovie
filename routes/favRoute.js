const express = require( 'express' )
const favController = require('../controllers/favController')
const router = express.Router()

router.get('/', favController.list  )
router.post('/', favController.add )
router.get('/:id', favController.edit )
router.delete('/:id', favController.delete )
router.patch('/:id', favController.update )

module.exports = router 