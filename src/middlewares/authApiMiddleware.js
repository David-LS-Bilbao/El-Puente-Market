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
                type: user.type,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
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

const verifyToken = (req, res, next) => {
    // El token llega en la cabecera: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token no proporcionado' })
    }
    const token = authHeader.split(' ')[1]
    try {
        // jwt.verify lanza un error si el token es inválido o ha expirado
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // Adjuntamos el payload a req para que los controladores lo usen
        req.user = payload // { id: 1, rol: 'admin', iat: ..., exp: ... }
        next()
    } catch (error) {
        console.error(error)
        // JsonWebTokenError: token malformado o firma inválida
        // TokenExpiredError: token expirado
        return res.status(401).json({ error: 'Token inválido o expirado' })
    }
}

function requireRoleApi(...types) {
    return (req, res, next) => {
        if (types.includes(req.user?.type)) {
            next();
        }
        else {
            res.status(403).json({ error: "Acceso denegado" });
        }
    }
}


export {
    isRegisterDataCorrect,
    checkCredentials,
    verifyToken,
    requireRoleApi
}