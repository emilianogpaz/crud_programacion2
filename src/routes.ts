import { Router } from "express";
import UserController from "./controllers/UserController";
import UserService from "./services/UserService";

const router = Router();

const userControler = new UserController();


router.get("/", userControler.handleListUser);

router.get("/add", (request, response) => {
  response.render("add");
});

router.post("/add-user", userControler.handleCreateUser);

router.get("/search", userControler.handleSearchUser);

router.get("/edit", userControler.handleGetUserData);

router.post("/edit-user", userControler.handleUpdateUser);

router.post("/delete-user", userControler.handleDeleteUser);

export { router };
