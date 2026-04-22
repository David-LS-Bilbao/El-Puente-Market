import userService from '../../services/userService.js'

async function getAllUsers(req, res) {
    const users = await userService.getAllUsers();
    res.render("dashboard/user", { users, layout: "layouts/dashboard" });
};

async function getUserByDNI(req, res) {
    try {
        const dni = req.params.dni;
        const user = await userService.getUserByDNI(dni);
        res.render("", { user, layout: "layouts/dashboard" });

    } catch (error) {
        parseError(error, res);
    }
}

async function createUserRegister(req, res) {
    try {
        const user = await userService.createUserRegister(req.body);
        res.render("dashboard/createUser", { user, layout: "layouts/dashboard" });

    } catch (error) {
        parseError(error, res);
    }

}

async function updateUser(req, res) {
    try {
        const dni = req.params.dni;
        const user = await userService.updateUser(dni, req.body);
        res.render("dashboard/editUser", { user, layout: "layouts/dashboard" });

    } catch (error) {
        parseError(error, res);
    }

}

async function deleteUser(req, res) {
    try {
        const dni = req.params.dni;
        const user = await userService.deleteUser(dni);
        res.json(user);
    } catch (error) {
        parseError(error, res);
    }
}
async function getViewCreateUser(req, res) {
    res.render('dashboard/createUser', {
        layout: 'layouts/dashboard'
    });
}

export const functions = { getAllUsers, getUserByDNI, createUserRegister, updateUser, deleteUser, getViewCreateUser };
export default functions;