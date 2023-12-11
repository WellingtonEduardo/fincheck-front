import {sleep} from '../../utils/sleep';
import {httpClient} from './../httpClient';

type MeResponse = {
	name: string;
	email: string;
};

export async function me() {
	await sleep();
	const {data} = await httpClient.get<MeResponse>('/users/me');
	return data;
}
