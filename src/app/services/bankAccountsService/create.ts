/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {httpClient} from './../httpClient';

export type CreateBankAccountParams = {
	name: string;
	initialBalance: number;
	color: string;
	type: 'CHECKING' | 'INVESTMENT' | 'CASH';

};

export async function create(params: CreateBankAccountParams) {
	const {data} = await httpClient.post('/bank-accounts', params);
	return data;
}
