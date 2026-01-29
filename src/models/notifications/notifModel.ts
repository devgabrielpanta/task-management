import type { Task } from "@models/tasks";
import { User } from "@models/users";
import type { TUpdateNotification, TNotificationModel, ICreateNotification, TNotification } from "@models/notifications";

export class Notification implements TNotificationModel {
    public id: string;
    public createdAt: Date;
    public updatedAt: Date;
    private user: User;
    private task?: Task;
    private message: string = "";
    private closed: boolean = false;

    constructor(params: ICreateNotification) {
        this.user = params.user;
        this.message = params.message;
        this.closed = params.closed;
        if (params.task) {
            this.task = params.task;
        }

        this.id = new Date().getTime().toString();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    public updateNotification(updatedNotification: TUpdateNotification): void {
        for (const key in updatedNotification) {
            (this as any)[key] = (updatedNotification as any)[key];
        }
        this.updatedAt = new Date();
    }

    public getNotification(): TNotification {
        let data: TNotification = {
            id: this.id,
            user: this.user,
            message: this.message,
            closed: this.closed,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
        if (this.task) {
            data.task = this.task;
        }
        return data;
    }

    public toggleClosed(): void {
        this.closed = !this.closed;
        this.updatedAt = new Date();
    }

    public isClosed(): boolean {
        return this.closed;
    }
}