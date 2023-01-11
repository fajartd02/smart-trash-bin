import { Sequelize } from 'sequelize';

const db = new Sequelize('smart_trash', 'root', "", {
    "host": "localhost",
    "dialect": "mysql"
});

export default db;