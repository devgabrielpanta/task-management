import type { TId, IBaseEntity } from "../../types/globals";

export interface ICreateAttachment {
    taskId: TId;
    fileName: string;
    size: number;
    url: string;
}

interface IAttachmentActions {
    getAttachment(): TAttachment;
    updateAttachment(updatedComment: TUpdateAttachment): void;
}

export type TAttachmentModel = IBaseEntity & IAttachmentActions;
export type TAttachment = IBaseEntity & ICreateAttachment;
export type TUpdateAttachment = Partial<Omit<TAttachment, 'id' | 'createdAt' | 'updatedAt'>>;