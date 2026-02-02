import express, { Application } from "express";
import { categoryRouter } from "./modules/categories/categories.routes";
import { providerProfileRouters } from "./modules/providerprofiles/providerProfile.routes";
import { mealsRouter } from "./modules/meals/meals.routes";
import { ordersRouters } from "./modules/orders/orders.routes";
import { reviewsRouter } from "./modules/reviews/reviews.routes";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { auth } from "./lib/auth";

const app: Application = express();

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:4000", //Client side URL
    credentials: true, //Token, season, cookies received for this method
  }),
);

app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/provider-profile", providerProfileRouters);

app.use("/categories", categoryRouter);

app.use("/meals", mealsRouter);

app.use("/orders", ordersRouters);

app.use("/reviews", reviewsRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
