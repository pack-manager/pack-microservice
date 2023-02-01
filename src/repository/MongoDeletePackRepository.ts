import { ObjectId } from "mongodb";
import { MongoClient } from "../app/database/Mongo";
import { IPack } from "../domain/model/IPack";
import { AppErrorFactory } from "../shared/error/AppError";
import { HttpStatusCode } from "../shared/protocol/HttpStatusCode";
import { IDeletePackRepository } from "./protocol/IDeletePackRepository";
import { MongoOmit } from "./protocol/MongoOmit";

export class MongoDeletePackRepository implements IDeletePackRepository {
    async deletePack(id: string): Promise<IPack> {
        const user = await MongoClient.db
            .collection<MongoOmit>("packs")
            .findOne({ _id: new ObjectId(id) })

        if (!user) {
            throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "Pack not found")
        }

        const deleteCount = await MongoClient.db
            .collection("packs")
            .deleteOne({ _id: new ObjectId(id) })

        if (!deleteCount) {
            throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "Pack not deleted")
        }

        const { _id, ...rest } = user
        return { id: _id.toHexString(), ...rest }
    }
}