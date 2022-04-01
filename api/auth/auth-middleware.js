const User = require('../users/users-model')

const checkIfValid = (req, res, next) => {
    const {username, password} = req.body
    if (!username || !password) {
        res.status(400).json({
            message: "username and password required"
        }) 
    } else {
        next()
    }
}

async function checkUsernameExists(req, res, next) {
    try{
        const users = await User.findBy({ username: req.body.username})
        if(!users.length){
            next()
        } else {
            res.status(422).json({
                message: "username taken"
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports ={
    checkIfValid,
    checkUsernameExists
}