import pino from 'pino';

const isProd = process.env.NODE_ENV === 'production';

export interface ILogger {
    info(msg: string, ...args: any[]): void;
    warn(msg: string, ...args: any[]): void;
    error(msg: string, ...args: any[]): void;
}

export const logger : ILogger = pino({
    level: isProd ? 'error' : 'info',
    ...(!isProd && {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:standard',
            },
        },
    }),
});