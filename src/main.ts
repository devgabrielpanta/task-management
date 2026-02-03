import { TaskCategory, TaskPriority, TaskStatus, UserRole } from "utils";
import { Task, TaskList } from "@models/tasks";
import { UserList, User } from "@models/users";
import { LogList } from "@models/logs";
import { NotificationList } from "@models/notifications";
import { AssignmentList } from "@models/assignments";
import { SystemConfig } from "@services/systemConfig";
import { IDGenerator } from "@models/base-entity";
import { BusinessRules } from "@services/businessRules";
import { GlobalValidators } from "@services/globalValidators";

export const userList = new UserList();
export const taskList = new TaskList();
export const logList = new LogList();
export const notificationList = new NotificationList();
export const assignmentList = new AssignmentList();

// ##################################################################
//                          DATA MOCKUP
// ##################################################################

const newUserMail: string = "alice@example.com";

userList.add(new User({
    name: "Alice Johnson",
    email: newUserMail,
    role: UserRole.ADMIN
}));
export const loggedUser: User = userList.getAll()[0];

const task1 = new Task({
    title: "Task 1",
    category: TaskCategory.FRONTEND,
    status: TaskStatus.CREATED,
    priority: TaskPriority.HIGH,
    deadline: new Date("2025-01-03"),
    tags: []
});
const task2 = new Task({
    title: "Task 2",
    category: TaskCategory.FRONTEND,
    status: TaskStatus.BLOCKED,
    priority: TaskPriority.HIGH,
    deadline: new Date("2025-01-03"),
    tags: []
});
taskList.add(task1);
taskList.add(task2);


// ##################################################################
//                          REQUIREMENTS
// ##################################################################

// SystemConfig
SystemConfig.setEnvironment("development");
SystemConfig.getInfo();

// IdGenerator (for a better usage see baseEntityModel.ts)
IDGenerator.generateID();
console.log("Generated ID:", loggedUser.getId());

// System has been initialized...
console.log("Logged User ID:", loggedUser.getId());

// Generating the log for loggedUser.getId()...
logList.addLog({
    user: loggedUser,
    action: "getId",
    success: true,
});
console.log("All Logs:", logList.getAllLogs());

// GlobalValidators.isValidEmail()
console.log(`Is "${newUserMail}" a valid email?`, GlobalValidators.isValidEmail(newUserMail));

// BusinessRules.canTaskBeCompleted()
BusinessRules.canTaskBeCompleted(task1);
BusinessRules.canTaskBeCompleted(task2);