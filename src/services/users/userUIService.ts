import { userListPermissions, Permissions } from "@models/permissions";
import { loggedUser } from "@main";

// (examples) Functions to start user-related UI actions
export function startCreateUser() {
    try {
        // Request permission to create a user
        Permissions.can(userListPermissions, "add", loggedUser.getRole());

        // Replace the following with actual HTML/CSS
        const userForm = document.createElement("form");
        return userForm;
    } catch (error) {
        console.error("Error starting user creation:", error);

        // Replace the following with actual error handling UI
        alert("An error occurred while starting user creation.");
    }
}

export function startEditUser() {
    try {
        // Request permission to edit a user
        Permissions.can(userListPermissions, "update", loggedUser.getRole());

        // Replace the following with actual HTML/CSS
        const userForm = document.createElement("form");
        return userForm;
    } catch (error) {
        console.error("Error starting user editing:", error);

        // Replace the following with actual error handling UI
        alert("An error occurred while starting user editing.");
    }
}

export function startDeleteUser() {
    try {
        // Request permission to delete a user
        Permissions.can(userListPermissions, "delete", loggedUser.getRole());

        // Replace the following with actual HTML/CSS
        const userForm = document.createElement("form");
        return userForm;
    } catch (error) {
        console.error("Error starting user deletion:", error);

        // Replace the following with actual error handling UI
        alert("An error occurred while starting user deletion.");
    }
}