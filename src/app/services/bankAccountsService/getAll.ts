
import {sleep} from '../../utils/sleep';
import {httpClient} from './../httpClient';

type BankAccountResponse = Array<{
	id: string;
	name: string;
	initialBalance: number;
	type: 'CHECKING' | 'INVESTMENT' | 'CASH';
	color: string;
	currentBalance: number;

}>;

export async function getAll() {
	await sleep();
	const {data} = await httpClient.get<BankAccountResponse>('/bank-accounts');
	return data;
}
