import { Permissions, taskListPermissions } from "@models/permissions";
import { loggedUser, logList, taskList, notificationList } from "@main";
import { TaskCategory, TaskPriority, TaskStatus, type TUpdateTask } from "@models/tasks";

// (examples) Functions to handle task actions
export function handleCreateTask() {
    try {
        // Request permission to create a task
        Permissions.can(taskListPermissions, "addTask", loggedUser.getRole());

        // Replace the following with actual logic
        taskList.addTask({ title: "New Task", category: TaskCategory.FRONTEND, status: TaskStatus.CREATED, priority: TaskPriority.MEDIUM, deadline: new Date(), tags: ["react", "nextjs"] });
        logList.addLog({
            user: loggedUser,
            action: "addTask",
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
            action: "addTask",
            success: false,
        });

        // Replace the following with actual error handling UI
        alert("An error occurred while handling task creation.");
    }
}

export function handleEditTask(taskId: string, updatedTask: TUpdateTask) {
    try {
        // Request permission to edit a task
        Permissions.can(taskListPermissions, "updateTask", loggedUser.getRole());

        // Replace the following with actual logic
        taskList.updateTask(taskId, updatedTask);
        logList.addLog({
            user: loggedUser,
            action: "updateTask",
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
            action: "updateTask",
            success: false,
        });

        // Replace the following with actual error handling UI
        alert("An error occurred while handling task editing.");
    }
}

export function handleDeleteTask(taskId: string) {
    try {
        // Request permission to delete a task
        Permissions.can(taskListPermissions, "removeTask", loggedUser.getRole());

        // Replace the following with actual logic
        taskList.removeTask(taskId);
        logList.addLog({
            user: loggedUser,
            action: "removeTask",
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
            action: "removeTask",
            success: false,
        });

        // Replace the following with actual error handling UI
        alert("An error occurred while handling task deletion.");
    }
}