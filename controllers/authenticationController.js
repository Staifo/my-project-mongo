const singleUser = require('../models/singleUser');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const {email, password} = req.body
    let user = await singleUser.findeOne({email})
    if (!user) return res.status(400).send('Invalid Credentials')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).send('Invalid Credentials')
    const token = user.createToken()
    res.set('x-authorization-token', token). send('Login succesful')
}