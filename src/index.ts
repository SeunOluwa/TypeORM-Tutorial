import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';

import {User} from "./entity/User";

const app = express();
app.use(express.json());

createConnection().then(async connection => {
    const user = new User();

    user.name = 'Taiwo Seun';
    user.email = 'taiwo@gmail.com';
    user.role = 'admin';

    await user.save();

    console.log('User created!');
}).catch(error => console.log(error));
