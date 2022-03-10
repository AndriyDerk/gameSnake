const Router = require(`express`)
const router = new Router()
const userController = require(`../controllers/userController`)
const authMiddleware = require('../middleware/authMiddleware')


router.post(`/registration`, userController.registration)
router.post(`/login`, userController.login)
router.get(`/auth`,authMiddleware, userController.check)
router.get(`/standing`, userController.getAll)
router.post(`/myPosition`, userController.getOne)
router.put(`/updateScore`, authMiddleware, userController.updateScore)

module.exports = router