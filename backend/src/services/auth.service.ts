import jwt from 'jsonwebtoken';
import type { IUserRepository, User } from '../repositories/user.repository.js';
import type { ILogger } from '../utils/logger.js';
import bcrypt from 'bcrypt';

export interface AuthResult {
    user: User;
    token: string;
}



export interface IAuthService {
    register(email:string,password:string):Promise<AuthResult>
}

export class AuthService implements IAuthService {
    constructor(
        private userRepo: IUserRepository,
        private logger: ILogger,
        private jwtSecret: string) {

    }

    public async register(email: string, password: string): Promise<AuthResult> {
        this.logger.info(`[AuthService] Attempting to register user: ${email}`);
        const existingUser = await this.userRepo.findByEmail(email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const saltRounds = 12;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const user = await this.userRepo.createUser({
            email,
            passwordHash,
        });

        const token = jwt.sign(
            { id: user.id, email: user.email },
            this.jwtSecret,
            { expiresIn: '24h' }
        );
        this.logger.info(`[AuthService] User registered successfully: ${user.id}`);
        return {
            user: {
                id: user.id,
                email: user.email,
            },
            token,
        };
    }
}