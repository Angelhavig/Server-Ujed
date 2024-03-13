import express, {Application} from 'express';
import routesPeticiones from '../routes/peticiones.routes';
import connection from '../db/connection';
import cors from 'cors';


class Server{
    
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '6000'
        this.middelwares();
        this.routes();
        this.conectarDB();
    }
    
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('aplicacion en ejecucion en el puerto ', this.port);
        })
    }

    routes(){
        this.app.use('/api/peticiones', routesPeticiones);

        
    }

    middelwares(){
        this.app.use(express.json());
        this.app.use(cors());

    }

    conectarDB(){
        connection.connect((err)=>{
            if(err) throw err;
            console.log('coneccion exitosa')
        })
    }

}
export default Server;