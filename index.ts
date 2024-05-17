import express, { Express, Response } from "express";
import knex from "knex";
import { Model } from "objection";
import { ArticlesModel } from "./model/articles.model";
import { CommentsModel } from "./model/comments.model";
import { title } from "process";

const app: Express = express();
const port = 8000;

const knexInstance = knex({
  client: "pg",
  connection: {
    user: "postgres",
    password: "1",
    port: 5432,
    host: "127.0.0.1",
    database: "latihan_orm",
  },
});

Model.knex(knexInstance);

app.get("/", (_, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/articles", async (_, res: Response) => {
  const articles = await ArticlesModel.query().withGraphFetched("comments");
  res.json({ data: articles });
});

app.get("/comments", async (_, res: Response) => {
  const comments = await CommentsModel.query().withGraphFetched("articles");
  res.json({ data: comments });
});

app.post("/articles", async (_, res: Response) => {
  try {
    const data = await ArticlesModel.query().insert({
      id: 4,
      title: "title 4",
      body: "lorem ipsum dolor sit amet 4",
      isApproved: true,
    });
    res.json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.put("/articles/:id", async (_, res: Response) => {
  const id = parseInt(_.params.id);
  try {
    const data = await ArticlesModel.query().findById(id);
    if (!data) res.status(404).json({ error: "data not found" });
    await ArticlesModel.query().findById(id).patch({
      title: "title 3 updated",
      body: "lorem updated",
      isApproved: true,
    });
    res.json({ message: "data updated", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.delete("/articles/:id", async (_, res: Response) => {
  const id = parseInt(_.params.id);
  try {
    const data = await ArticlesModel.query().findById(id);
    if (!data) res.status(404).json({ error: "data not found" });
    await ArticlesModel.query().deleteById(id);
    res.json({ message: "data deleted", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
