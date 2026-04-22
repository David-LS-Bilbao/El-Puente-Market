import userService from '../../services/userService.js'

async function getAllUsers(req, res) {
    const users = await userService.getAllUsers();
    res.render("dashboard/user/user", { users, layout: "layouts/dashboard" });
};

async function getUserByDNI(req, res) {
    const dni = req.params.dni;
    const user = await userService.getUserByDNI(dni);
    res.render("dashboard/user/editUser", { user, layout: "layouts/dashboard" });

}

async function createUserRegister(req, res) {
    const user = await userService.createUserRegister(req.body);
    return res.redirect('/admin/user');
}


async function updateUser(req, res) {
    const dni = req.params.dni;
    const user = await userService.updateUser(dni, req.body);
    res.redirect('/admin/user');
}

async function deleteUser(req, res) {
    const dni = req.params.dni;
    const user = await userService.deleteUser(dni);
    res.redirect('/admin/user');
}

async function getViewCreateUser(req, res) {
    res.render('dashboard/user/createUser', {
        layout: 'layouts/dashboard'
    });
}

async function getViewEditUser(req, res) {
    res.render('dashboard/user/editUser', {
        layout: 'layouts/dashboard'
    });
}

async function getUserDetail(req, res) {
    const dni = req.params.dni;
    const user = await userService.getUserByDNI(dni);

    return res.render("dashboard/user/userDetail", {
        user,
        layout: "layouts/dashboard"
    });
}

export const functions = { getAllUsers, getUserByDNI, createUserRegister, updateUser, deleteUser, getViewCreateUser, getViewEditUser, getUserDetail };
export default functions;