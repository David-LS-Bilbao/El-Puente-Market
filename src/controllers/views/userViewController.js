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
    try {
        const dniOriginal = req.params.dni;

        let { dni, password, valid_date, cvv, card_number, ...userData } = req.body;

        if (password && password.trim() !== "") {
            userData.password = password;
        }

        userData.valid_date = (valid_date && valid_date.trim() !== "") ? valid_date : null;

        userData.cvv = (cvv && cvv !== "") ? parseInt(cvv) : null;

        userData.card_number = (card_number && card_number.trim() !== "") ? card_number : null;

        await userService.updateUser(dniOriginal, userData);

        res.redirect('/admin/user');
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
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
    const dni = req.params.dni;
    const user = await userService.getUserByDNI(dni);
    res.render('dashboard/user/editUser', {
        user,
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