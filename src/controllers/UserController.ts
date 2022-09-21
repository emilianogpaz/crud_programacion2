
import { Request, Response } from "express";
import UserService from "../services/UserService";


class UserController {
  async handleCreateUser(request: Request, response: Response) {
    const { username, email, telefone, cidade, estado } = request.body;

    const CreateUserService = new UserService();

    try {
      await CreateUserService.createUserService({
          username,
          email,
          telefone,
          cidade,
          estado,
        })
        .then(() => {
          response.render("message", {
            message: "Usuario registrado con éxito!",
          });
        });
    } catch (err) {
      response.render("message", {
        message: `Error al registrar usuario: ${err.message}`,
      });
    }
  }

  async handleDeleteUser(request: Request, response: Response) {
    const { id } = request.body;

    const deleteUserService = new UserService();

    try {
      await deleteUserService.deleteUserService(id).then(() => {
        response.render("message", {
          message: "Usuario eliminado con éxito",
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al eliminar el usuario: ${err.message}`,
      });
    }
  }

  async handleGetUserData(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const getUserDataService = new UserService();

    const user = await getUserDataService.getDataUserService(id);

    return response.render("edit", {
      user: user
    });
  }
  async handleListUser(request: Request, response: Response) {
    const listUsersService = new UserService();

    const users = await listUsersService.listUserService();

    return response.render("index", {
      users: users
    });
  }

  async handleSearchUser(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    const searchUserService = new UserService();

    try {
      const users = await searchUserService.searchUserService(search);
      response.render("search", {
        users: users,
        search: search
      });
    } catch (err) {
      response.render("message", {
        message: `Error al buscar Usuario: ${err.message}`
      });
    }
  }

  async handleUpdateUser(request: Request, response: Response) {
    const { id, username, email, telefone, cidade, estado } = request.body;

    const updateUserService = new UserService();

    try {
      await updateUserService.updateUserService({ id, username, email, telefone, cidade, estado }).then(() => {
        response.render("message", {
          message: "Usuario actualizado con éxito"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al actualizar el usuario: ${err.message}`
      });
    }

  }
}
export default UserController;
