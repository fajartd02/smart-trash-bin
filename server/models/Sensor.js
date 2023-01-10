import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

export const Ranges = db.define('ranges', {
    range: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});