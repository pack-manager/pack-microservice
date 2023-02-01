import { MongoUpdatePackRepository } from "../../repository/MongoUpdatePackRepository";
import { UpdatePackController } from "./UpdatePackController";
import { UpdatePackUseCase } from "./UpdatePackUseCase";

const repository = new MongoUpdatePackRepository()
const updatePackUseCase = new UpdatePackUseCase(repository)
const updatePackController = new UpdatePackController(updatePackUseCase)

export { updatePackUseCase, updatePackController }