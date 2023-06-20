import express from "express";
import connection from "./database/database.js";

import { Article } from "./models/Article.js"
import { Category } from "./models/Category.js";

import { 
    deleteCategorie,
        listCategories,
        newCategorie, 
        saveCategorie } from "./controllers/categoriesController.js";
        
import { 
        listArticles,
        newArticle  } from "./controllers/articlesController.js";

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


app.get("/", (req, res) => { res.send({ hello: "helloapi"}) })

/* EndPoints Categories */
app.get("/admin/categories", listCategories)
app.get("/admin/categories/new", newCategorie);
app.post("/categories/save", saveCategorie);
app.post("/categories/delete", deleteCategorie)

/* EndPoints Articles */


app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080")
})