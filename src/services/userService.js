import UserModel from "../models/user.Model.js";

async function getAllUsers() {
    const user = await UserModel.findAll();
    return user;
};

async function getUserByDNI(dni) {
    const user = await UserModel.findByPk(dni);
    return user;
}

async function createUserRegister(userData) {
    const newUser = await UserModel.create(userData);
    return newUser;
}

async function updateUser(dni, userData) {

    const updatedUser = await UserModel.update(userData, { where: { dni: dni } });
    const user = await UserModel.findByPk(dni);
    return user;
}

async function deleteUser(dni) {
    const deletedUser = await UserModel.destroy({ where: { dni: dni } });
    return deleteUser;
}

export const functions = { getAllUsers, getUserByDNI, createUserRegister, updateUser, deleteUser };
export default functions;