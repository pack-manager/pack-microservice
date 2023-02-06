import { IPack } from "../../domain/model/IPack";

export interface IGetPacksRepository {
    getPacksFromUser(userId: string): Promise<IPack[]>
}