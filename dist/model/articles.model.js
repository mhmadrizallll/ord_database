"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesModel = void 0;
const objection_1 = require("objection");
class ArticlesModel extends objection_1.Model {
    static get tableName() {
        return "articles";
    }
}
exports.ArticlesModel = ArticlesModel;
