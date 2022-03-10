const ApiError = require(`../error/ApiError`)
const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)
const {User} = require('../models/models')

const generateJWT = (id, login) =>{
    return jwt.sign(
        {id, login},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController{
    async registration(req, res, next){
        const {login, password} = req.body
        if(!login || !password){
            return next(ApiError.badRequest('Не вказано login або password'))
        }
        const candidate = await User.findOne({where: {login}})
        if(candidate){
            return next(ApiError.badRequest('Даний login вже зареэстровано' ))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login, password: hashPassword})
        const token = generateJWT(user.id, login)
        return res.json({token})
    }

    async login(req, res, next){
        const {login, password} = req.body
        if(!login || !password){
            return next(ApiError.badRequest('login або password не введено'))
        }
        const user = await User.findOne({where: {login}})
        if(!user){
            return next(ApiError.badRequest(`Користувача з даним login не існує`))
        }

        let comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return next(ApiError.badRequest('Не вірний пароль'))
        }
        const token = generateJWT(user.id, login)
        return res.json({token})
    }

    async check(req, res, next ){
        const token = generateJWT(req.user.id, req.user.login)
        return res.json({token})
    }


    async getAll(req, res, next){
        const list = await User.findAndCountAll({order: [['highScore', 'DESC']]})
        return res.json(list)
    }

    async updateScore(req, res, next){
        const {login, score} = req.body
        const user = await User.findOne({where: {login}})
        if(user.highScore < score){
            user.highScore = score;
            await user.save();
            return res.json(`New record ${score}`)
        }
        return res.json('Bad result')
    }

    async getOne(req, res, next){
        const login = req.body.login
        const user = await User.findOne({where: {login}})
        return res.json(user)
    }


}

module.exports = new UserController()