
import {type Transaction} from '../../entities/Transaction';

import {httpClient} from './../httpClient';

type TransactionsResponse = Transaction[];

export type TransactionFilters = {
	month: number;
	year: number;
	bankAccountId?: string;
	type?: Transaction['type'];
};

export async function getAll(filters: TransactionFilters) {

	const {data} = await httpClient.get<TransactionsResponse>('/transactions', {
		params: filters,
	});
	return data;
}
