import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userService from "../../services/userService.js"

async function register(req, res) {
    try {
        const data = req.registerData;

        const newUser = await userService.createUserRegister(data);

        return res.render("auth/index", {
            layout: "layouts/auth"
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
        return res.render("dashboard/admin", {
            layout: "layouts/dashboard"
        });

    } catch (error) {
        console.log(error);
    }
}

async function getLogin(req, res) {
    return res.render("auth/index", {
        layout: "layouts/auth"
    });
}

async function getRegister(req, res) {
    return res.render("auth/register", {
        layout: "layouts/auth"
    });
}
async function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error al cerrar sesión");
        }

        res.clearCookie("connect.sid");
        return res.redirect("/auth/login");
    });
}


export const functions = {
    register,
    login,
    getLogin,
    logout,
    getRegister
}

export default functions;

