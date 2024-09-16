import { PrismaClient } from "@prisma/client";
import { _NameInterface } from "./_name.interface";
import BaseRepository from "_baseDirectory/base.repository";

const prisma = new PrismaClient();

export default class _NameRepository extends BaseRepository<_NameInterface> {
	constructor() {
		super("_namespace", prisma);
	}
}