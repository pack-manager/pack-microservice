import { Router } from "express"
import { createPackController } from "../../useCases/createPack"
import { deletePackController } from "../../useCases/deletePack"
import { getPackController } from "../../useCases/getPack"
import { updatePackController } from "../../useCases/updatePack"

const routes = Router()

routes.post("/packs", async (req, res) => {
    const { body, statusCode } = await createPackController.handle({ body: req.body })
    res.status(statusCode).send(body)
})

routes.get("/packs/:id", async (req, res) => {
    const { body, statusCode } = await getPackController.handle({ params: req.params })
    res.status(statusCode).send(body)
})

routes.patch("/packs/:id", async (req, res) => {
    const { body, statusCode } = await updatePackController.handle({ params: req.params, body: req.body })
    res.status(statusCode).send(body)
})

routes.delete("/packs/:id", async (req, res) => {
    const { body, statusCode } = await deletePackController.handle({ params: req.params })
    res.status(statusCode).send(body)
})

export default routes