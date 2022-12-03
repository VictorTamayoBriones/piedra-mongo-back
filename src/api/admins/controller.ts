import express from "express";
import { addAdminUser, deleteUserAdmin, updateAdminUser } from "./service";

async function addAdminUserController(
  req: express.Request,
  res: express.Response
) {
  try {
    var data = req.body.data;
    const response = await addAdminUser(data);

    res.send({
      code: 200,
      message: "Users found",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

async function updateAdminUserController(
  req: express.Request,
  res: express.Response
) {
  try {
    var data = req.body.data;
    const response = await updateAdminUser(data);

    res.send({
      code: 200,
      message: "Users found",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

async function deleteAdminUserController(
  req: express.Request,
  res: express.Response
) {
  try {
    var userId = req.body.uid;
    const response = await deleteUserAdmin(userId);

    res.send({
      code: 200,
      message: "Users found",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

export {
  addAdminUserController,
  updateAdminUserController,
  deleteAdminUserController,
};
