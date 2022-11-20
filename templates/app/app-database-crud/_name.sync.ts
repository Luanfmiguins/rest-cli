import { Sync } from "@smart-performance-react-native/pages";

import { _nameCallMethod } from "./_name.call";
import { _NameController } from "./_name.controller";
import { _NameInterface } from "./_name.interface";

export class _NameSync extends Sync {

    constructor() {
        super("_Name Sync")
    }

    async sync() {
        console.log('Synchronizing service methods...')

        await this.clearRealm()

        const callMethod = await _nameCallMethod()

        await this.saveServiceMethodOnRealm(callMethod)

        console.log('Service methods length: ' + callMethod.length)
    }

    private async saveServiceMethodOnRealm(_names: _NameInterface[]) {
        const _nameController = await new _NameController().getInstance()

        for (const serviceMethod of _names) {
            await _nameController.create(serviceMethod)
        }
    }

    private async clearRealm() {
        const _nameController = await new _NameController().getInstance()

        await _nameController.clear()
    }
}