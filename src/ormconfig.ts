import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as dotenv from 'dotenv';
import path from "path";

dotenv.config();

const isCompiled: boolean = path.extname(__filename).includes('js');

const ormconfig: PostgresConnectionOptions = {
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": 5432,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "entities": [
        `src/entity/**/*.entity.${isCompiled ? "js" : "ts"} `
    ],
    "logging": true,
    "synchronize": true
}

export default ormconfig;