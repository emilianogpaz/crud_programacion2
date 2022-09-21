import { Request, Response } from "express";
import { UpdateUserService } from "../services/UpdateUserService";

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id, username, email, telefone, cidade, estado } = request.body;

    const updateUserService = new UpdateUserService();

    try {
      await updateUserService.update({ id, username, email, telefone, cidade, estado }).then(() => {
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

export { UpdateUserController };