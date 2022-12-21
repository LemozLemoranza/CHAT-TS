"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Close = exports.Auth = void 0;
const node_localstorage_1 = require("node-localstorage");
const localStorage = new node_localstorage_1.LocalStorage('./scratch');
const Auth = (req, res) => {
    const usuario = req.cookies.usuario;
    res.render('auth', { usuario });
};
exports.Auth = Auth;
const Close = (req, res) => {
    localStorage.clear();
    res.redirect('/usuarios/login');
};
exports.Close = Close;
//# sourceMappingURL=auth.js.map