import { Router } from "express";
import * as _NameController from "./_namespace.controller";
import { PermissionByTagMiddleware } from "../permission/middlewares/permission.middleware";

const _NameRoutes = Router();

_NameRoutes.get("/", PermissionByTagMiddleware("read_Name"), _NameController.index);
_NameRoutes.post("/", PermissionByTagMiddleware("create_Name"), _NameController.create);
_NameRoutes.get("/:id", PermissionByTagMiddleware("read_Name"), _NameController.findById);
_NameRoutes.put("/:id", PermissionByTagMiddleware("update_Name"), _NameController.updateById);
_NameRoutes.delete("/:id", PermissionByTagMiddleware("delete_Name"), _NameController.deleteById);

export default _NameRoutes;