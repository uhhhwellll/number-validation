
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const key = process.env.SECRET_KEY
const { User } = require('../models/model.js')

const genJWT = ({ login, email, phone }) => {
    return jwt.sign({ login, email, phone }, key, { expiresIn: '24h' })
}

exports.getalluser = async (req, res) => {
    try {
        const getall = await User.findAll();
        return res.status(200).json(getall)
    } catch (error) {
        return res.status(500)
    }
}

exports.getuser = async (req, res) => {
    try {
        const { id } = req.params
        const getone = await User.findByPk(id)
        return res.status(200).json(getone)
    } catch (error) {
        return res.status(500)
    }
}

exports.register = async (req, res) => {
    try {
        const { login, email, password, phone } = req.body
        const regExp = /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/
        if (!regExp.test(phone)) {
            return res.status(400).json({ message: 'Укажите номер телефона' })
        }
        const candidate = await User.findOne({ where: { email } })
        if (!login || !email || !password || !phone) {
            return res.status(400).json({ message: 'fill out all fields' })
        }
        if (candidate) {
            return res.status(400).json({ message: 'user already exists' })
        }
        const hashed = bcrypt.hashSync(password, 7)
        const newuser = await User.create({ login, email, password: hashed, phone })
        const token = genJWT({ login: newuser.login, email: newuser.email, phone: newuser.phone });
        return res.status(200).json({ message: 'user created' }, token)

    } catch (error) {
        return res.status(500)
    }
}
exports.login = async (req, res) => {
    try {
        const { login, email, password, phone } = req.body
        const candidate = await User.findOne({ where: { login, email } })
        if (!login || !email || !password || !phone) {
            return res.status(400).json({ message: 'fill out all fields' })
        }
        if (!candidate) {
            return res.status(400).json({ message: 'user doesnt exists' })
        }
        const compare = bcrypt.compareSync(password, candidate.password);
        if (!compare) {
            return res.status(400).json({ message: 'incorrect login or password inputs' })
        }
        const token = genJWT({ login: candidate.login, email: candidate.email, phone: candidate.phone })
        return res.status(200).json({ message: 'user authorized' }, token)
    } catch (error) {
        return res.status(500)
    }
}
exports.updateuser = async (req, res) => {
    try {
        const { id } = req.params;
        const { login, email, password, phone } = req.body;
        const updating = await User.update({ login, email, password, phone })
        return res.status(200).json({ message: 'user updated' })
    } catch (error) {
        return res.status(500)
    }
}
exports.deleteuser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.destroy({ where: { id } })
        return res.status(200).json({ message: 'user deleted' })
    } catch (error) {
        return res.status(500)
    }
}