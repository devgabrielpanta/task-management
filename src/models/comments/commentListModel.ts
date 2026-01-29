import type { TComment, ICreateComment, ICommentListActions } from "@models/comments";
import { Comment } from "@models/comments";
import type { TId } from "types/globals";

export class CommentList implements ICommentListActions {
    comments: Comment[] = [];
    subcommentsMap: Map<TId, Comment[]> = new Map(); // TId is parent comment ID

    // ###########################################################
    //                  GET METHODS
    // ###########################################################
    getAllComments(): TComment[] {
        return this.comments.map(comment => comment.getComment());
    };

    getCommentsSubcomments(parentCommentId: string): TComment[] {
        const subcomments = this.subcommentsMap.get(parentCommentId) || [];
        return subcomments.map(comment => comment.getComment());
    }

    getCommentById(commentId: string): TComment | undefined {
        const comment = this.comments.find(comment => comment.id === commentId);
        return comment ? comment.getComment() : undefined;
    };

    getCommentsByUser(userId: string): TComment[] {
        return this.comments
            .filter(comment => comment.user.id === userId)
            .map(comment => comment.getComment());
    };

    getCommentsByTask(taskId: string): TComment[] {
        return this.comments
            .filter(comment => comment.task.id === taskId)
            .map(comment => comment.getComment());
    };

    // ###########################################################
    //                CREATE, UPDATE, DELETE METHODS
    // ###########################################################
    addComment(comment: ICreateComment): void {
        const newComment = new Comment(comment);
        this.comments.push(newComment);
    };

    addSubcomment(parentCommentId: string, comment: ICreateComment): void {
        const newComment = new Comment(comment);
        if (!this.subcommentsMap.has(parentCommentId)) {
            this.subcommentsMap.set(parentCommentId, []);
        } else {
            this.subcommentsMap.get(parentCommentId)!.push(newComment);
        }
    };

    updateComment(commentId: string, updatedComment: Partial<TComment>): void {
        const comment = this.comments.find(comment => comment.id === commentId);
        if (comment) {
            comment.updateComment(updatedComment);
        }
    };

    removeComment(commentId: string): void {
        const comment = this.comments.find(comment => comment.id === commentId);
        if (!comment) return;

        // If it's a parent comment, remove its subcomments as well
        if (comment.isParentComment()) {

            // Remove subcomments
            const subcomments = this.subcommentsMap.get(commentId) || [];
            subcomments.forEach(subcomment => this.handleRemoveComment(subcomment));

            // Remove the parent mapping
            this.subcommentsMap.delete(commentId);

        }

        // Remove the comment itself (parent or subcomment)
        this.handleRemoveComment(comment);
    };

    private handleRemoveComment(comment: Comment): void {
        this.comments = this.comments.filter(c => c.id !== comment.id);
    }

}