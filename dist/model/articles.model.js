"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesModel = void 0;
const objection_1 = require("objection");
const comments_model_1 = require("./comments.model");
class ArticlesModel extends objection_1.Model {
    static get tableName() {
        return "articles";
    }
    static get relationMappings() {
        return {
            comments: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: comments_model_1.CommentsModel,
                join: {
                    from: "articles.id",
                    to: "comments.article_id",
                },
            },
        };
    }
}
exports.ArticlesModel = ArticlesModel;
