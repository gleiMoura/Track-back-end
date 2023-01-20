import fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./src/routes/routes.js";

const app = fastify();

app.register(cors);
app.register(appRoutes)


export default app;
