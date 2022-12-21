"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("../helpers/jwt");
const index_1 = require("../controllers/index");
const router = (0, express_1.Router)();
router.get('/', jwt_1.validarNotJWT, index_1.Index);
exports.default = router;
//# sourceMappingURL=index.js.map