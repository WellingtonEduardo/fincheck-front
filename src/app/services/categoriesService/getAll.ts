
import {type Category} from '../../entities/Category';

import {httpClient} from './../httpClient';

type CategoryResponse = Category[];

export async function getAll() {

	const {data} = await httpClient.get<CategoryResponse>('/categories');
	return data;
}
