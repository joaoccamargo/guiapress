import Category from "../models/Category.js"
import Article from "../models/Article.js"
import slugify from "slugify";

export const listArticles = (request, response) => {
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        response.render("admin/articles/index", {articles:articles})
    })
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

export const deleteArticle = (request, response) => {
  let id = request.body.id;
  if (id != undefined && !isNaN(id)) {
    Article.destroy({
      where: {
        id: id,
      }
    }).then(() => {
      response.redirect("/admin/articles");
    });
  } else {
    response.redirect("/admin/articles");
  }
};