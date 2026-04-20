import UserModel from "../../models/user.Model.js";


async function getAllUsers(req, res) {
    const user = await UserModel.findAll();
    res.json(user);
};

async function getUserByDNI(req, res) {
    const dni = req.params.dni;
    const user = await UserModel.findByPk(dni);
    res.json(user);
}

async function createUserRegister(req, res) {
    const newUserRegister = await UserModel.create(req.body);
    console.log("newUserRegister", newUserRegister)
    res.json(newUserRegister);
}

async function updateUser(req, res) {
    const dni = req.params.dni;

    const updatedUser = await UserModel.update(req.body, { where: { dni: dni } });
    const user = await UserModel.findByPk(dni);

    res.json(user)
}

async function deleteUser(req, res) {
    const dni = req.params.dni;

    const deletedUser = await UserModel.destroy({ where: { dni: dni } });
    res.json(deletedUser);
}

export const functions = { getAllUsers, getUserByDNI, createUserRegister, updateUser, deleteUser };
export default functions;