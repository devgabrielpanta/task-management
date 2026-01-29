import type { TComment } from "@models/comments";

export interface ICommentListActions {
    // ###########################################################
    //                  GET METHODS
    // ###########################################################
    getAllComments(): TComment[];
    getCommentsSubcomments(parentCommentId: string): TComment[]
    getCommentById(commentId: string): TComment | undefined;
    getCommentsByUser(userId: string): TComment[];
    getCommentsByTask(taskId: string): TComment[];

    // ###########################################################
    //                CREATE, UPDATE, DELETE METHODS
    // ###########################################################
    addComment(comment: TComment): void;
    addSubcomment(parentCommentId: string, comment: TComment): void;
    updateComment(commentId: string, updatedComment: Partial<TComment>): void;
    removeComment(commentId: string): void;
}