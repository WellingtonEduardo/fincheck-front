import {useEffect, useState} from 'react';
import {useDashboard} from '../DashboardContext/useDashboard';
import {useTransactions} from '../../../../../app/hooks/useTransactions';
import {type TransactionFilters} from '../../../../../app/services/transactionsService/getAll';

export function useTransactionsController() {
	const {areValuesVisible} = useDashboard();
	const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

	const [filters, setFilters] = useState<TransactionFilters>({
		month: new Date().getMonth(),
		year: new Date().getFullYear(),
	});

	const {transactions, isFetching, isLoading, refetch} = useTransactions(filters);

	useEffect(() => {
		void refetch();
	}, [filters, refetch]);

	function handleChangeMonth(month: number) {
		setFilters(prevState => ({
			...prevState,
			month,
		}));
	}

	function handleOpenFiltersModal() {
		setIsFiltersModalOpen(true);
	}

	function handleCloseFiltersModal() {
		setIsFiltersModalOpen(false);
	}

	return {
		areValuesVisible,
		transactions,
		isInitialLoading: isLoading,
		isLoading: isFetching,
		isFiltersModalOpen,
		handleOpenFiltersModal,
		handleCloseFiltersModal,
		handleChangeMonth,
		filters,

	};
}
