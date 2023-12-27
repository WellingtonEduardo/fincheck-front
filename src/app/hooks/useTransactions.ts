import {useQuery} from '@tanstack/react-query';
import {transactionsService} from '../services/transactionsService';
import {type TransactionFilters} from '../services/transactionsService/getAll';

export function useTransactions(filters: TransactionFilters) {
	const {data, isFetching, isLoading, refetch} = useQuery({
		queryKey: ['transactions'],
		queryFn: async () => transactionsService.getAll(filters),
	});

	return {
		transactions: data ?? [],
		isFetching,
		isLoading,
		refetch,
	};
}
