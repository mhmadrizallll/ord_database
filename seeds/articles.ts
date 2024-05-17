import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("articles").del();

  // Inserts seed entries
  await knex("articles").insert([
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
}
