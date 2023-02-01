import { ObjectId } from "mongodb";
import { MongoClient } from "../app/database/Mongo";
import { IPack } from "../domain/model/IPack";
import { AppErrorFactory } from "../shared/error/AppError";
import { HttpStatusCode } from "../shared/protocol/HttpStatusCode";
import { IUpdatePackRepository, UpdatePackParams } from "./protocol/IUpdatePackRepository";
import { MongoOmit } from "./protocol/MongoOmit";

export class MongoUpdatePackRepository implements IUpdatePackRepository {
    async updatePack(id: string, params: UpdatePackParams): Promise<IPack> {
        const pack = await MongoClient.db
            .collection<MongoOmit>("packs")
            .findOne({ _id: new ObjectId(id) })

        if (!pack) {
            throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "Pack not found")
        }

        await MongoClient.db
            .collection("packs")
            .updateOne(
                { _id: new ObjectId(id) },
                { $set: { ...params } }
            )

        const updatedPack = await MongoClient.db
            .collection<MongoOmit>("packs")
            .findOne({ _id: new ObjectId(id) })

        if (!updatedPack) {
            throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "Pack not updated")
        }

        const { _id, ...rest } = updatedPack
        return { id: _id.toHexString(), ...rest }
    }
} 