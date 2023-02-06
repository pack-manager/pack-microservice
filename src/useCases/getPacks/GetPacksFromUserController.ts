import { IPack } from "../../domain/model/IPack";
import { AppError } from "../../shared/error/AppError";
import { customErrorMessage, ok, serverError } from "../../shared/error/HttpError";
import { IController } from "../../shared/protocol/IController";
import { IHttpRequest } from "../../shared/protocol/IHttpRequest";
import { IHttpResponse } from "../../shared/protocol/IHttpResponse";
import { IUseCase } from "../../shared/protocol/IUseCase";

export class GetPacksFromUserController implements IController {
    constructor(
        private readonly getPacksFromUserUseCase: IUseCase
    ) { }

    async handle(httpRequest: IHttpRequest<string>): Promise<IHttpResponse<IPack[] | string>> {
        try {
            const { userId } = httpRequest.params
            const packs = await this.getPacksFromUserUseCase.execute(userId)
            return ok<IPack[]>(packs)
        } catch (error) {
            if (error instanceof AppError) {
                return customErrorMessage(error.status, error.message)
            }
            return serverError()
        }
    }
}