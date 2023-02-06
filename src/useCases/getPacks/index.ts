import { MongoGetPacksRepository } from "../../repository/MongoGetPacksRepository";
import { GetPacksFromUserController } from "./GetPacksFromUserController";
import { GetPacksFromUserUseCase } from "./GetPacksFromUserUseCase";

const repository = new MongoGetPacksRepository()
const getPacksFromUserUseCase = new GetPacksFromUserUseCase(repository)
const getPacksFromUserController = new GetPacksFromUserController(getPacksFromUserUseCase)

export { getPacksFromUserUseCase, getPacksFromUserController }