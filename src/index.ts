import {createConnection} from "typeorm";
import ormconfig from './ormconfig';
import * as dotenv from 'dotenv';

dotenv.config();

createConnection(ormconfig).then(() => {
    require("./app");
})