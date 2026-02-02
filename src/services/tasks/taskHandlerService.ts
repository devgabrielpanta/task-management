import { Permissions, taskListPermissions } from "@models/permissions";
import { loggedUser, logList, taskList, notificationList } from "@main";
import { Task } from "@models/tasks";
import { TaskCategory, TaskPriority, TaskStatus } from "utils";

// (examples) Functions to handle task actions
export function handleCreateTask() {
    try {
        // Request permission to create a task
        Permissions.can(taskListPermissions, "add", loggedUser.getRole());

        // Replace the following with actual logic
        taskList.add(new Task({ title: "New Task", category: TaskCategory.FRONTEND, status: TaskStatus.CREATED, priority: TaskPriority.MEDIUM, deadline: new Date(), tags: ["react", "nextjs"] }));
        logList.addLog({
            user: loggedUser,
            action: "add",
            success: true,
        });

        notificationList.notifyUser({
            user: loggedUser,
            message: "A new task has been created successfully.",
            closed: false,
        });
    } catch (error) {
        console.error("Error handling task creation:", error);
        logList.addLog({
            user: loggedUser,
            action: "add",
            success: false,
        });

        // Replace the following with actual error handling UI
        alert("An error occurred while handling task creation.");
    }
}

export function handleEditTask(taskId: string, updatedTask: Partial<Task>) {
    try {
        // Request permission to edit a task
        Permissions.can(taskListPermissions, "update", loggedUser.getRole());

        // Replace the following with actual logic
        taskList.update(taskId, updatedTask);
        logList.addLog({
            user: loggedUser,
            action: "update",
            success: true,
        });

        notificationList.notifyUser({
            user: loggedUser,
            message: "A task has been updated successfully.",
            closed: false,
        });
    } catch (error) {
        console.error("Error handling task editing:", error);
        logList.addLog({
            user: loggedUser,
            action: "update",
            success: false,
        });

        // Replace the following with actual error handling UI
        alert("An error occurred while handling task editing.");
    }
}

export function handleDeleteTask(taskId: string) {
    try {
        // Request permission to delete a task
        Permissions.can(taskListPermissions, "delete", loggedUser.getRole());

        // Replace the following with actual logic
        taskList.delete(taskId);
        logList.addLog({
            user: loggedUser,
            action: "delete",
            success: true,
        });
        notificationList.notifyUser({
            user: loggedUser,
            message: "A task has been deleted successfully.",
            closed: false,
        });
    } catch (error) {
        console.error("Error handling task deletion:", error);
        logList.addLog({
            user: loggedUser,
            action: "delete",
            success: false,
        });

        // Replace the following with actual error handling UI
        alert("An error occurred while handling task deletion.");
    }
}