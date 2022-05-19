import { Router } from "express"
import CT from '../controllers/todo.js'

const router = Router()

router.post('/todos', CT.POST)
router.get('/todos', CT.GET)
router.put('/todos/:todo_id', CT.PUT)
router.delete('/todos/:todo_id', CT.DELETE)

export default router