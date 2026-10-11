import type { Express} from "express";
import type { AuthController } from "../controllers/auth.controller.js";

export const mapRoutes = (app: Express,authController:AuthController): void => {
    app.post("/api/register",authController.register);
}