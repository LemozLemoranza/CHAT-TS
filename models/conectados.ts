class Usuarios {

    private personas: any

    constructor(){
        this.personas = [];
    }

    agregarPersona( nombre: string){

        let persona = { nombre };

        this.personas.push(persona);

        return this.personas;

    }


}
