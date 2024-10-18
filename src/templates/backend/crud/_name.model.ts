import { model } from "mongoose";
import _NameSchema from "./_name.schema";

const _NameModel = model("_Name", _NameSchema, "_Name");

export default _NameModel;