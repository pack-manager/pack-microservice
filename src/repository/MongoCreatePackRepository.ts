import { MongoClient } from "../app/database/Mongo";
import { IPack } from "../domain/model/IPack";
import { AppErrorFactory } from "../shared/error/AppError";
import { HttpStatusCode } from "../shared/protocol/HttpStatusCode";
import { CreatePackParams, ICreatePackRepository } from "./protocol/ICreatePackRepository";
import { MongoOmit } from "./protocol/MongoOmit";

export class MongoCreatePackRepository implements ICreatePackRepository {
    async createPack(params: CreatePackParams): Promise<IPack> {
        const hasPack = await MongoClient.db
            .collection<MongoOmit>("packs")
            .findOne({ code: params.code })

        if (hasPack) {
            throw AppErrorFactory.create(HttpStatusCode.CONFLICT, "Pack already exists")
        }

        const { insertedId } = await MongoClient.db
            .collection("packs")
            .insertOne(params)

        const createdPack = await MongoClient.db
            .collection<MongoOmit>("packs")
            .findOne({ _id: insertedId })

        if (!createdPack) {
            throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "Pack not created")
        }

        const { _id, ...rest } = createdPack
        return { id: _id.toHexString(), ...rest }
    }
} 