import { MongoClient } from "../app/database/Mongo"
import { IPack } from "../domain/model/IPack"
import { IGetPacksRepository } from "./protocol/IGetPacksRepository"
import { MongoOmit } from "./protocol/MongoOmit"

export class MongoGetPacksRepository implements IGetPacksRepository {
    async getPacksFromUser(userId: string): Promise<IPack[]> {
        const packs = await MongoClient.db
            .collection<MongoOmit>("packs")
            .find({ userId })
            .toArray()

        return packs.map(({ _id, ...rest }) => ({
            ...rest,
            id: _id.toHexString()
        }))
    }
}