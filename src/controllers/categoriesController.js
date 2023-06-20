import Category from "../models/Category.js";
import slugify from "slugify";

export const listCategories = (request, response) => {

    Category.findAll().then(categories => {
        response.render("admin/categories/index", {categories:categories});
    })
}

export const newCategorie = (request, response) => {
  response.render("admin/categories/new");
};

export const saveCategorie = (request, response) => {
  let title = request.body.title;
  
  if (title != undefined) {
    Category.create({
        title : title,
        slug : slugify(title)
    }).then(()=> {
        response.redirect("/admin/categories")
    })
  }else{
    response.redirect("/admin/categories/new")
  }
};

export const deleteCategorie = (request, response) => {
    let id = request.body.id;
    if(id != undefined && !isNaN(id)){

        Category.destroy({
            where: {
                id: id
            }
        }).then(() => {
            response.redirect("/admin/categories");
        })

    }else{
       response.redirect("/admin/categories"); 
    }
};

export const editCategorie = (request, response) => {
    let id = request.params.id;

    if(isNaN(id)){
        response.redirect("/admin/categories");
    }

    Category.findByPk(id).then(category => {
        if (category != undefined) {
          response.render("admin/categories/edit", { category: category });
        } else {
          response.redirect("/admin/categories");
        }
    }).catch(error => {
        response.redirect("/admin/categories");
    })
}
