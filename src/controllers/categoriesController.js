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

