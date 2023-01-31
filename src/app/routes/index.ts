import { Router } from "express"
import { createPackController } from "../../useCases/createPack"

const routes = Router()

routes.post("/packs", async (req, res) => {
    const { body, statusCode } = await createPackController.handle({ body: req.body })
    res.status(statusCode).send(body)
})

export default routes