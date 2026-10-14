import type { Request, Response } from 'express';
import type { ILogger } from '../utils/logger.js';
import { HttpStatus } from '../utils/http-status.js';
import type {AuthService} from "../services/auth.service.js";

export class AuthController {

    constructor(
        private logger: ILogger,
        private authService:AuthService,
    ) {}

    public register = async (req: Request, res: Response) => {
        const data = req.body;
        this.logger.info(`[AuthController] Registration request received:`, data);

        try {
            const {user, token} = await this.authService.register(data.email, data.password);
            res.status(HttpStatus.Created).json({
                success: true,
                user,
                token,
                msg: "User registered successfully",
            });
        }
        catch (error:any) {
            this.logger.warn(`Registration failed: ${error.message}`)
            res.status(HttpStatus.Conflict).json({
                success: false,
                msg: error.message,
            });
        }
    };
}