import { Request, Response } from "express";
import _NameService from "./_namespace.service";

export const index = async (req: Request, res: Response) => {
	const _nameService = new _NameService();
	const { page, perPage, sortBy, sort, search, ...query } = req.query;

	if (search) {
		query.OR = [
			{ name: { contains: search, mode: 'insensitive' } }
		];
	}

	if (page) {
		const data = await _nameService.paginate(
			+(page as string) || 1,
			+(perPage as string) || 10,
			sortBy as string,
			sort as string,
			query
		);

		return res.send(data);
	} else {
		const data = await _nameService.getAll();
		return res.send(data);
	}
};

export const create = async (req: Request, res: Response) => {
	const _nameService = new _NameService();

	const props = req.body;
	const data = await _nameService.create(props);

	return res.send(data);
};

export const findById = async (req: Request, res: Response) => {
	const _nameService = new _NameService();

	const { id } = req.params;
	const data = await _nameService.findById(id);

	return res.send(data);
};

export const updateById = async (req: Request, res: Response) => {
	const _nameService = new _NameService();

	const props = req.body;
	const { id } = req.params;
	const data = await _nameService.updateById(id, props);

	return res.send(data);
};

export const deleteById = async (req: Request, res: Response) => {
	const _nameService = new _NameService();

	const { id } = req.params;
	const data = await _nameService.deleteById(id);

	return res.send(data);
};
