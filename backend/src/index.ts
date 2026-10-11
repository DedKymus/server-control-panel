import 'dotenv/config';
import { createLogger } from './utils/logger.js';
import { AuthController } from './controllers/auth.controller.js';
import { Server } from './server/server.js';

const port = Number(process.env.PORT) || 8080;
const isProd = process.env.NODE_ENV === 'production';
const jwtSecret = process.env.JWT_SECRET || 'secret_dev_key';

const logger = createLogger(isProd);

const authController = new AuthController(logger, jwtSecret);

const server = new Server (
    {port , isProd},
    logger,
    authController
)

server.start()