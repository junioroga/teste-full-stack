import { Request, Response, Router } from 'express'
import UserRepository from '../repositories/UserRepository'

import { validateRequest, validateRequestBody, validateRequestParams, validateRequestQuery } from 'zod-express-middleware';
import { z } from 'zod';
import { IUser } from '../intefaces/IUser';

const userRouter = Router()

const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  address: z.string(),
  birthdate: z.coerce.date(),
})

userRouter.get('/list', 
  validateRequestQuery(z.object({ limit: z.string(), offset: z.string() })), 
  async (req: Request, res: Response): Promise<Response> => {
  const limit = Number(req.query.limit)
  const offset = Number(req.query.offset)

  try {    
    const users = await UserRepository.getAll(limit, offset)
    return res.status(200).json(users)

  } catch (error) {
    return res.status(400).send({ error })
  }
})

userRouter.get('/:id', validateRequestParams(z.object({ id: z.string() })), 
  async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params

  try {
    const user = await UserRepository.getOne(Number(id)) as IUser

    if (user?.id) {
      return res.status(200).json(user)
    }

    return res.status(404).send({ message: "Usuário não encontrado" })
  } catch (error) {
    return res.status(400).send({ error })
  }  
})

userRouter.post("/create", validateRequestBody(userSchema), 
  async (req: Request, res: Response): Promise<Response> => {

  try {
    const existsEmail = await UserRepository.getOneByEmail(req.body.email) as IUser

    if (existsEmail?.id) {
      return res.status(422).send({ message: "E-mail já registrado" })
    }

    const user = await UserRepository.createOne(req.body)

    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

userRouter.put("/:id/edit", validateRequest({
  params: z.object({
    id: z.string(),
  }),
  body: userSchema,
}), async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params

  try {
    const existsUser = await UserRepository.getOne(Number(id)) as IUser

    if (!existsUser?.id) {
      return res.status(404).send({ message: "Usuário não encontrado" })
    }

    const existsEmail = await UserRepository.getOneByEmail(req.body.email) as IUser

    if (existsEmail?.id && (existsEmail?.id !== Number(id))) {
      return res.status(422).send({ message: "E-mail já registrado" })
    }

    const user = await UserRepository.updateOne(Number(id), req.body) as IUser

    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

userRouter.delete("/delete/:id", validateRequestParams(z.object({ id: z.string()})), 
  async function (req: Request, res: Response) {
  const { id } = req.params

  try {    
    const user = await UserRepository.deleteOne(Number(id))

    if (user.affected) {
      return res.status(200).send({ message: "Usuário excluído com sucesso" })
    }

    return res.status(404).send({ message: "Usuário não encontrado" })
  } catch (error) {
    return res.status(400).send({ error })
  }
})

export default userRouter