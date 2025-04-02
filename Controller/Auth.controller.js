import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export class AuthController {
    constructor() {
    }
    async getUser(req, res) {
        try {
            const user = await User.find()
                .populate('idAccommodation')
            res.json(user);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async postUser(req, res) {
        try {
            const { email, password } = req.body;
            const crypt = await bcrypt.hash(password, 10)
            const user = new User({
                email,
                password: crypt,
            });
            await user.save();
        } catch (error) {
            res.status(500).send(error);
        }
    }

}