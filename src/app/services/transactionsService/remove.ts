/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
;
import {httpClient} from './../httpClient';

export async function remove(transactionsId: string) {

	const {data} = await httpClient.delete(`/transactions/${transactionsId}`);
	return data;
}
