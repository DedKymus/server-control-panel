import express, {type Express} from "express";
import type {AuthController} from "../controllers/auth.controller.js";
import type {ILogger} from "../utils/logger.js";
import * as http from "node:http";
import {mapRoutes} from "./map.routes.js";
import morgan from "morgan";


export interface ServerConfig {
    port: number;
    isProd:boolean;
}

export class Server {
    private app: Express;
    private httpServer: http.Server;

    constructor(
        private config: ServerConfig,
        private logger: ILogger,
        private authController: AuthController)
    {

        this.app = express()
        this.httpServer = http.createServer(this.app);

        this.setupMiddleware();
        this.setupRoutes();

    }

    private setupMiddleware(): void {
        this.app.use(morgan(this.config.isProd ? 'combined' : 'dev', {
            skip: (req, res) => this.config.isProd && res.statusCode < 400
        }));
        this.app.use(express.json());
    }

    private setupRoutes(): void {
        mapRoutes(this.app,this.authController);
    }

    public start(): void {
        this.httpServer.listen(this.config.port, () => {
            this.logger.info(`Master Server is listening on port ${this.config.port}`);
        });
    }
}