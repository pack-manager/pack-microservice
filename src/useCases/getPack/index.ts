import { MongoGetPackRepository } from "../../repository/MongoGetPackRepository"
import { GetPackController } from "./GetPackController"
import { GetPackUseCase } from "./GetPackUseCase"

const repository = new MongoGetPackRepository()
const getPackUseCase = new GetPackUseCase(repository)
const getPackController = new GetPackController(getPackUseCase)

export { getPackUseCase, getPackController }