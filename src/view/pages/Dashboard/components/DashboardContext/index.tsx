import {createContext, useCallback, useState} from 'react';

type DashboardContextValue = {
	areValuesVisible: boolean;
	isNewAccountModalOpen: boolean;
	isNewTransactionModalOpen: boolean;
	newTransactionType: 'INCOME' | 'EXPENSE' | undefined;
	toggleValuesVisibility(): void;
	openNewAccountModal(): void;
	closeNewAccountModal(): void;
	openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void;
	closeNewTransactionModal(): void;
};

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({children}: {children: React.ReactNode}) {
	const [areValuesVisible, setAreValuesVisible] = useState(true);
	const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
	const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
	const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | undefined>(undefined);

	const toggleValuesVisibility = useCallback(() => {
		setAreValuesVisible(prevSate => !prevSate);
	}, []);

	const openNewAccountModal = useCallback(() => {
		setIsNewAccountModalOpen(true);
	}, []);

	const closeNewAccountModal = useCallback(() => {
		setIsNewAccountModalOpen(false);
	}, []);

	const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
		setNewTransactionType(type);
		setIsNewTransactionModalOpen(true);
	}, []);

	const closeNewTransactionModal = useCallback(() => {
		setNewTransactionType(undefined);
		setIsNewTransactionModalOpen(false);
	}, []);

	return (
		<DashboardContext.Provider
			value={{
				areValuesVisible,
				toggleValuesVisibility,
				isNewAccountModalOpen,
				openNewAccountModal,
				closeNewAccountModal,
				isNewTransactionModalOpen,
				openNewTransactionModal,
				closeNewTransactionModal,
				newTransactionType,
			}}
		>
			{children}
		</DashboardContext.Provider>
	);
}
