import BaseController from "_baseDirectory/base.controller";
import BaseService from "_baseDirectory/base.service";
import { _NameInterface } from "./_name.interface";
import { _NameSchema } from "./_name.schema";
import { _NameService } from "./_name.service";

export class _NameController extends BaseController<_NameInterface> {

    service: BaseService<_NameInterface>;
    constructor() {
        super()
        this.service = new _NameService({
                path: "_namePath",
                name: "_Name",
                schema: [
                    _NameSchema
                ],
                schemaVersion: 0
            });
    }

}