import { IPack } from "../../domain/model/IPack";

export interface IGetPackRepository {
    getPack(id: string): Promise<IPack>
}