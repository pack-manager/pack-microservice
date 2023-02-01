import { IPack } from "../../domain/model/IPack";
import { IGetPackRepository } from "../../repository/protocol/IGetPackRepository";
import { AppError } from "../../shared/error/AppError";
import { handleErrorCatching } from "../../shared/helper/HandleErrorCatching";
import { IUseCase } from "../../shared/protocol/IUseCase";

export class GetPackUseCase implements IUseCase {
    constructor(
        private readonly repository: IGetPackRepository
    ) { }

    async execute(data: string): Promise<IPack | AppError> {
        try {
            const user = this.repository.getPack(data)
            return user
        } catch (error) {
            throw handleErrorCatching(error)
        }
    }
}