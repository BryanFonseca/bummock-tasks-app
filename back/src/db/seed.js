import { Task } from "./sequelize.js";

await Task.create({
    content: 'Salvar al mundo',
    isCompleted: false
});