"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidarCampos = void 0;
const express_validator_1 = require("express-validator");
const ValidarCampos = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const valores = req.body;
        const validaciones = errors.array();
        return res.status(400).send({ validaciones });
    }
    else {
        return next();
    }
};
exports.ValidarCampos = ValidarCampos;
//# sourceMappingURL=validar-campos.js.map