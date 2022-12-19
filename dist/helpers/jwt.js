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
exports.validarNotJWT = exports.validarJWT = exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../models/usuario"));
const node_localstorage_1 = require("node-localstorage");
const localStorage = new node_localstorage_1.LocalStorage('./scratch');
const generarJWT = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = { id };
        const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY);
        return token;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.generarJWT = generarJWT;
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = localStorage.getItem('token');
    if (!token) {
        localStorage.clear();
        return res.redirect('/usuarios/login');
    }
    else {
        try {
            const { id } = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            const user = yield usuario_1.default.findOne({
                where: { id }
            });
            next();
        }
        catch (error) {
            localStorage.clear();
            return res.redirect('/usuarios/login');
        }
    }
});
exports.validarJWT = validarJWT;
const validarNotJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = localStorage.getItem('token');
    if (token) {
        return res.redirect('/auth');
    }
    else {
        next();
    }
});
exports.validarNotJWT = validarNotJWT;
//# sourceMappingURL=jwt.js.map