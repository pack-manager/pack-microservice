import { MongoDeletePackRepository } from "../../repository/MongoDeletePackRepository";
import { DeletePackController } from "./DeletePackController";
import { DeletePackUseCase } from "./DeletePackUseCase";


const repository = new MongoDeletePackRepository()
const deletePackUseCase = new DeletePackUseCase(repository)
const deletePackController = new DeletePackController(deletePackUseCase)

export { deletePackUseCase, deletePackController }