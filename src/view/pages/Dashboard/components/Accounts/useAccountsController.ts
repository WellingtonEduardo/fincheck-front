import {useMemo, useState} from 'react';
import {useWindowWidth} from '../../../../../app/hooks/useWindowWidth';
import {useDashboard} from '../DashboardContext/useDashboard';
import {useQuery} from '@tanstack/react-query';
import {bankAccountsService} from '../../../../../app/services/bankAccountsService';

export function useAccountsController() {
	const windowWidth = useWindowWidth();
	const {
		areValuesVisible,
		toggleValuesVisibility,
		openNewAccountModal,
	} = useDashboard();

	const [sliderState, setSliderState] = useState({
		isBeginning: true,
		isEnd: false,
	});

	const {data, isFetching} = useQuery({
		queryKey: ['bankAccounts'],
		queryFn: bankAccountsService.getAll,
	});

	const currentBalance = useMemo(() => {
		if (!data) {
			return 0;
		}

		return data.reduce((total, account) => total + account.initialBalance, 0);
	}, [data]);

	return {
		sliderState,
		setSliderState,
		windowWidth,
		areValuesVisible,
		toggleValuesVisibility,
		isLoading: isFetching,
		accounts: data ?? [],
		openNewAccountModal,
		currentBalance,
	};
}
