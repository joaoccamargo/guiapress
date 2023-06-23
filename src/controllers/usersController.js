import User  from "../models/User.js";
import bcrypt from "bcryptjs"

export const listUsers = (request, response) => {
    User.findAll().then(users => {
        response.render("admin/users/index", {users:users})
    });
}

export const createUser = (request, response) => {
    response.render("admin/users/create")
}

export const saveUser = (request, response) => {
    let email = request.body.email;
    let password = request.body.password;

    User.findOne({where: {email:email}}).then(user => {
        if(user == undefined){

            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);

            User.create({
               email: email,
               password: hash,
            })
            .then(() => {
                response.redirect("/admin/users");
            })
            .catch((error) => {
                response.redirect("/");
            });


        }else{
            response.redirect("/admin/users/create")
        }
    })

};

export const userLogin = (request, response) => {
    response.render("admin/users/login")
}

export const userAuthenticate = (request, response) => {
    let email = request.body.email;
    let password = request.body.password;

    User.findOne({where:{email:email}}).then(user => {
        if(user != undefined){ // Se existir usuario com email informado.
            // Validar com bcrypt
            let correct = bcrypt.compareSync(password, user.password);
            
            if(correct){
                request.session.user = {
                  id: user.id,
                  email: user.email,
                };
                response.redirect("/admin/users")
            }else{
                response.redirect("/users/login");
            }
        }else{
            response.redirect("/users/login");
        }
    })
}

export const userLogout = (request, response) => {
    request.session.user = undefined;
    response.redirect("/");
}