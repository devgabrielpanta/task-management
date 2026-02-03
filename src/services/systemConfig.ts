export class SystemConfig {
    static appName: string = "Task Management System";
    static version: string = "1.0.0";
    static environment: string = "development";

    static setEnvironment(env: string): void {
        this.environment = env;
    }

    static getInfo(): void {
        console.log(`${this.appName} - Version: ${this.version} - Environment: ${this.environment}`);
    }
}