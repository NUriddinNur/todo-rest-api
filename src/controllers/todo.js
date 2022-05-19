const POST = async function (req, res, next) {
    try{
        const newTodo = await req.models.Todo.build({
            user_id: req.body.user_id,
            todo_body: req.body.todo_body,
        })
        
        await newTodo.save()
        return res.json({
            status: 200,
            message: "Todo added",
            data: {
                todo_id: newTodo.todo_id,
                user_id: newTodo.user_id,
                todo_body: newTodo.todo_body,
                todo_created_at: newTodo.todo_created_at
            }
        })

    }catch(error) {
        next(error.message)
    }

} 


const GET = async function (req, res, next) {
    try{
        if(req.query.todo_id) {
            const todos = await req.models.Todo.findAll({
                attributes: ['todo_id', 'todo_body', 'todo_created_at'],
                where: {
                    todo_id: req.query.todo_id
                },
                include: [{
                    model: req.models.User,
                    required: true
                }]
            })
    
            return res.json({
                status: 200,
                message: 'Ok',
                data: todos
            }) 
        }
        
        const todos = await req.models.Todo.findAll({
            attributes: ['todo_id', 'todo_body', 'todo_created_at'],
            include: [{
                model: req.models.User,
                required: true
            }]
        })

        return res.json({
            status: 200,
            message: 'Ok',
            data: todos
        })
    }catch(error) {
        next(error.message)
    }

} 

const PUT = async function (req, res, next) {
    try{
        const updatedData = await req.models.Todo.update({
            todo_body: req.body.todo_body,
        }, {
            where: {
                todo_id: req.params.todo_id
            },
            returning: true,
        })

        if(!updatedData[0]){
            return res.json({
                status: 200,
                message: 'The Todo not found!',
                data: null
            })
        }
        return res.json({
            status: 200,
            message: 'The Todo updated!',
            data: updatedData[1][0]
        })
    }catch(error) {
        next(error.message)
    }

} 

const DELETE = async function (req, res, next) {
    try{
        const updatedData = await req.models.Todo.destroy({
            where: {
                todo_id: req.params.todo_id
            },
        })

        console.log(updatedData);

        if(!updatedData) {
            return res.json({
                status: 200,
                message: 'Todo not found!',
                data: null
            })
        }

        return res.json({
            status: 200,
            message: 'Todo deleted!',
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