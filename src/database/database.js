import Sequelize from "sequelize";

const connection = new Sequelize('guiapress', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'    
});

export default connection;