import { Router } from "express"
import CT from '../controllers/user.js'

const router = Router()

router.post('/users', CT.POST)
router.get('/users', CT.GET)
router.put('/users/:user_id', CT.PUT)
router.delete('/users/:user_id', CT.DELETE)

export default router

