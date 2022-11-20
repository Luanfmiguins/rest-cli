import { _NameInterface } from "./_name.interface";
import BaseRepository from "_baseDirectory/base.repository";
import _NameModel from "./_name.model";

export default class _NameRepository extends BaseRepository<_NameInterface> {
	constructor() {
		super(_NameModel);
	}
}