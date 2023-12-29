import {useEffect, useState} from 'react';
import {useDashboard} from '../DashboardContext/useDashboard';
import {useTransactions} from '../../../../../app/hooks/useTransactions';
import {type TransactionFilters} from '../../../../../app/services/transactionsService/getAll';
import {type Transaction} from '../../../../../app/entities/Transaction';

export function useTransactionsController() {
	const {areValuesVisible} = useDashboard();
	const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [transactionBeingEdited, setTransactionBeingEdited] = useState<undefined | Transaction>(undefined);

	const [filters, setFilters] = useState<TransactionFilters>({
		month: new Date().getMonth(),
		year: new Date().getFullYear(),
	});

	const {transactions, isFetching, isLoading, refetch} = useTransactions(filters);

	useEffect(() => {
		void refetch();
	}, [filters, refetch]);

	// eslint-disable-next-line @typescript-eslint/naming-convention
	function handleChangeFiltersModal<TFilter extends keyof TransactionFilters>(filter: TFilter) {
		return (value: TransactionFilters[TFilter]) => {
			if (value === filters[filter]) {
				return null;
			}

			setFilters(prevState => ({
				...prevState,
				[filter]: value,

			}));
		};
	}

	function handleApplyFilters(filters: {bankAccountId: string | undefined; year: number}) {
		handleChangeFiltersModal('bankAccountId')(filters.bankAccountId);
		handleChangeFiltersModal('year')(filters.year);
		handleCloseFiltersModal();
	}

	function handleOpenFiltersModal() {
		setIsFiltersModalOpen(true);
	}

	function handleCloseFiltersModal() {
		setIsFiltersModalOpen(false);
	}

	function handleOpenEditTransactionModal(transaction: Transaction) {
		setIsEditModalOpen(true);
		setTransactionBeingEdited(transaction);
	}

	function handleCloseEditTransactionModal() {
		setIsEditModalOpen(false);
		setTransactionBeingEdited(undefined);
	}

	return {
		areValuesVisible,
		transactions,
		isInitialLoading: isLoading,
		isLoading: isFetching,
		isFiltersModalOpen,
		handleOpenFiltersModal,
		handleCloseFiltersModal,
		handleChangeFiltersModal,
		filters,
		handleApplyFilters,
		transactionBeingEdited,
		isEditModalOpen,
		handleOpenEditTransactionModal,
		handleCloseEditTransactionModal,
	};
}
