import FastifyUrlData from "@fastify/url-data";
import Fastify from "fastify";

const app = Fastify({
  logger: true,
});

app.register(FastifyUrlData);

app.get("*", async (req, reply) => {
  return reply
    .status(200)
    .type("application/json")
    .send(JSON.stringify(req.urlData()));
});

export default async function handler(req, reply) {
  await app.ready();
  app.server.emit("request", req, reply);
}
