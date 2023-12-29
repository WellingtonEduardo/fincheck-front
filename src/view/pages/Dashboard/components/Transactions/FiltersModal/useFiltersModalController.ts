import {useState} from 'react';
import {useBankAccounts} from '../../../../../../app/hooks/useBankAccounts';

export function useFiltersModalController() {
	const [selectedBankAccountId, setSelectedBankAccountId] = useState<undefined | string>(undefined);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

	const {accounts} = useBankAccounts();

	function handleSelectedBankAccount(bankAccountId: string) {
		setSelectedBankAccountId(prevState => (
			prevState === bankAccountId
				? undefined
				: bankAccountId
		));
	}

	function handleChangeYear(step: number) {
		setSelectedYear(prevState => prevState + step);
	}

	return {
		handleSelectedBankAccount,
		selectedBankAccountId,
		selectedYear,
		handleChangeYear,
		accounts,
	};
}
