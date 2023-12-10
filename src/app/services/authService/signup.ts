import {sleep} from '../../utils/sleep';
import {httpClient} from './../httpClient';

export type SignupParams = {
	name: string;
	email: string;
	password: string;

};

type SignupResponse = {
	accessToken: string;
};

export async function signup(params: SignupParams) {
	await sleep();
	const {data} = await httpClient.post<SignupResponse>('/auth/signup', params);
	return data;
}
