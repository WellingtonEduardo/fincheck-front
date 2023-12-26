
import {type Category} from '../../entities/Category';
import {sleep} from '../../utils/sleep';
import {httpClient} from './../httpClient';

type CategoryResponse = Category[];

export async function getAll() {
	await sleep();
	const {data} = await httpClient.get<CategoryResponse>('/categories');
	return data;
}
