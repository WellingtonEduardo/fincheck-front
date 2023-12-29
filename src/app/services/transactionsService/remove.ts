/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {sleep} from '../../utils/sleep';
import {httpClient} from './../httpClient';

export async function remove(transactionsId: string) {
	await sleep();
	const {data} = await httpClient.delete(`/transactions/${transactionsId}`);
	return data;
}
