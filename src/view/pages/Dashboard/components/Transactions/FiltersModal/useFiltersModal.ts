import {useState} from 'react';

export function useFiltersModal() {
	const [selectedBankAccountId, setSelectedBankAccountId] = useState<undefined | string>(undefined);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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
	};
}
