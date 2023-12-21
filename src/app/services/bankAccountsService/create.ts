/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {sleep} from '../../utils/sleep';
import {httpClient} from './../httpClient';

export type BankAccountParams = {
	name: string;
	initialBalance: number;
	color: string;
	type: 'CHECKING' | 'INVESTMENT' | 'CASH';

};

export async function create(params: BankAccountParams) {
	await sleep();
	const {data} = await httpClient.post('/bank-accounts', params);
	return data;
}
