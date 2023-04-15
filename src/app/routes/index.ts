import { Router } from "express"
import { createPackController } from "../../useCases/createPack"
import { deletePackController } from "../../useCases/deletePack"
import { getPackController } from "../../useCases/getPack"
import { getPacksFromUserController } from "../../useCases/getPacks"
import { updatePackController } from "../../useCases/updatePack"

const routes = Router()

routes.post("/packs", async (req, res) => {
    const { body, statusCode } = await createPackController.handle({ body: req.body })
    res.status(statusCode).json(body)
})

routes.get("/packs/users/:userId", async (req, res) => {
    const { body, statusCode } = await getPacksFromUserController.handle({ params: req.params })
    res.status(statusCode).json(body)
})

routes.get("/packs/:id", async (req, res) => {
    const { body, statusCode } = await getPackController.handle({ params: req.params })
    res.status(statusCode).json(body)
})

routes.patch("/packs/:id", async (req, res) => {
    const { body, statusCode } = await updatePackController.handle({ params: req.params, body: req.body })
    res.status(statusCode).json(body)
})

routes.delete("/packs/:id", async (req, res) => {
    const { body, statusCode } = await deletePackController.handle({ params: req.params })
    res.status(statusCode).json(body)
})

export default routes