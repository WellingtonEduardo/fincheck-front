
import {type BankAccount} from '../../entities/BankAccount';

import {httpClient} from './../httpClient';

type BankAccountResponse = BankAccount[];

export async function getAll() {

	const {data} = await httpClient.get<BankAccountResponse>('/bank-accounts');
	return data;
}
