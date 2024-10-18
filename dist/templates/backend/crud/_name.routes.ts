import { Router } from "express";
import * as _NameController from "./_namespace.controller";

const _NameRoutes = Router();

_NameRoutes.get("/", _NameController.index);
_NameRoutes.post("/", _NameController.create);
_NameRoutes.get("/:id", _NameController.findById);
_NameRoutes.put("/:id", _NameController.updateById);
_NameRoutes.delete("/:id", _NameController.deleteById);

export default _NameRoutes;