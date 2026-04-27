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
        req.session.user = req.authUser;
        const redirect = req.authUser.type === "admin" ? "/admin" : "/";
        return res.redirect(redirect);
    } catch (error) {
        console.error(error);
        return res.redirect("/auth/login?message=No se pudo iniciar sesión");
    }
}

async function getLogin(req, res) {
    return res.render("auth/index", {
        layout: "layouts/auth",
        message: req.query.message ?? null
    });
}

async function getRegister(req, res) {
    return res.render("auth/register", {
        layout: "layouts/auth",
        message: req.query.message ?? null
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
