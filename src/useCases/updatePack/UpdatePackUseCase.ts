import { IPack } from "../../domain/model/IPack";
import { IUpdatePackRepository } from "../../repository/protocol/IUpdatePackRepository";
import { AppError } from "../../shared/error/AppError";
import { handleErrorCatching } from "../../shared/helper/HandleErrorCatching";
import { IUseCase } from "../../shared/protocol/IUseCase";
import { IUpdatePackRequestDTO } from "./IUpdatePackRequestDTO";

export class UpdatePackUseCase implements IUseCase {
    constructor(
        private readonly repository: IUpdatePackRepository
    ) { }

    async execute({ id, code, name, cost }: IUpdatePackRequestDTO): Promise<IPack | AppError> {
        try {
            const pack = this.repository.updatePack(id, { code, name, cost })
            return pack
        } catch (error) {
            throw handleErrorCatching(error)
        }
    }
}