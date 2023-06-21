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

export const editArticle = (request, response) => {
  let id = request.params.id;

  Article.findByPk(id).then(article => {
    if(article != undefined){

      Category.findAll().then(categories => {
        response.render("admin/articles/edit", {article: article, categories:categories});

      })
    }else{
      response.redirect("/");
    }
  }).catch(error => {
    response.redirect("/");
  })
};


export const updateArticle = (request, response) => {
  let id = request.body.id;
  let title = request.body.title;
  let body = request.body.body;
  let category = request.body.category;

  Article.update(
    { title: title, body: body, categoryId:category, slug:slugify(title) },
    {
      where: { id: id },
    }
  ).then(() => {
    response.redirect("/admin/articles");
  }).catch(error => {
    response.redirect("/");
  })
};

export const pageArticle = (request, response) => {
  let page = request.params.num;
  let offset = 0;
  
  //Pagination
  if(isNaN(page) || page == 1){
    offset = 0;
  }else{
    offset = parseInt(page) * 4;
  }

  Article.findAndCountAll({
    limit: 4,
    offset: offset
  }).then(articles => {

    let next;
    if(offset + 4 >= articles.count){
      next = false;
    }else{
      next = true;
    }

    let result = {next:next,articles:articles}

    Category.findAll().then(categories => {
      response.render("admin/articles/page", {result: result, categories:categories})
    })

  })
}