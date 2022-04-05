import {createConnection} from "typeorm";
import ormconfig from '../src/ormconfig';
import * as dotenv from 'dotenv';

dotenv.config();

createConnection(ormconfig).then(async () => {
    require("./test-repo")
})