import { IPack } from "../../domain/model/IPack";
import { IDeletePackRepository } from "../../repository/protocol/IDeletePackRepository";
import { AppError } from "../../shared/error/AppError";
import { handleErrorCatching } from "../../shared/helper/HandleErrorCatching";
import { IUseCase } from "../../shared/protocol/IUseCase";

export class DeletePackUseCase implements IUseCase {
    constructor(
        private readonly repository: IDeletePackRepository
    ) { }

    async execute(data: string): Promise<IPack | AppError> {
        try {
            const user = await this.repository.deletePack(data)
            return user
        } catch (error) {
            throw handleErrorCatching(error)
        }
    }
}