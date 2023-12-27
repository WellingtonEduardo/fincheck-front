import {useQuery} from '@tanstack/react-query';
import {transactionsService} from '../services/transactionsService';

export function useTransactions() {
	const {data, isFetching, isLoading} = useQuery({
		queryKey: ['transactions'],
		queryFn: async () => transactionsService.getAll({
			month: 11,
			year: 2023,
		}),
	});

	return {
		transactions: data ?? [],
		isFetching,
		isLoading,
	};
}
