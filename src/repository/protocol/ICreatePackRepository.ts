import { IPack } from "../../domain/model/IPack";

export type CreatePackParams = {
    userId: string
    code: string
    name: string
    cost: number
    status: string
}

export interface ICreatePackRepository {
    createPack(params: CreatePackParams): Promise<IPack>
}