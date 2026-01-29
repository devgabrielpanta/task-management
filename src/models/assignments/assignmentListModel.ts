import type { Task } from "@models/tasks";
import type { User } from "@models/users";
import type { TAssignment, IAssignmentList } from "@models/assignments";
import { Assignment } from "@models/assignments";

export class AssignmentList implements IAssignmentList {
    assignments: Assignment[] = [];

    getAssignments(): TAssignment[] {
        return this.assignments.map(assignment => assignment.getAssignment());
    };

    getUserAssignments(user: User): TAssignment[] {
        return this.assignments
            .filter(assignment => assignment.user.id === user.id)
            .map(assignment => assignment.getAssignment());
    };

    getTaskAssignments(task: Task): TAssignment[] {
        return this.assignments
            .filter(assignment => assignment.task.id === task.id)
            .map(assignment => assignment.getAssignment());
    };

    assignTaskToUser(user: User, task: Task): void {
        const newAssignment = new Assignment({ user, task });
        this.assignments.push(newAssignment);
    };

    unassignTaskFromUser(user: User, task: Task): void {
        this.assignments = this.assignments.filter(assignment =>
            !(assignment.user.id === user.id && assignment.task.id === task.id)
        );
    };

    userIsAssignedToTask(user: User, task: Task): boolean {
        return this.assignments.some(assignment =>
            assignment.user.id === user.id && assignment.task.id === task.id
        );
    };
    taskIsAssignedToUser(task: Task, user: User): boolean {
        return this.assignments.some(assignment =>
            assignment.task.id === task.id && assignment.user.id === user.id
        );
    };

    userHasAssignments(user: User): boolean {
        return this.assignments.some(assignment => assignment.user.id === user.id);
    };

    taskHasAssignments(task: Task): boolean {
        return this.assignments.some(assignment => assignment.task.id === task.id);
    };

    deleteTaskAssignments(task: Task): void {
        this.assignments = this.assignments.filter(assignment => assignment.task.id !== task.id);
    };

    deleteUserAssignments(user: User): void {
        this.assignments = this.assignments.filter(assignment => assignment.user.id !== user.id);
    };

}