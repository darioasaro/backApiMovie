const express = require( 'express' )
const favController = require('../controllers/favController')
const router = express.Router()

router.get('/:id/favoritos', favController.list  )
router.post('/:id/favoritos/:idMovie', favController.addFavMovie )
//router.get('/:id', favController.edit )
router.delete('/:id/favoritos/:idMovie', favController.deleteFavMovie )
//router.patch('/:id', favController.update )

module.exports = router 