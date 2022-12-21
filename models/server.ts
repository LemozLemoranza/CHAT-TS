import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from 'http'
import userRoutes from "../routes/usuarios";
import authRoutes from "../routes/auth";
import indexRoutes from "../routes/index";

import db from "../db/connection";
import { join } from "path";
import { engine } from "express-handlebars";
import { Server } from "socket.io"
import { socketController } from "../sockets/socketController";



class Servidor {
    private app: Application;
    private port: string;
    private server : any;
    private io: any
    private apiPaths = {
        usuarios: '/usuarios',
        auth:'/auth',
        index:'/'

    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.server = http.createServer(this.app);
        this.io = new Server(this.server)
        
        
        this.middlewares();
        this.routes();
        this.dbConnection()
        this.sockets()

    }

    routes(){
        this.app.use( this.apiPaths.usuarios, userRoutes );
        this.app.use( this.apiPaths.auth, authRoutes );
        this.app.use( this.apiPaths.index, indexRoutes );


    }

    sockets(){
        this.io.on( 'connection', socketController )
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
        this.app.use(cookieParser());
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
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }
}

export default Servidor