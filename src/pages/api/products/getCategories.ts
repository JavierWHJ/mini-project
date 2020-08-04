import nextConnect, { NextHandler } from "next-connect";
import { onError } from "../../../middlewares";
import { NextApiRequest, NextApiResponse } from "next";
import ProductsService from "../../../service/products";

const handler = nextConnect({ onError })

handler.get((req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    ProductsService.getCategories().then(r => res.json(r), next)
})

export default handler