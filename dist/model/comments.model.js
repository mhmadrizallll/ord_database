"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModel = void 0;
const objection_1 = require("objection");
const articles_model_1 = require("./articles.model");
class CommentsModel extends objection_1.Model {
    static get tableName() {
        return "comments";
    }
    static get relationMappings() {
        return {
            article: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: articles_model_1.ArticlesModel,
                join: {
                    from: "comments.article_id",
                    to: "articles.id",
                },
            },
        };
    }
}
exports.CommentsModel = CommentsModel;
