"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("../helpers/jwt");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.get('/', jwt_1.validarJWT, auth_1.Auth);
router.post('/close', jwt_1.validarJWT, auth_1.Close);
exports.default = router;
//# sourceMappingURL=auth.js.map