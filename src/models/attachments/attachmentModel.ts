import type { TId } from "types/globals";
import type { ICreateAttachment, TAttachment, TAttachmentModel, TUpdateAttachment } from "./attachmentModelType";

export class Attachment implements TAttachmentModel {
    id: TId;
    createdAt: Date;
    updatedAt: Date;

    taskId: TId;
    fileName: string;
    size: number;
    url: string;

    constructor(params: ICreateAttachment) {
        this.id = new Date().getTime().toString();
        this.createdAt = new Date();
        this.updatedAt = new Date();

        this.taskId = params.taskId;
        this.fileName = params.fileName;
        this.size = params.size;
        this.url = params.url;
    }

    getAttachment(): TAttachment {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            taskId: this.taskId,
            fileName: this.fileName,
            size: this.size,
            url: this.url,
        };
    }

    updateAttachment(updatedAttachment: TUpdateAttachment): void {
        Object.keys(updatedAttachment).forEach((key) => {
            (this as any)[key] = (updatedAttachment as any)[key];
        });
        this.updatedAt = new Date();
    }
}