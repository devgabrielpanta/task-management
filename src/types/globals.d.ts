export type TId = string;

export interface IBaseEntity {
    id: TId;
    createdAt: Date;
    updatedAt: Date;
}