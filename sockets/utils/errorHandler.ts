import { format } from 'util';

export class GlobalErrorHandler {
    private static instance: GlobalErrorHandler;

    private constructor() {
        this.setupHandlers();
    }

    public static getInstance(): GlobalErrorHandler {
        if (!GlobalErrorHandler.instance) {
            GlobalErrorHandler.instance = new GlobalErrorHandler();
        }
        return GlobalErrorHandler.instance;
    }

    private setupHandlers(): void {
        process.on('uncaughtException', (error: Error) => {
            this.logError('Uncaught Exception', error);
            // Optionally, exit the process
            process.exit(1);
        });

        process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
            this.logError('Unhandled Rejection', reason, promise);
            // Optionally, exit the process
            process.exit(1);
        });

        // Handle SIGTERM and SIGINT for graceful shutdown
        process.on('SIGTERM', () => {
            console.log('[ERROR HANDLER] SIGTERM received. Shutting down gracefully.');
            process.exit(0);
        });

        process.on('SIGINT', () => {
            console.log('[ERROR HANDLER] SIGINT received. Shutting down gracefully.');
            process.exit(0);
        });
    }

    private logError(type: string, error: any, additionalInfo?: any): void {
        const timestamp = new Date().toISOString();
        console.error(`[${timestamp}] [${type}]`);
        if (error instanceof Error) {
            console.error(`Message: ${error.message}`);
            console.error(`Stack: ${error.stack}`);
        } else {
            console.error(`Error: ${format(error)}`);
        }
        if (additionalInfo) {
            console.error(`Additional Info: ${format(additionalInfo)}`);
        }
        console.error('---');
    }
}

// Export a function to initialize the global error handler
export function initializeGlobalErrorHandler(): void {
    GlobalErrorHandler.getInstance();
}
