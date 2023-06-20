import Sequelize from "sequelize";
import connection  from "../database/database.js";

export const Category = connection.define("categories", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//Category.sync({force:true}) criar tabela no banco

export default Category;