import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import { router as CommonRouter } from './routes/index';
import { router as AuthRouter } from './routes/auth.route';
import {createConnection} from "typeorm";
import ormconfig from './ormconfig';
import bodyParser from 'body-parser';
import { passport, passport_authenticate_jwt } from './base/passport.config';

dotenv.config()

createConnection(ormconfig).then(() => {
    const app: Application = express();

    /** Middlewares */
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.json())
    
    /** Routers */
    app.use("/common", passport_authenticate_jwt, CommonRouter);
    app.use("/auth", AuthRouter);

    app.listen(process.env.PORT, ()=>console.log("Server is running"));
})

