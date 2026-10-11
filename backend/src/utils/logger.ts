import pino from 'pino';


export interface ILogger {
    info(msg: string, ...args: any[]): void;
    warn(msg: string, ...args: any[]): void;
    error(msg: string, ...args: any[]): void;
}

export const createLogger = (isProd: boolean): ILogger => {
    return pino({
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
};