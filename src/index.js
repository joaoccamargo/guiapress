import express from "express";
import connection from "./database/database.js";
import { Article } from "./models/Article.js"
import { Category } from "./models/Category.js";
//import { User } from "./models/User.js";
import session from "express-session";

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
        pageArticle,  
        saveArticle,
        updateArticle} from "./controllers/articlesController.js";
import { 
        createUser,
        listUsers,
        saveUser,
        userAuthenticate,
        userLogin,
        userLogout} from "./controllers/usersController.js";
import { adminAuth } from "./middlewares/adminAuth.js";

const app = express();

// Session, expires 30 second(s)
app.use(session({
    secret: "qualquertextoparaaumentarsegurança", 
    cookie: {maxAge: 30000},
    resave: false,
    saveUninitialized: false
}))

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
      order: [["id", "DESC"]],
      limit: 4,
    }).then((articles) => {
      Category.findAll().then((categories) => {
        res.render("index", { articles: articles, categories: categories });
      });
    });
})

//FindBySlug
app.get("/:slug", (req,res) => {
    let slug = req.params.slug;
    Article.findAll({
        where: {
            slug:slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then((categories) => {
              res.render("index", { articles: article, categories: categories });
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
app.get("/admin/categories", adminAuth, listCategories);
app.get("/admin/categories/new", adminAuth, newCategorie);
app.post("/categories/save", adminAuth, saveCategorie);
app.post("/categories/delete", adminAuth, deleteCategorie);
app.get("/admin/categories/edit/:id", adminAuth, editCategorie);
app.post("/categories/update", adminAuth, updateCategorie);

/* EndPoints Articles */
app.get("/admin/articles", adminAuth, listArticles);
app.get("/admin/articles/new", adminAuth, newArticle);
app.post("/articles/save", adminAuth, saveArticle);
app.post("/articles/delete", adminAuth, deleteArticle);
app.get("/admin/articles/edit/:id", adminAuth, editArticle);
app.post("/articles/update", adminAuth, updateArticle);
app.get("/articles/page/:num", pageArticle)

/* EndPoints Users */
app.get("/admin/users", adminAuth, listUsers);
app.get("/admin/users/create", adminAuth, createUser);
app.post("/users/create", adminAuth, saveUser);
app.get("/users/login", userLogin);
app.post("/users/authenticate", userAuthenticate);
app.get("/users/logout", userLogout);

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080")
})