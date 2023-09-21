// importando o fastify
import fastify from "fastify";

import { databasePostgres } from "./database-postgres.js";

// criando um servidor
const server = fastify();

// const database = new databaseMemory()
const database = new databasePostgres();

// criando rotas

server.post("/videos", async (request, reply) => {
  // fazendo uma desestruturação
  const { title, description, duration } = request.body;

  await database.create({
    // quando o nome da chave for igual ao nome do valor nao é necessario escrever duas vezes(short sintaxe)
    title,
    description,
    duration,
  });
  // return reply(response) com o status code .status(201)'siginifica que algo foi criado'
  return reply.status(201).send();
});
// ROTA GET - server para buscar uma informação
server.get("/videos", async (request) => {
  const search = request.query.search;
  console.log(search);
  const videos = await database.list(search);

  return videos;
});
// ROTA put para poder atualizar o video(um unico video em especifico usando o seu id)
server.put("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;
  await database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});
// ROTA DELETE para deletar um video usando o seu id
server.delete("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;
  await database.delete(videoId);

  return reply.status(204).send();
});

// escutando uma porta tipo localhost usando o metodo .listen({port: 3211})
server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3211,
});
