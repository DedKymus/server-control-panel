import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { ILogger } from '../utils/logger.js';
import { HttpStatus } from '../utils/http-status.js';

export class AuthController {

    constructor(
        private logger: ILogger,
        private jwtSecret: string
    ) {}

    public register = async (req: Request, res: Response) => {
        const data = req.body;
        this.logger.info(`[AuthController] Registration request received:`, data);

        const fakeUserId = "123e4567-e89b-12d3-a456-426614174000";

        const token = jwt.sign(
            { id: fakeUserId, email: data.email },
            this.jwtSecret,
            { expiresIn: '24h' }
        );

        //TODO:add bd logic and service

        res.status(HttpStatus.Created).json({
            success: true,
            token: token,
            msg: "User registered successfully",
        });
    };
}