import { IPack } from "../../domain/model/IPack";
import { UpdatePackParams } from "../../repository/protocol/IUpdatePackRepository";
import { AppError } from "../../shared/error/AppError";
import { badRequest, customErrorMessage, ok, serverError } from "../../shared/error/HttpError";
import { IController } from "../../shared/protocol/IController";
import { IHttpRequest } from "../../shared/protocol/IHttpRequest";
import { IHttpResponse } from "../../shared/protocol/IHttpResponse";
import { IUseCase } from "../../shared/protocol/IUseCase";

export class UpdatePackController implements IController {
    constructor(
        private readonly updatePackUseCase: IUseCase
    ) { }

    async handle(httpRequest: IHttpRequest<UpdatePackParams>): Promise<IHttpResponse<IPack | string>> {
        try {
            const { id } = httpRequest.params
            const { body } = httpRequest

            if (!body) {
                return badRequest("Missing fields")
            }

            if (!id) {
                return badRequest("Missing pack id")
            }

            const pack = await this.updatePackUseCase.execute({ id, ...body })

            return ok<IPack>(pack)
        } catch (error) {
            if (error instanceof AppError) {
                return customErrorMessage(error.status, error.message)
            }
            return serverError()
        }
    }
}