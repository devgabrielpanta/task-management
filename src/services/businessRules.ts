import { assignmentList } from "@main";
import type { Task } from "@models/tasks";
import type { User } from "@models/users";

export class BusinessRules {

    static canUserBeDeactivated(user: User): boolean {
        return !assignmentList.userHasAssignments(user);
    }

    static canTaskBeCompleted(task: Task): boolean {
        return task.getStatus() !== "BLOCKED";
    }

    static canAssignTask(user: User): boolean {
        return user.isActive();
    }
}