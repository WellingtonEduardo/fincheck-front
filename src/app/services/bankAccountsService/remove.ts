/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {httpClient} from './../httpClient';

export async function remove(bankAccountId: string) {

	const {data} = await httpClient.delete(`/bank-accounts/${bankAccountId}`);
	return data;
}
