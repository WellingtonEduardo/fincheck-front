/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

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

	const {data} = await httpClient.put(`/transactions/${id}`, params);
	return data;
}
