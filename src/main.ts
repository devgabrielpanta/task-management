import { UserRole } from "utils";
import { TaskList } from "@models/tasks";
import { UserList, User } from "@models/users";
import { LogList } from "@models/logs";
import { NotificationList } from "@models/notifications";
import { AssignmentList } from "@models/assignments";

export const userList = new UserList();
export const taskList = new TaskList();
export const logList = new LogList();
export const notificationList = new NotificationList();
export const assignmentList = new AssignmentList();

// Data Mockup
userList.add(new User({
    name: "Alice Johnson",
    email: "alice@example.com",
    role: UserRole.ADMIN
}));
export const loggedUser: User = userList.getAll()[0];