import type { TNotification, ICreateNotification, TUpdateNotification } from "@models/notifications";
import { Task } from "@models/tasks";
import { Log } from "@models/logs"

export interface INotificationListActions {
    // ###########################################################
    //                  GET METHODS
    // ###########################################################

    getAllNotifications(): TNotification[];
    getNotifByUser(userId: string): TNotification[];
    getNotifByTask(taskId: string): TNotification[];
    getClosedNotifs(): TNotification[];
    getOpenNotifs(): TNotification[];
    queryNotifsByMessage(keyword: string): TNotification[];

    // ###########################################################
    //                CREATE, UPDATE, DELETE METHODS
    // ###########################################################

    addNotification(notification: ICreateNotification): TNotification;
    removeNotification(notificationId: string): void;
    updateNotification(notificationId: string, updatedNotification: TUpdateNotification): void;
    setNotificationTask(notificationId: string, task: Task): void;
    markAsClosed(notificationId: string): void;
    markAsOpen(notificationId: string): void;
}