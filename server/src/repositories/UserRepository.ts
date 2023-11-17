import { DeleteResult } from "typeorm"
import { AppDataSource } from "../database/data-source"
import { User } from "../entities/User"
import { IUser } from "../intefaces/IUser"

const userRepository = AppDataSource.getRepository(User)

type Pagination = {
  next: number
  previous?: number
}

type UsersResponse = {
  users: IUser[]
  pagination: Pagination
  totalPages: number
}

const getAll = async (limit: number, offset: number): Promise<UsersResponse> => {
  const users = await userRepository.find()

  const startIndex = (offset - 1) * limit;
  const endIndex = offset * limit;
    
  const totalPages = Math.ceil(users.length / limit);

  
  const pagination: Pagination = { next: 0, previous: undefined } 
  
  if (endIndex < users.length) {
    pagination.next = offset + 1;
  }
  
  if (startIndex > 1) {
    pagination.previous = offset - 1;
  } 

  const paginatedUsers = users.slice(startIndex, endIndex);

  return ({ users: paginatedUsers, pagination, totalPages });
}

const getOne = async (id: number): Promise<IUser | []> => {
  const user = await userRepository.findOneBy({ id })

  return user?.id ? user : []
}

const createOne = async (user: IUser): Promise<IUser> => {
  const userCreated = userRepository.create(user)
  const result = await userRepository.save(userCreated)

  return result
}

const updateOne = async (id: number, user: IUser): Promise<IUser | []>  => {
  const identifiedUser = await userRepository.findOneBy({ id })

  if (identifiedUser?.id) {
    userRepository.merge(identifiedUser, user)
    const result = await userRepository.save(identifiedUser)

    return result
  } else {
    return []
  }
}

const deleteOne = async (id: number): Promise<DeleteResult>  => {
  const result = await userRepository.delete(id)

  return result
}

export default { getAll, getOne, createOne, updateOne, deleteOne }