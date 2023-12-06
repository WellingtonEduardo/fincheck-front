import {httpClient} from './../httpClient';

type SignupParams = {
	name: string;
	email: string;
	password: string;

};

type SignupResponse = {
	accessToken: string;
};

export async function signup(params: SignupParams) {
	const {data} = await httpClient.post<SignupResponse>('/auth/signup', params);
	return data;
}
