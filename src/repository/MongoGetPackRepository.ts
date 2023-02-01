import { ObjectId } from "mongodb"
import { MongoClient } from "../app/database/Mongo"
import { IPack } from "../domain/model/IPack"
import { AppErrorFactory } from "../shared/error/AppError"
import { HttpStatusCode } from "../shared/protocol/HttpStatusCode"
import { IGetPackRepository } from "./protocol/IGetPackRepository"
import { MongoOmit } from "./protocol/MongoOmit"

export class MongoGetPackRepository implements IGetPackRepository {
    async getPack(id: string): Promise<IPack> {
        const pack = await MongoClient.db
            .collection<MongoOmit>("packs")
            .findOne({ _id: new ObjectId(id) })

        if (!pack) {
            throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "Pack not found")
        }

        const { _id, ...rest } = pack
        return { id: _id.toHexString(), ...rest }
    }
}