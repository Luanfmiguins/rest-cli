import { Schema } from "mongoose";
import {DefaultSchema, DefaultSchemaOptions} from "_baseDirectory/repositories/mongoose/default.schema";

const _NameSchema = new Schema({
	...DefaultSchema,
	name: {
		type: String,
		required: true,
	}
}, DefaultSchemaOptions);

_NameSchema.index({
	name: "text"
});

export default _NameSchema;