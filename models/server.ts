import express, { Application } from "express";
import cors from "cors";
import userRoutes from "../routes/usuarios";
import authRoutes from "../routes/auth";
import db from "../db/connection";
import { join } from "path";
import { engine } from "express-handlebars";



class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/usuarios',
        auth:'/auth'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        
        this.middlewares();
        this.routes();
        this.dbConnection()
    }

    routes(){
        this.app.use( this.apiPaths.usuarios, userRoutes );
        this.app.use( this.apiPaths.auth, authRoutes );

    }

    async dbConnection(){
        try{
            await db.authenticate();
            console.log('DB lista')

        }catch(err:any){
            throw new Error( err )
        }
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'))

        this.app.set('views', join(__dirname, '../views'))

        this.app.engine('.hbs', engine({
            defaultLayout: 'main',
            layoutsDir: join(this.app.get('views'), 'layouts'),
            partialsDir: join(this.app.get('views'), 'partials'),
            extname: 'hbs'
        }))

        this.app.set('view engine', '.hbs')
    
        this.app.use(express.urlencoded({extended: false}));
    }
    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }
}

export default Server