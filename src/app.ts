import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import { router as CommonRouter } from './routes/index';
import { router as AuthRouter } from './routes/auth.route';
import { router as CategoryRouter } from './routes/category.route';
import { router as ProductRouter } from './routes/product.route';
import {createConnection} from "typeorm";
import ormconfig from './ormconfig';
import bodyParser from 'body-parser';


dotenv.config()

createConnection(ormconfig).then(() => {
    const app: Application = express();
    const passportConfig = require('./base/passport.config');
    /** Middlewares */
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.json())
    
    /** Routers */
    app.use("/auth", AuthRouter);
    app.use("/common", passportConfig.passport_authenticate_jwt, CommonRouter);
    app.use("/category", passportConfig.passport_authenticate_jwt, CategoryRouter);
    app.use("/product", passportConfig.passport_authenticate_jwt, ProductRouter);

    app.listen(process.env.PORT, ()=>console.log("Server is running"));
})

