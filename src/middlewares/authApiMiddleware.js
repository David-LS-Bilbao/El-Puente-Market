import userService from "../services/userService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function isRegisterDataCorrect(req, res, next) {
    try {
        const { dni, username, email, password, passwordRepeat } = req.body;

        if (!dni || !username || !email || !password || !passwordRepeat) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        if (password !== passwordRepeat) {
            return res.status(400).json({ error: "Las contraseñas no coinciden" });
        }

        const oldUser = await userService.getUserByDNI(dni);
        if (oldUser) {
            return res.status(409).json({ error: "El usuario ya existe" });
        }

        const hash = await bcrypt.hash(password, 10);

        req.registerData = {
            dni,
            username,
            email,
            password: hash,
        };

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error en el registro" });
    }
}

async function checkCredentials(req, res, next) {
    try {
        const { dni, password } = req.body;

        const user = await userService.getUserByDNI(dni);

        if (!user) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        const token = jwt.sign(
            {
                dni: user.dni,
                email: user.email,
                role: user.type,
                username: user.username
            },
            process.env.JWT_SECRET
        );

        return res.status(200).json({
            message: "Login correcto",
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error en el login" });
    }
}

export default checkCredentials;

export {
    isRegisterDataCorrect,
    checkCredentials
}