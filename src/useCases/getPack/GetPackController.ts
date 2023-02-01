import { IPack } from "../../domain/model/IPack"
import { AppError } from "../../shared/error/AppError"
import { badRequest, customErrorMessage, ok, serverError } from "../../shared/error/HttpError"
import { IController } from "../../shared/protocol/IController"
import { IHttpRequest } from "../../shared/protocol/IHttpRequest"
import { IHttpResponse } from "../../shared/protocol/IHttpResponse"
import { IUseCase } from "../../shared/protocol/IUseCase"

export class GetPackController implements IController {
    constructor(
        private readonly getPackUseCase: IUseCase
    ) { }

    async handle(httpRequest: IHttpRequest<unknown>): Promise<IHttpResponse<IPack | string>> {
        try {
            const { id } = httpRequest.params

            if (!id) {
                return badRequest("Missing pack id")
            }

            const pack = await this.getPackUseCase.execute(id)
            return ok<IPack>(pack)
        } catch (error) {
            if (error instanceof AppError) {
                return customErrorMessage(error.status, error.message)
            }
            return serverError()
        }
    }
}