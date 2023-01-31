import { MongoCreatePackRepository } from "../../repository/MongoCreatePackRepository";
import { CreatePackController } from "./CreatePackController";
import { CreatePackUseCase } from "./CreatePackUseCase";

const repository = new MongoCreatePackRepository()
const createPackUseCase = new CreatePackUseCase(repository)
const createPackController = new CreatePackController(createPackUseCase)

export { createPackUseCase, createPackController }
