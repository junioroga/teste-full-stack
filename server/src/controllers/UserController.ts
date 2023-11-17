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
  
    if (users?.users?.length > 0) {
      return res.status(200).json(users)
    }
  
    return res.status(204).send()
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

    return res.status(404).send({ message: "User not found" })
  } catch (error) {
    return res.status(400).send({ error })
  }  
})

userRouter.post("/create", validateRequestBody(userSchema), 
  async (req: Request, res: Response): Promise<Response> => {

  try {
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
    const user = await UserRepository.updateOne(Number(id), req.body) as IUser
  
    if (user?.id) {
      return res.status(200).json(user)
    }
  
    return res.status(404).send({ message: "User not found" })
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
      return res.status(200).send({ message: "User has been successfully deleted" })
    }

    return res.status(404).send({ message: "User not found" })
  } catch (error) {
    return res.status(400).send({ error })
  }
})

export default userRouter