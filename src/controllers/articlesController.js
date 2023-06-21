import Category from "../models/Category.js"
import Article from "../models/Article.js"
import slugify from "slugify";

export const listArticles = (request, response) => {
    response.render("admin/articles/index")
}

export const newArticle = (request, response) => {
    Category.findAll().then(categories => {
        response.render("admin/articles/new", {categories:categories})
    })
}

export const saveArticle = (request, response) => {
    let title = request.body.title;
    let body = request.body.body;
    let category = request.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        response.redirect("/admin/articles")
    })
}