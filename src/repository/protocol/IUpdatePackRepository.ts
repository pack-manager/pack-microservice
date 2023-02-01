import { IPack } from "../../domain/model/IPack";

export type UpdatePackParams = {
    code: string
    name: string
    cost: number
}

export interface IUpdatePackRepository {
    updatePack(id: string, params: UpdatePackParams): Promise<IPack>
}