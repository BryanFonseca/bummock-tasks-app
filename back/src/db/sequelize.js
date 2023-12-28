import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("tasks", "user", "pass", {
    host: "mysql",
    dialect: "mysql",
});

const Task = sequelize.define("Task", {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        defaultValue: new Date(),
    }
});

await sequelize.sync({ force: true });

export default sequelize;
export { Task };
