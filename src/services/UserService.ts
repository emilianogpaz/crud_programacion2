import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";


interface IUser {
    id?:string;
    username: string;
    email: string;
    telefone: string;
    cidade: string;
    estado: string;
  }
 

class UserService {
  async createUserService({ username, email, telefone, cidade, estado }: IUser) {
    if (!username || !email || !telefone || !cidade || !estado) {
      throw new Error("Por favor rellena todos los campos");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const usernameAlreadyExists = await usersRepository.findOne({ username });

    if (usernameAlreadyExists) {
      throw new Error("Nombre de Usuario ya existe");
    }

    const emailAlreadyExists = await usersRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new Error("El email ya existe");
    }

    const user = usersRepository.create({
      username,
      email,
      telefone,
      cidade,
      estado,
    });

    await usersRepository.save(user);

    return user;
  }

  async deleteUserService(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id })
      .execute();

    return user;

  }

  async getDataUserService(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    return user;
  }

  async listUserService() {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return users;
  }

  async searchUserService(search: string) {
    if (!search) {
      throw new Error("Por favor rellena el campo de búsqueda");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .where("username like :search", { search: `%${search}%` })
      .orWhere("email like :search", { search: `%${search}%` })
      .orWhere("telefone like :search", { search: `%${search}%` })
      .orWhere("cidade like :search", { search: `%${search}%` })
      .orWhere("estado like :search", { search: `%${search}%` })
      .getMany();

    return user;

  }

  async updateUserService({ id, username, email, telefone, cidade, estado }: IUser) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ username, email, telefone, cidade, estado })
      .where("id = :id", { id })
      .execute();

    return user;

  }
}

export default UserService;
