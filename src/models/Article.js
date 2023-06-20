import Sequelize from "sequelize";
import connection from "../database/database.js";
import Category from "./Category.js"

export const Article = connection.define("articles", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

// Relacionamento (um para muitos) Uma categoria tem muitos artigos (1-N)
Category.hasMany(Article); 
// Relacionamento (um para um) Um Artigo pertence a uma categoria (1-1)
Article.belongsTo(Category);

//Article.sync({force:true}); criar tabela no banco

export default Article;
