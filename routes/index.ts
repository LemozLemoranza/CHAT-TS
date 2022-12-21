import { Request, Response, Router } from "express";
import { validarJWT, validarNotJWT } from '../helpers/jwt';
import { Index } from '../controllers/index';
const router = Router()


router.get('/', validarNotJWT, Index )



export default router;