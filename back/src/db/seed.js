import { Task } from "./sequelize.js";

const yesterday = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() - 1
);
await Task.create({
    content: "Llevar al perro a dar un paseo",
    isCompleted: true,
    date: yesterday,
});
await Task.create({
    content: "Sacar la basura",
    isCompleted: true,
    date: yesterday,
});

await Task.create({
    content: "Salvar al mundo",
    isCompleted: false,
});
