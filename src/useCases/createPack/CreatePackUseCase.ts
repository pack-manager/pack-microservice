import { IPack } from "../../domain/model/IPack";
import { ICreatePackRepository } from "../../repository/protocol/ICreatePackRepository";
import { AppError } from "../../shared/error/AppError";
import { handleErrorCatching } from "../../shared/helper/HandleErrorCatching";
import { IUseCase } from "../../shared/protocol/IUseCase";
import { PackStatus } from "../../shared/protocol/PackStatus";
import { ICreatePackRequestDTO } from "./ICreatePackRequestDTO";

export class CreatePackUseCase implements IUseCase {
    constructor(
        private readonly repository: ICreatePackRepository
    ) { }

    async execute({ userId, code, name, cost }: ICreatePackRequestDTO): Promise<IPack | AppError> {
        try {
            return await this.repository.createPack({ userId, code, name, cost, status: PackStatus.ACTIVE })
        } catch (error) {
            return handleErrorCatching(error)
        }
    }
}