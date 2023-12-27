import {useState} from 'react';
import {useDashboard} from '../DashboardContext/useDashboard';
import {useTransactions} from '../../../../../app/hooks/useTransactions';

export function useTransactionsController() {
	const {areValuesVisible} = useDashboard();
	const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

	const {transactions, isFetching, isLoading} = useTransactions();

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

	};
}
