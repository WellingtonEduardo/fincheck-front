
import {type Transaction} from '../../entities/Transaction';
import {sleep} from '../../utils/sleep';
import {httpClient} from './../httpClient';

type TransactionsResponse = Transaction[];

export type TransactionFilters = {
	month: number;
	year: number;
	bankAccountId?: string;
	type?: Transaction['type'];
};

export async function getAll(filters: TransactionFilters) {
	await sleep();
	const {data} = await httpClient.get<TransactionsResponse>('/transactions', {
		params: filters,
	});
	return data;
}
