import express from "express";
import "express-async-errors";

import { validationErrorMiddleware } from "./lib/prisma/validation";
import { initCorsMiddleware } from "./lib/prisma/middleware/cors";
import { initSessionMiddleware } from "./lib/prisma/middleware/session";
import { passport } from "./lib/prisma/middleware/passport";

import planetsRoutes from "./routes/planets";
import authRoutes from "./routes/authentication";

const app = express();

app.use(initSessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(initCorsMiddleware());

app.use("/planets", planetsRoutes);
app.use("/auth", authRoutes);

app.use(validationErrorMiddleware);

export default app;