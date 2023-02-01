import { IPack } from "../../domain/model/IPack";

export interface IDeletePackRepository {
    deletePack(id: string): Promise<IPack>
}