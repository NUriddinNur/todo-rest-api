import { Op } from 'sequelize'

const POST = async function (req, res, next) {
    try{
        const newUser = await req.models.User.build({
            username: req.body.username,
            user_contact: req.body.contact,
            user_gender: req.body.gender,
            user_age: req.body.age
        })

        await newUser.save()
        return res.json({
            status: 200,
            message: "Ok",
            data: newUser
        })

    }catch(error) {
        next(error.message)
    }

} 

const GET = async function (req, res, next) {
    try{
        if(req.query.username && req.query.user_id) {
            const users = await req.models.User.findAll({
                where: {
                    user_id: req.query.user_id,
                    username: req.query.username,
                }
            })
    
            return res.json({
                status: 200,
                message: 'Ok',
                data: users
            }) 
        }
        if(req.query.user_id) {
            const users = await req.models.User.findAll({
                where: {
                    user_id: req.query.user_id,
                }
            })
    
            return res.json({
                status: 200,
                message: 'Ok',
                data: users
            }) 
        }
        if(req.query.username) {
            const users = await req.models.User.findAll({
                where: {
                    username: req.query.username,
                }
            })
    
            return res.json({
                status: 200,
                message: 'Ok',
                data: users
            }) 
        }
        const users = await req.models.User.findAll()

        return res.json({
            status: 200,
            message: 'Ok',
            data: users
        })
    }catch(error) {
        next(error.message)
    }

} 

const PUT = async function (req, res, next) {
    try{
        const updatedData = await req.models.User.update({
            username: req.body.username,
            user_contact: req.body.user_contact,
            user_gender: req.body.user_gender,
            user_age: req.body.user_age
        }, {
            where: {
                user_id: req.params.user_id
            },
            returning: true,
        })

        return res.json({
            status: 200,
            message: 'The user updated!',
            data: updatedData[1][0]
        })
    }catch(error) {
        next(error.message)
    }

} 

const DELETE = async function (req, res, next) {
    try{
        const updatedData = await req.models.User.destroy({
            where: {
                user_id: req.params.user_id
            },
        })

        return res.json({
            status: 200,
            message: 'User deleted!',
            data: updatedData
        })
    }catch(error) {
        next(error.message)
    }

} 

export default {
    DELETE,
    POST,
    GET,
    PUT
}