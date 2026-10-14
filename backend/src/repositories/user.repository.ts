import type { PrismaClient } from '../db/prisma.js';

export interface User {
    id: string;
    email: string;
}

export interface UserData {
    email: string;
    passwordHash: string;
}


export interface IUserRepository {
    findByEmail(email:string): Promise<User | null>
    createUser(data:UserData): Promise<User>
}

export class UserRepository implements IUserRepository {
    constructor(private prisma: PrismaClient) {}

    public async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    public async createUser(data: UserData): Promise<User> {
        return this.prisma.user.create({
            data: {
                email: data.email,
                passwordHash: data.passwordHash,
            },
        });
    }
}