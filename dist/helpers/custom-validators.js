"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExist = exports.EmailExist = exports.NameExist = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const NameExist = (lowerName) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre = lowerName.toUpperCase();
    const nameExist = yield usuario_1.default.findOne({
        where: { nombre },
    });
    if (nameExist) {
        throw new Error(`El nombre ${nombre} ya se encuentra registrado`);
    }
    else {
        return;
    }
});
exports.NameExist = NameExist;
const EmailExist = (lowerEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const email = lowerEmail.toUpperCase();
    const emailExist = yield usuario_1.default.findOne({
        where: { email },
    });
    if (emailExist) {
        throw new Error(`El correo ${email} ya se encuentra registrado`);
    }
    else {
        return;
    }
});
exports.EmailExist = EmailExist;
const UserExist = (value = '', req) => __awaiter(void 0, void 0, void 0, function* () {
    const emailLower = req.req.body.email;
    const email = emailLower.toUpperCase();
    const userExist = yield usuario_1.default.findOne({
        where: { email },
    });
    if (!userExist) {
        throw new Error("Usuario o contraseña incorrectos - user");
    }
    else {
        const passwordExiste = bcryptjs_1.default.compareSync(value, userExist.password);
        if (!passwordExiste) {
            throw new Error("Usuario o contraseña incorrectos - contra");
        }
    }
});
exports.UserExist = UserExist;
//# sourceMappingURL=custom-validators.js.map