import User from '../Schema/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export class AuthController {
    constructor() {
    }
    async getUser(req, res) {
        try {
            const user = await User.find()
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
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email,
                password: crypt,
            });
            const UserSave = await user.save();
            jwt.sign({ id: UserSave._id }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.json({ token });
            });

        } catch (error) {
            res.status(500).send(error);
        }
    }

}
export const authController = new AuthController();