"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const knex_1 = __importDefault(require("knex"));
const objection_1 = require("objection");
const articles_model_1 = require("./model/articles.model");
const comments_model_1 = require("./model/comments.model");
const app = (0, express_1.default)();
const port = 8000;
const knexInstance = (0, knex_1.default)({
    client: "pg",
    connection: {
        user: "postgres",
        password: "1",
        port: 5432,
        host: "127.0.0.1",
        database: "latihan_orm",
    },
});
objection_1.Model.knex(knexInstance);
app.get("/", (_, res) => {
    res.send("Express + TypeScript Server");
});
app.get("/articles", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const articles = yield articles_model_1.ArticlesModel.query().withGraphFetched("comments");
    res.json({ data: articles });
}));
app.get("/comments", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield comments_model_1.CommentsModel.query().withGraphFetched("articles");
    res.json({ data: comments });
}));
app.post("/articles", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield articles_model_1.ArticlesModel.query().insert({
            id: 4,
            title: "title 4",
            body: "lorem ipsum dolor sit amet 4",
            isApproved: true,
        });
        res.json({ data });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}));
app.put("/articles/:id", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(_.params.id);
    try {
        const data = yield articles_model_1.ArticlesModel.query().findById(id);
        if (!data)
            res.status(404).json({ error: "data not found" });
        yield articles_model_1.ArticlesModel.query().findById(id).patch({
            title: "title 3 updated",
            body: "lorem updated",
            isApproved: true,
        });
        res.json({ message: "data updated", data });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}));
app.delete("/articles/:id", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(_.params.id);
    try {
        const data = yield articles_model_1.ArticlesModel.query().findById(id);
        if (!data)
            res.status(404).json({ error: "data not found" });
        yield articles_model_1.ArticlesModel.query().deleteById(id);
        res.json({ message: "data deleted", data });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
