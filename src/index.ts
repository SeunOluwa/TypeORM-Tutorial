import "reflect-metadata";
import {createConnection} from "typeorm";
import express, { Request, Response } from 'express';

import {User} from "./entity/User";

const app = express();
app.use(express.json());

// CREATE
app.post('/users', async (req: Request, res: Response) => {
    const { name, email, role } = req.body;

    try {
        const user = User.create({ name, email, role });

        await user.save();

        return res.status(201).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// READ
app.get('/users', async (_: Request, res: Response) => {
    try {
        const users = await User.find();

        return res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: 'Something went wrong' });
    }
});

// UPDATE
app.put('/users/:uuid', async(req: Request, res: Response) => {
    const uuid = req.params.uuid;
    const { name, email, role } = req.body;

    try {
        const user = await User.findOneOrFail({ uuid });

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;

        await user.save();

        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: 'Something went wrong' });
    }
});

// DELETE
app.delete('/users/:uuid', async(req: Request, res: Response) => {
    const uuid = req.params.uuid;

    try {
        const user = await User.findOneOrFail({ uuid });

        await user.remove();

        return res.status(204).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: 'Something went wrong' });
    }
});

// FIND
app.get('/users/:uuid', async(req: Request, res: Response) => {
    const uuid = req.params.uuid;

    try {
        const user = await User.findOneOrFail({ uuid });

        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(404).json({ user: 'User not found' });
    }
});

createConnection().then(async connection => {
    app.listen(5000, () => console.log('Server up at http://localhost:5000'));
}).catch(error => console.log(error));
