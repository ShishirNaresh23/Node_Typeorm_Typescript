import "reflect-metadata";
import {ConnectionOptions, createConnection} from "typeorm";

import http from 'http';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { PostRouter } from './routes/posts.routes';

// async() => { await createConnection();
//          console.log("Connection created.")
// }

class Server{
    private app: express.Application;
    private postRoute : PostRouter;

    private connectionOpt : ConnectionOptions;
    
    constructor(){
        this.app = express();
        this.configuration();

        this.connectionOpt = {
            "type": "postgres",
            "host": "localhost",
            "port": 5432,
            "username": "shishirnaresh",
            "password": "",
            "database": "post_db",
            "synchronize": true,
            "logging": false,
            "entities": [
                "./source/model/*.ts"
             ],
            "name": "post_db"
        }
        
        this.routes();
    }

    private configuration(){
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express.json());
    }

    private async routes(){
        let connect = await createConnection(this.connectionOpt);

        this.postRoute = new PostRouter();
        
        this.app.get("/", (req:Request, res: Response)=>{
            res.send("Hello World");
        });

        this.app.use('/api/v1/post', this.postRoute.postRout);
    }

    public start(){
        this.app.listen(this.app.get('port'), ()=>{
            console.log(`Server is listening at the port ${this.app.get('port')} port.`)
        })
    }
}

const server = new Server();
server.start();

// /** Logging */
// router.use(morgan('dev'));
// /** Parse the request */
// router.use(express.urlencoded({ extended: false }));
// /** Takes care of JSON data */
// router.use(express.json());

// /** RULES OF OUR API */
// router.use((req, res, next) => {
//     // set the CORS policy
//     res.header('Access-Control-Allow-Origin', '*');
//     // set the CORS headers
//     res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
//     // set the CORS method headers
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
//         return res.status(200).json({});
//     }
//     next();
// });

// /** Routes */
// router.use('/', routes);

// /** Error handling */
// router.use((req, res, next) => {
//     const error = new Error('not found');
//     return res.status(404).json({
//         message: error.message
//     });
// });

/** Server */
// const httpServer = http.createServer(router);
// const PORT: any = process.env.PORT ?? 6060;
// router.listen(PORT, () => console.log(`The server is running on port ${PORT}`));