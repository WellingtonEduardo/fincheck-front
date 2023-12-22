/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {sleep} from '../../utils/sleep';
import {httpClient} from './../httpClient';

export async function remove(bankAccountId: string) {
	await sleep();
	const {data} = await httpClient.delete(`/bank-accounts/${bankAccountId}`);
	return data;
}
