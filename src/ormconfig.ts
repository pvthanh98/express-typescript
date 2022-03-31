import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { Category } from './entity/category.entity';
import { User } from './entity/user.entity';
import { Product } from './entity/product.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const ormconfig: PostgresConnectionOptions = {
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": 5432,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "entities": [
       User, 
       Category, 
       Product
    ],
    "logging": true,
    "synchronize": true
}

export default ormconfig;
