import type { INotificationListActions, TNotification, ICreateNotification, TUpdateNotification } from "@models/notifications";
import { Notification } from "@models/notifications";
import { Task } from "@models/tasks";
import { userList } from "@main";

export class NotificationList implements INotificationListActions {
    private notifications: Notification[] = [];

    // ###########################################################
    //                  GET METHODS
    // ###########################################################

    notifyUser(notification: ICreateNotification): void {
        this.addNotification(notification);

        const user = userList.getUserById(notification.user.id);
        if (!user) return;
        const userData = user.getUser();

        alert(`Notification for ${userData.name}: ${notification.message}`);
    }

    // ###########################################################
    //                  GET METHODS
    // ###########################################################

    getAllNotifications(): TNotification[] {
        return this.notifications.map((notif) => notif.getNotification());
    };

    getNotifByUser(userId: string): TNotification[] {
        return this.notifications
            .filter((notif) => notif.getNotification().user.id === userId)
            .map((notif) => notif.getNotification());
    };

    getNotifByTask(taskId: string): TNotification[] {
        return this.notifications
            .filter((notif) => notif.getNotification().task?.id === taskId)
            .map((notif) => notif.getNotification());
    };

    getClosedNotifs(): TNotification[] {
        return this.notifications
            .filter((notif) => notif.isClosed())
            .map((notif) => notif.getNotification());
    };

    getOpenNotifs(): TNotification[] {
        return this.notifications
            .filter((notif) => !notif.isClosed())
            .map((notif) => notif.getNotification());
    };

    queryNotifsByMessage(keyword: string): TNotification[] {
        return this.notifications
            .filter((notif) => notif.getNotification().message.includes(keyword))
            .map((notif) => notif.getNotification());
    };

    // ###########################################################
    //                CREATE, UPDATE, DELETE METHODS
    // ###########################################################

    addNotification(notification: ICreateNotification): TNotification {
        const newNotification = new Notification(notification);
        this.notifications.push(newNotification);
        return newNotification.getNotification();
    };

    removeNotification(notificationId: string): void {
        this.notifications = this.notifications.filter((notif) => notif.id !== notificationId);
    };

    updateNotification(notificationId: string, updatedNotification: TUpdateNotification): void {
        const notif = this.notifications.find((n) => n.id === notificationId);
        if (notif) {
            notif.updateNotification(updatedNotification);
        }
    };

    setNotificationTask(notificationId: string, task: Task): void {
        const notif = this.notifications.find((n) => n.id === notificationId);
        if (notif) {
            notif.updateNotification({ task });
        }
    };

    markAsClosed(notificationId: string): void {
        const notif = this.notifications.find((n) => n.id === notificationId);
        if (notif && !notif.isClosed()) {
            notif.toggleClosed();
        }
    };

    markAsOpen(notificationId: string): void {
        const notif = this.notifications.find((n) => n.id === notificationId);
        if (notif && notif.isClosed()) {
            notif.toggleClosed();
        }
    };
}