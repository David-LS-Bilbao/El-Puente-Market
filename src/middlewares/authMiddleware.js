import userService from "../services/userService.js";
import bcrypt from "bcrypt";

async function isRegisterDataCorrect(req, res, next) {
    try {
        const { dni, username, email, password, passwordRepeat } = req.body;

        if (!dni || !username || !email || !password || !passwordRepeat) {
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
            username,
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
        type: user.type,
        username: user.username
    }
    return res.redirect(user.type === "admin" ? "/admin" : "/");
    //next();
}

async function isLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
        next()
    } else {
        return res.redirect("/auth/login");
    }
}

function requireRole(...types) {
    return (req, res, next) => {
        if (req.session && req.session.user && types.includes(req.session.user.type)) {
            next();
        }
        else {
            res.status(403).redirect("/auth/login")
        }
    }
}


const injectUserToViews = (req, res, next) => {
    if (req.session && req.session.user) {
        res.locals.user = req.session.user;
    } else {
        res.locals.user = null;
    }

    next();
};



export {
    isRegisterDataCorrect,
    checkCredentials,
    isLoggedIn,
    requireRole,
    injectUserToViews
}
