import type { TId, IBaseEntity } from "../../types/globals";
import type { ITaskActions, ITaskListActions, Task } from "@models/tasks";
import type { IUserActions, IUserListActions, User } from "@models/users";

export interface ICreateNotification {
    user: User;
    task?: Task;
    message: string;
    closed: boolean;
}

interface INotificationActions {
    getNotification(): TNotification;
    updateNotification(updatedNotification: TUpdateNotification): void;
    toggleClosed(): void;
    isClosed(): boolean;
}

export type TNotificationModel = IBaseEntity & INotificationActions;
export type TNotification = IBaseEntity & ICreateNotification;
export type TUpdateNotification = Partial<Omit<TNotification, 'id' | 'createdAt' | 'updatedAt'>>;