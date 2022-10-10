import express from "express";
import "express-async-errors";

import { validationErrorMiddleware } from "./lib/prisma/validation";
import { initCorsMiddleware } from "./lib/prisma/middleware/cors";

import planetsRoutes from "./routes/planets";

const app = express();

app.use(express.json());

app.use(initCorsMiddleware());

app.use("/planets", planetsRoutes);

app.use(validationErrorMiddleware);

export default app;