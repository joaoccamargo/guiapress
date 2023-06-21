import express from "express";
import connection from "./database/database.js";
/*SYNC SEQUELIZE
import { Article } from "./models/Article.js"
import { Category } from "./models/Category.js";
*/
import { 
        deleteCategorie,
        editCategorie,
        listCategories,
        newCategorie, 
        saveCategorie, 
        updateCategorie} from "./controllers/categoriesController.js";
        
import { 
    deleteArticle,
        listArticles,
        newArticle,  
        saveArticle} from "./controllers/articlesController.js";

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

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080")
})