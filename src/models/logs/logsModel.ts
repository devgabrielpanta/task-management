import type { Task } from "@models/tasks";
import { User } from "@models/users";
import type { TUpdateLog, TLogExecution, TLogModel, ICreateLog, TLog } from "@models/logs";

export class Log implements TLogModel {
    public id: string;
    public createdAt: Date;
    public updatedAt: Date;
    private user: User;
    private task?: Task;
    private action: TLogExecution;
    private success: boolean;

    constructor(params: ICreateLog) {
        this.user = params.user;
        this.task = params.task;
        this.action = params.action;
        this.success = params.success;

        this.id = new Date().getTime().toString();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    public updateLog(updatedLog: TUpdateLog): void {
        for (const key in updatedLog) {
            (this as any)[key] = (updatedLog as any)[key];
        }
        this.updatedAt = new Date();
    }

    public getLog(): TLog {
        let data: TLog = {
            id: this.id,
            user: this.user,
            action: this.action,
            success: this.success,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
        if (this.task) {
            data.task = this.task;
        }
        return data;
    }

    public setLogTask(task: Task): void {
        this.task = task;
        this.updatedAt = new Date();
    }

    public isSuccessful(): boolean {
        return this.success;
    }
}