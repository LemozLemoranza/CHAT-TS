import { Request, Response, Router } from "express";
import { validarJWT } from '../helpers/jwt';
import { Close, Auth } from '../controllers/auth';
const router = Router()


router.get('/', validarJWT, Auth )

router.post('/close', validarJWT, Close)

export default router;