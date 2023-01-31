import { IPack } from "../../domain/model/IPack";
import { AppError } from "../../shared/error/AppError";
import { badRequest, created, customErrorMessage, serverError } from "../../shared/error/HttpError";
import { IController } from "../../shared/protocol/IController";
import { IHttpRequest } from "../../shared/protocol/IHttpRequest";
import { IHttpResponse } from "../../shared/protocol/IHttpResponse";
import { IUseCase } from "../../shared/protocol/IUseCase";
import { ICreatePackRequestDTO } from "./ICreatePackRequestDTO";

export class CreatePackController implements IController {
    constructor(
        private readonly createPackUseCase: IUseCase
    ) { }

    async handle(httpRequest: IHttpRequest<ICreatePackRequestDTO>): Promise<IHttpResponse<IPack | string>> {
        try {
            const { body } = httpRequest

            if (!body) {
                return badRequest("Please specify a body")
            }

            const response = await this.createPackUseCase.execute(body)

            if (response instanceof AppError) {
                return customErrorMessage(response.status, response.message)
            }

            return created<IPack>(response)
        } catch (error) {
            if (error instanceof AppError) {
                return customErrorMessage(error.status, error.message)
            }
            return serverError()
        }
    }
}