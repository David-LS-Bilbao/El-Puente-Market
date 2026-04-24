import userService from "../services/userService.js";
import bcrypt from "bcrypt";

async function isRegisterDataCorrect(req, res, next) {
    try {
        const { dni, name, email, password, passwordRepeat } = req.body;

        if (!dni || !name || !email || !password || !passwordRepeat) {
            return res.redirect("/auth/register?message=Faltan campos obligatorios");
        }

        if (password !== passwordRepeat) {
            return res.redirect("/auth/register?message=Las contraseñas no coinciden");
        }

        const oldUser = await userService.getUserByDNI(dni);
        if (oldUser) {
            return res.redirect("/auth/register?message=Ya existe un usuario con este DNI");
        }

        const hash = await bcrypt.hash(password, 10);

        req.registerData = {
            dni,
            name,
            email,
            password: hash,
        };

        next();
    } catch (error) {
        console.error(error);
        return res.redirect("/auth/register?message=Error en el registro");
    }
}

async function checkCredentials(req, res, next) {
    const user = await userService.getUserByDNI(req.body.dni);
    if (!user) {
        return res.redirect("/auth/login?message=Credenciales incorrectas");
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) {
        return res.redirect("/auth/login?message=Credenciales incorrectas");
    }
    req.session.user = {
        dni: user.dni,
        email: user.email,
        role: user.role,
        name: user.name
    }
    next();
}

async function isLoggedIn(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        return res.redirect("/auth/login?message=Inicia sesión");
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

function requireRole(...roles) {
    return (req, res, next) => {
        if (roles.includes(req.session.user.role)) {
            next();
        }
        else {
            res.status(403).redirect("/auth/login?message=Inicia sesión")
        }
    }
}
function requireRoleApi(...roles) {
    return (req, res, next) => {
        if (roles.includes(req.user?.role)) {
            next();
        }
        else {
            res.status(403).json({ error: "Acceso denegado" });
        }
    }
}
// async function requireAdmin(req, res, next) {
//     if (req.session.user.role === "admin") {
//         next();
//     }
//     else {
//         res.status(403).redirect("/auth/login?message=Inicia sesión")
//     }
// }

const injectUserToViews = (req, res, next) => {
    // Verificamos si existe la sesión y el usuario dentro de ella
    if (req.session && req.session.user) {
        res.locals.user = req.session.user;
    } else {
        res.locals.user = null; // Opcional: asegura que 'user' esté definido como null si no hay sesión
    }

    next();
};


export {
    isRegisterDataCorrect,
    checkCredentials,
    isLoggedIn,
    requireRole,
    // requireAdmin,
    injectUserToViews,
    verifyToken,
    requireRoleApi
}