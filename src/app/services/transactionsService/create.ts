/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {httpClient} from './../httpClient';

export type CreateTransactionParams = {
	bankAccountId: string;
	categoryId: string;
	name: string;
	value: number;
	date: string;
	type: 'INCOME' | 'EXPENSE';

};

export async function create(params: CreateTransactionParams) {

	const {data} = await httpClient.post('/transactions', params);
	return data;
}
