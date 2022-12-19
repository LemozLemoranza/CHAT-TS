"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const custom_validators_1 = require("../helpers/custom-validators");
const jwt_1 = require("../helpers/jwt");
const router = (0, express_1.Router)();
router.get('/register', jwt_1.validarNotJWT, usuarios_1.GetRegister);
router.post('/register', [
    jwt_1.validarNotJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombre').custom(custom_validators_1.NameExist),
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.check)('email').custom(custom_validators_1.EmailExist),
    (0, express_validator_1.check)('password', 'La contraseña debe contener entre 8 y 15 caracteres, sin espacios en blanco y al menos una minúscula, una mayúscula, un número y un caracter especial').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/),
    // ValidarCampos
], usuarios_1.PostRegister);
router.get('/login', jwt_1.validarNotJWT, usuarios_1.GetLogin);
router.post('/login', [
    jwt_1.validarNotJWT,
    (0, express_validator_1.check)('password').custom(custom_validators_1.UserExist)
    // ValidarCampos,
], usuarios_1.PostLogin);
// router.post('/google',[
//     check('id_token', 'El tooken de google es obligatorio').not().isEmpty(),
//     ValidarCampos
// ],GoogleSignIn)
exports.default = router;
//# sourceMappingURL=usuarios.js.map