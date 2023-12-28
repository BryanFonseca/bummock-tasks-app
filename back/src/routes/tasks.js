import express from "express";
import { Task } from "../db/sequelize.js";
import { createDateFromFormat } from "../helpers/index.js";
import { Op } from "sequelize";
import { body, param, query } from "express-validator";
import validateRequest from "../middlewares/validate-request.js";

const router = express.Router();

router.get(
    "/api/tasks",
    [
        query("date")
            .matches(/^\d{2}\/\d{2}\/\d{4}$/)
            .withMessage("date debe tener el formato DD/MM/YYYY"),
    ],
    validateRequest,
    async function (req, res, next) {
        const { date: dateString } = req.query;

        if (!dateString) {
            const tasks = await Task.findAll();
            return res.status(200).send(tasks);
        }

        const date = createDateFromFormat(dateString);
        const startDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
        const endDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + 1
        );

        const tasks = await Task.findAll({
            where: {
                date: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate,
                },
            },
            order: [["createdAt", 'DESC']],
        });
        res.status(200).send(tasks);
    }
);

router.post(
    "/api/task",
    [
        body("content")
            .trim()
            .isLength({ min: 1, max: 200 })
            .withMessage("Se debe proporcionar contenido de la tarea"),
    ],
    validateRequest,
    async function (req, res) {
        const { content, date: dateString } = req.body;
        let task = null;
        if (dateString) {
            const date = createDateFromFormat(dateString);
            task = await Task.create({
                content,
                date,
            });
        } else {
            task = await Task.create({
                content,
            });
        }
        res.status(200).send(task);
    }
);

router.delete(
    "/api/task/:id",
    [param("id").isNumeric().withMessage("id debe ser numérico")],
    validateRequest,
    async function (req, res) {
        const { id } = req.params;
        await Task.destroy({
            where: {
                id,
            },
        });
        res.status(200).send({});
    }
);

router.patch(
    "/api/task/:id",
    [
        param("id").isNumeric().withMessage("id debe ser numérico"),
        body("isCompleted")
            .isBoolean()
            .withMessage("isEnabled debe ser boolean"),
    ],
    validateRequest,
    async function (req, res) {
        const taskId = req.params.id;
        const { isCompleted } = req.body;
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).send({});
        }
        task.isCompleted = isCompleted;
        await task.save();
        res.status(200).send(task);
    }
);

export default router;
