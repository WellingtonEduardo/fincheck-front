import {httpClient} from './../httpClient';

export type SigninParams = {
	email: string;
	password: string;

};

type SigninResponse = {
	accessToken: string;
};

export async function signin(params: SigninParams) {
	const {data} = await httpClient.post<SigninResponse>('/auth/signin', params);
	return data;
}
