import express from "express";
import connection from "./database/database.js";
import { Article } from "./models/Article.js"
import { Category } from "./models/Category.js";

import { 
        deleteCategorie,
        editCategorie,
        listCategories,
        newCategorie, 
        saveCategorie, 
        updateCategorie} from "./controllers/categoriesController.js";
        
import { 
        deleteArticle,
        editArticle,
        listArticles,
        newArticle,  
        saveArticle,
        updateArticle} from "./controllers/articlesController.js";

const app = express();
// View Engine
app.set('view engine', 'ejs')

//Body Express
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Static
app.use(express.static('public'));

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com banco de dados.")
    }).catch((error) => {
        console.log(error);
    })

// Index
app.get("/", (req, res) => { 
    Article.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then((articles) => {
        Category.findAll().then(categories => {
            res.render("index", { articles: articles, categories:categories });
        });
    });
})

//FindBySlug
app.get("/:slug", (req,res) => {
    let slug = req.params.slug;
    Article.findOne({
        where: {
            slug:slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then((categories) => {
              res.render("index", { article: article, categories: categories });
            });
        }else{
            res.redirect("/")
        }
    }).catch(error => {
        res.redirect("/")
    })
})

app.get("/category/:slug", (req, res) => {
    let slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render("index", {articles:category.articles, categories: categories})
            })
        }else{
            res.redirect("/")
        }
    }).catch(error => {
        res.redirect("/")
    })
})

/* EndPoints Categories */
app.get("/admin/categories", listCategories);
app.get("/admin/categories/new", newCategorie);
app.post("/categories/save", saveCategorie);
app.post("/categories/delete", deleteCategorie);
app.get("/admin/categories/edit/:id", editCategorie);
app.post("/categories/update", updateCategorie);

/* EndPoints Articles */
app.get("/admin/articles", listArticles);
app.get("/admin/articles/new", newArticle);
app.post("/articles/save", saveArticle);
app.post("/articles/delete", deleteArticle);
app.get("/admin/articles/edit/:id", editArticle);
app.post("/articles/update", updateArticle);

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080")
})