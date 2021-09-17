const User   = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')

const registerr = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if(err) {
            res.json({
                error: err
            })
        }

        let newUser = new User ({
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        })
    
        newUser.save()
        .then(newUser => {
            res.json({
                message: 'User added successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occurred!'
            })
        })
    })
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({$or: [{email: username}, {phone: username}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(err) {
                    res.json({
                        error: err
                    })
                }
                if(result) {
                    let token = jwt.sign({email: user.email}, 'verySecretValue', {expiresIn: '1h'})
                    res.json({
                        message: 'Login successful!',
                        token
                    })
                } 
                else {
                    res.json({
                        message: 'Password does not correct'
                    })
                }
            })
        } 
        else {
            res.json({
                message: 'No user found!'
            })
        }
    })
}

module.exports = {
    registerr, login
}