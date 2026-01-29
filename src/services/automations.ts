import type { Task } from "@models/tasks";
import { TaskStatus } from "@models/tasks";
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
    const status: TaskStatus = task.getTask().status;

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
                message: `Task ${task.getTask().id} is blocked.`,
                closed: false,
            })
            break;
        default:
            break;
    }

}

function taskDeadlineRules(task: Task) {
    if (task.isExpired()) {
        taskList.updateTask(task.id, { status: TaskStatus.BLOCKED });
    }
}


// ###########################################################
//                  USER RULES
// ###########################################################

function inactiveUserRules(user: User) {
    const userData = user.getUser();
    if (userData.active) return

    const assignedTasks = assignmentList.getUserAssignments(user);
    if (assignedTasks.length === 0) return;

    assignedTasks.forEach(assignment => {
        taskList.removeTask(assignment.task.id);
    });

    assignmentList.deleteUserAssignments(user);

}