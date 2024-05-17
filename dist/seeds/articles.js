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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex("articles").del();
        // Inserts seed entries
        yield knex("articles").insert([
            {
                id: 1,
                title: "title 1",
                body: "lorem ipsum dolor sit amet 1",
                isApproved: true,
            },
            {
                id: 2,
                title: "title 2",
                body: "lorem ipsum dolor sit amet 2",
                isApproved: false,
            },
            {
                id: 3,
                title: "title 3",
                body: "lorem ipsum dolor sit amet 3",
                isApproved: true,
            },
        ]);
    });
}
exports.seed = seed;
