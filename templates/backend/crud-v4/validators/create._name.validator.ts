import BaseValidator from "_baseDirectory/base.validator";
import { _NameInterface } from "../_namespace.interface";

export default class Create_NameValidator extends BaseValidator<_NameInterface> {
	constructor(data: any) {
		super(data, {
			name: ["required", "unique:_nameValidator"],
		});
	}
}