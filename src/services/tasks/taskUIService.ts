import { taskListPermissions, Permissions } from "@models/permissions";
import { loggedUser } from "@main";

// (examples) Functions to start task-related UI actions
export function startCreateTask() {
    try {
        // Request permission to create a task
        Permissions.can(taskListPermissions, "add", loggedUser.getRole());

        // Replace the following with actual HTML/CSS
        const taskForm = document.createElement("form");
        return taskForm;
    } catch (error) {
        console.error("Error starting task creation:", error);

        // Replace the following with actual error handling UI
        alert("An error occurred while starting task creation.");
    }
}

export function startEditTask() {
    try {
        // Request permission to edit a task
        Permissions.can(taskListPermissions, "update", loggedUser.getRole());

        // Replace the following with actual HTML/CSS
        const taskForm = document.createElement("form");
        return taskForm;
    } catch (error) {
        console.error("Error starting task editing:", error);

        // Replace the following with actual error handling UI
        alert("An error occurred while starting task editing.");
    }
}

export function startDeleteTask() {
    try {
        // Request permission to delete a task
        Permissions.can(taskListPermissions, "delete", loggedUser.getRole());

        // Replace the following with actual HTML/CSS
        const taskForm = document.createElement("form");
        return taskForm;
    } catch (error) {
        console.error("Error starting task deletion:", error);
        // Replace the following with actual error handling UI
        alert("An error occurred while starting task deletion.");
    }
}