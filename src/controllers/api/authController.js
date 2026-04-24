import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userService from "../../services/userService.js"

async function register(req, res) {
    try {
        const data = req.registerData;

        const newUser = await userService.createUserRegister(data);

        return res.status(201).json({
            message: "Usuario creado correctamente"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al registrar usuario" });
    }
}

async function login(req, res) {
    try {
        const user = await userService.getUserByDNI(req.body.dni);
        if (!user) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }
        const payload = {
            id: user.dni,
            email: user.email,
            role: user.role,
            name: user.name
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.json({ token });

    } catch (error) {
        console.log(error);
    }
}



export const functions = {
    register,
    login,
}

export default functions;

