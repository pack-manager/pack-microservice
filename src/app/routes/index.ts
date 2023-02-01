import { Router } from "express"
import { createPackController } from "../../useCases/createPack"
import { deletePackController } from "../../useCases/deletePack"

const routes = Router()

routes.post("/packs", async (req, res) => {
    const { body, statusCode } = await createPackController.handle({ body: req.body })
    res.status(statusCode).send(body)
})

routes.delete("/packs/:id", async (req, res) => {
    const { body, statusCode } = await deletePackController.handle({ params: req.params })
    res.status(statusCode).send(body)
})

export default routes