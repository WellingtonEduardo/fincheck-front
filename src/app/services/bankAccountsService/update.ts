/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {sleep} from '../../utils/sleep';
import {httpClient} from './../httpClient';

export type UpdateBankAccountParams = {
	id: string;
	name: string;
	initialBalance: number;
	color: string;
	type: 'CHECKING' | 'INVESTMENT' | 'CASH';

};

export async function update({
	id,
	...params
}: UpdateBankAccountParams) {
	await sleep();
	const {data} = await httpClient.put(`/bank-accounts/${id}`, params);
	return data;
}
