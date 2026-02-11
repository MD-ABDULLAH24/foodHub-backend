import express, { Application } from "express";
import { categoryRouter } from "./modules/categories/categories.routes";
import { providerProfileRouters } from "./modules/providerprofiles/providerProfile.routes";
import { mealsRouter } from "./modules/meals/meals.routes";
import { ordersRouters } from "./modules/orders/orders.routes";
import { reviewsRouter } from "./modules/reviews/reviews.routes";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { auth } from "./lib/auth";
import GlobalErrorHandler from "./middlewhares/globalErrorHandler";
import { notFound } from "./middlewhares/notFound";

const app: Application = express();

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:4000", //Client side URL
    credentials: true, //Token, season, cookies received for this method
  }),
);

app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/providers", providerProfileRouters);

app.use("/api/categories", categoryRouter);

app.use("/api/meals", mealsRouter);

app.use("/api/orders", ordersRouters);

app.use("/api/reviews", reviewsRouter);

app.get("/", (req, res) => {
  res.send("FoodHub API is running ");
});

app.use(notFound)

app.use(GlobalErrorHandler)

export default app;
