import { User } from "@models/users";
import { Permissions, userListPermissions } from "@models/permissions";
import { loggedUser, userList, logList, notificationList } from "@main";
import { UserRole } from "utils";

// (examples) Functions to handle user actions
export function handleCreateUser() {
    try {
        // Request permission to create a user
        Permissions.can(userListPermissions, "add", loggedUser.getRole());

        // Replace the following with actual logic
        userList.add(new User({ name: "New User", email: "newuser@example.com", role: UserRole.MEMBER }));
        logList.addLog({
            user: loggedUser,
            action: "add",
            success: true,
        });

        notificationList.notifyUser({
            user: loggedUser,
            message: "A new user has been created successfully.",
            closed: false,
        });

    } catch (error) {
        console.error("Error handling user creation:", error);
        logList.addLog({
            user: loggedUser,
            action: "add",
            success: false,
        });

        // Replace the following with actual error handling UI
        alert("An error occurred while handling user creation.");
    }
}

export function handleEditUser(userId: string, updatedUser: Partial<User>) {
    try {
        // Request permission to edit a user
        Permissions.can(userListPermissions, "update", loggedUser.getRole());

        // Replace the following with actual logic
        userList.update(userId, updatedUser);
        logList.addLog({
            user: loggedUser,
            action: "update",
            success: true,
        });

        notificationList.notifyUser({
            user: loggedUser,
            message: "A user has been updated successfully.",
            closed: false,
        });

        alert("User updated successfully.");
    } catch (error) {
        console.error("Error handling user editing:", error);
        logList.addLog({
            user: loggedUser,
            action: "update",
            success: false,
        });
        // Replace the following with actual error handling UI
        alert("An error occurred while handling user editing.");
    }
}

export function handleDeleteUser(userId: string) {
    try {
        // Request permission to delete a user
        Permissions.can(userListPermissions, "delete", loggedUser.getRole());

        // Replace the following with actual logic
        userList.delete(userId);
        logList.addLog({
            user: loggedUser,
            action: "delete",
            success: true,
        });

        notificationList.notifyUser({
            user: loggedUser,
            message: "A user has been deleted successfully.",
            closed: false,
        });

        alert("User deleted successfully.");
    } catch (error) {
        console.error("Error handling user deletion:", error);
        logList.addLog({
            user: loggedUser,
            action: "delete",
            success: false,
        });

        // Replace the following with actual error handling UI
        alert("An error occurred while handling user deletion.");
    }
}