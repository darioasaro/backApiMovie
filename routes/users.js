const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get('/', userController.index)
router.get('/:id', userController.show)
router.post('/', userController.store)
router.put('/', userController.update)
router.delete('/', userController.delete)

module.exports = router;
