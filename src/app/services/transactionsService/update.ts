/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {sleep} from '../../utils/sleep';
import {httpClient} from './../httpClient';

export type UpdateTransactionParams = {
	id: string;
	bankAccountId: string;
	categoryId: string;
	name: string;
	value: number;
	date: string;
	type: 'INCOME' | 'EXPENSE';

};

export async function update({
	id,
	...params
}: UpdateTransactionParams) {
	await sleep();
	const {data} = await httpClient.put(`/transactions/${id}`, params);
	return data;
}
