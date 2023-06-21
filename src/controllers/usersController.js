import User  from "../models/User.js";
import bcrypt from "bcryptjs"

export const listUsers = (request, response) => {
    response.send("Lista de usuários")
}

export const createUser = (request, response) => {
    response.render("admin/users/create")
}

export const saveUser = (request, response) => {
    let email = request.body.email;
    let password = request.body.password;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    User.create({
        email:email,
        password:hash
    }).then(() => {
        response.redirect("/");
    }).catch((error) => {
        response.redirect("/");
    })

};
