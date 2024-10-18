import { _NameInterface } from "./_namespace.interface";
import BaseService from "_baseDirectory/base.service";
import _NameRepository from "./_namespace.repository";
import Create_NameValidator from "./validators/create._name.validator";
import Delete_NameValidator from "./validators/delete._name.validator";
import Update_NameValidator from "./validators/update._name.validator";

export default class _NameService extends BaseService<_NameInterface> {
	constructor() {
		super(_NameRepository, Create_NameValidator, Update_NameValidator, Delete_NameValidator);
	}
}