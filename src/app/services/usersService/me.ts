import {type User} from '../../entities/User';
import {sleep} from '../../utils/sleep';
import {httpClient} from './../httpClient';

type MeResponse = User;
export async function me() {
	await sleep();
	const {data} = await httpClient.get<MeResponse>('/users/me');
	return data;
}
