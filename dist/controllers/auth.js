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
exports.GoogleSignIn = exports.Close = exports.Auth = void 0;
const node_localstorage_1 = require("node-localstorage");
const localStorage = new node_localstorage_1.LocalStorage('./scratch');
const google_verify_1 = require("../helpers/google-verify");
const usuario_1 = __importDefault(require("../models/usuario"));
const jwt_1 = require("../helpers/jwt");
const Auth = (req, res) => {
    res.render('auth/');
};
exports.Auth = Auth;
const Close = (req, res) => {
    localStorage.clear();
    res.redirect('login');
};
exports.Close = Close;
const GoogleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        const { nombre, email } = yield (0, google_verify_1.GoogleVerify)(id_token);
        let usuario = yield usuario_1.default.findOne({
            where: { email }
        });
        if (!usuario) {
            const password = 'NOP', usuario = yield usuario_1.default.create({ nombre, email, password });
        }
        const userExist = yield usuario_1.default.findOne({
            where: { email }
        });
        const token = yield (0, jwt_1.generarJWT)(userExist.id);
        localStorage.setItem('token', token);
        res.redirect('register');
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.GoogleSignIn = GoogleSignIn;
//# sourceMappingURL=auth.js.map