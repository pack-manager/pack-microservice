import { MongoClient } from "../app/database/Mongo";
import { IPack } from "../domain/model/IPack";
import { AppErrorFactory } from "../shared/error/AppError";
import { HttpStatusCode } from "../shared/protocol/HttpStatusCode";
import { CreatePackParams, ICreatePackRepository } from "./protocol/ICreatePackRepository";
import { MongoOmit } from "./protocol/MongoOmit";

export class MongoCreatePackRepository implements ICreatePackRepository {
    async createPack(params: CreatePackParams): Promise<IPack> {
        const { insertedId } = await MongoClient.db
            .collection("packs")
            .insertOne(params)

        const pack = await MongoClient.db
            .collection<MongoOmit>("packs")
            .findOne({ _id: insertedId })

        if (!pack) {
            throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "Pack not created")
        }

        const { _id, ...rest } = pack
        return { id: _id.toHexString(), ...rest }
    }
} 