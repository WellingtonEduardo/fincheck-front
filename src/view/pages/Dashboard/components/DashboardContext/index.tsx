import {createContext, useCallback, useState} from 'react';
import {type BankAccount} from '../../../../../app/entities/BankAccount';

type DashboardContextValue = {
	areValuesVisible: boolean;
	isNewAccountModalOpen: boolean;
	isNewTransactionModalOpen: boolean;
	newTransactionType: 'INCOME' | 'EXPENSE' | undefined;
	isEditAccountModalOpen: boolean;
	accountBeingEdited: BankAccount | undefined;
	toggleValuesVisibility(): void;
	openNewAccountModal(): void;
	closeNewAccountModal(): void;
	openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void;
	closeNewTransactionModal(): void;
	openEditAccountModal(bankAccount: BankAccount): void;
	closeEditAccountModal(): void;
};

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({children}: {children: React.ReactNode}) {
	const [areValuesVisible, setAreValuesVisible] = useState(true);
	const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
	const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
	const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | undefined>(undefined);
	const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
	const [accountBeingEdited, setAccountBeingEdited] = useState<BankAccount | undefined>(undefined);

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

	const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
		setAccountBeingEdited(bankAccount);
		setIsEditAccountModalOpen(true);
	}, []);

	const closeEditAccountModal = useCallback(() => {
		setAccountBeingEdited(undefined);
		setIsEditAccountModalOpen(false);
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
				isEditAccountModalOpen,
				accountBeingEdited,
				openEditAccountModal,
				closeEditAccountModal,
			}}
		>
			{children}
		</DashboardContext.Provider>
	);
}
