import { Task } from "@models/tasks";
import { TaskStatus } from "utils";
import type { TTaskStatus } from "utils";
import { logList, loggedUser, notificationList, taskList, assignmentList } from "@main";
import type { User } from "@models/users";

export function applyTaskRules(task: Task) {
    taskStatusRules(task);
    taskDeadlineRules(task);
}

export function applyUserRules(user: User) {
    inactiveUserRules(user)
}

// ###########################################################
//                  TASK RULES
// ###########################################################

function taskStatusRules(task: Task) {
    const taskData = task.get();
    let status;

    if ("status" in taskData) {
        status = taskData.status as TTaskStatus;
    } else {
        return;
    }


    switch (status) {
        case TaskStatus.COMPLETED:
            logList.addLog({
                user: loggedUser,
                task,
                action: "setStatus",
                success: true,
            });
            break;
        case TaskStatus.BLOCKED:
            notificationList.notifyUser({
                user: loggedUser,
                task,
                message: `Task is blocked.`,
                closed: false,
            })
            break;
        default:
            break;
    }

}

function taskDeadlineRules(task: Task) {
    if (task.isExpired()) {
        task.setStatus(TaskStatus.BLOCKED);
    }
}


// ###########################################################
//                  USER RULES
// ###########################################################

function inactiveUserRules(user: User) {
    if (user.isActive()) return

    const assignedTasks = assignmentList.getUserAssignments(user);
    if (assignedTasks.length === 0) return;

    assignedTasks.forEach(assignment => {
        taskList.delete(assignment.task.getId());
    });

    assignmentList.deleteUserAssignments(user);

}