import nextConnect, { NextHandler } from "next-connect";
import { onError } from "../../../middlewares";
import { NextApiRequest, NextApiResponse } from "next";
import ProductsService from "../../../service/products";

const handler = nextConnect({ onError })

handler.post((req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    console.log(req)
    ProductsService.getProductsByCategory(req.body.category as string).then(r => res.json(r), next)
})

export default handler