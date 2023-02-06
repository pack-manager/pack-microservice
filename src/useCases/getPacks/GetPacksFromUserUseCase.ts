import { IPack } from "../../domain/model/IPack";
import { IGetPacksRepository } from "../../repository/protocol/IGetPacksRepository";
import { AppError } from "../../shared/error/AppError";
import { handleErrorCatching } from "../../shared/helper/HandleErrorCatching";
import { IUseCase } from "../../shared/protocol/IUseCase";

export class GetPacksFromUserUseCase implements IUseCase {
    constructor(
        private readonly repository: IGetPacksRepository
    ) { }

    async execute(data: string): Promise<IPack[] | AppError> {
        try {
            return await this.repository.getPacksFromUser(data)
        } catch (error) {
            throw handleErrorCatching(error)
        }
    }
}