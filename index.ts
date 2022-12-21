import dotenv from "dotenv";
import Servidor from "./models/server";
dotenv.config();

const server = new Servidor(); 
server.listen()