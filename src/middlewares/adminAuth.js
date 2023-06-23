export const adminAuth = (request, response, next) => {
    if(request.session.user != undefined){
        next();
    }else{
        response.redirect("/users/login");
    }
}