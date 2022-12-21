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
exports.PostLogin = exports.GetLogin = exports.PostRegister = exports.GetRegister = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const node_localstorage_1 = require("node-localstorage");
const localStorage = new node_localstorage_1.LocalStorage('./scratch');
const jwt_1 = require("../helpers/jwt");
const express_validator_1 = require("express-validator");
const GetRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('usuarios/register');
});
exports.GetRegister = GetRegister;
const PostRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const valores = req.body;
        const validaciones = errors.array();
        return res.render('usuarios/register', { validaciones, valores });
    }
    else {
        const lowerName = req.body.nombre;
        const lowerEmail = req.body.email;
        const lowerPassword = req.body.password;
        const nombre = lowerName.toUpperCase();
        const email = lowerEmail.toUpperCase();
        const salt = bcryptjs_1.default.genSaltSync();
        const password = bcryptjs_1.default.hashSync(lowerPassword, salt);
        const usuario = yield usuario_1.default.create({ nombre, email, password });
        return res.render('usuarios/register', { nombre });
    }
});
exports.PostRegister = PostRegister;
const GetLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('usuarios/login');
});
exports.GetLogin = GetLogin;
const PostLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const valores = req.body;
        const validaciones = errors.array();
        return res.render('usuarios/login', { validaciones, valores });
    }
    else {
        const emailLower = req.body.email;
        const email = emailLower.toUpperCase();
        const password = req.body.password;
        const userExist = yield usuario_1.default.findOne({
            where: { email }
        });
        const token = yield (0, jwt_1.generarJWT)(userExist.id);
        localStorage.setItem('token', token);
        res.cookie('usuario', userExist.nombre);
        res.redirect('/auth');
    }
});
exports.PostLogin = PostLogin;
//# sourceMappingURL=usuarios.js.map