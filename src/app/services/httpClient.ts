/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';

export const httpClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL as string,
});
