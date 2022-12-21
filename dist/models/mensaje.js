"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Lista {
    constructor() {
        this.personas = [];
    }
    agregarPersona(nombre) {
        let persona = { nombre };
        this.personas.push(persona);
        return this.personas;
    }
    getPersonas() {
        return this.personas;
    }
}
exports.default = Lista;
//# sourceMappingURL=mensaje.js.map