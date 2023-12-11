/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import {localStorageKeys} from '../config/localStorageKeys';
import {sleep} from '../utils/sleep';

export const httpClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL as string,
});

httpClient.interceptors.request.use(config => {
	const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

httpClient.interceptors.response.use(async data => {
	await sleep(500);
	return data;
});
