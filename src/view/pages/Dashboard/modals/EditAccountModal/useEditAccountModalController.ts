import {type CreateBankAccountParams} from './../../../../../app/services/bankAccountsService/create';
import {z} from 'zod';
import {useDashboard} from '../../components/DashboardContext/useDashboard';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {bankAccountsService} from '../../../../../app/services/bankAccountsService';
import toast from 'react-hot-toast';
import {currencyStringToNumber} from '../../../../../app/utils/currencyStringToNumber';
import {useState} from 'react';

const schema = z.object({
	initialBalance: z.union([
		z.string().min(1, 'Saldo inicial é obrigatório'),
		z.number().min(1, 'Saldo inicial é obrigatório'),
	]),
	name: z.string().min(1, 'Nome da conta é obrigatório'),
	type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
	color: z.string().min(1, 'Cor é obrigatório'),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
	const {
		isEditAccountModalOpen,
		closeEditAccountModal,
		accountBeingEdited,
	} = useDashboard();

	const {
		handleSubmit: hookFormHandleSubmit,
		register,
		formState: {errors},
		control,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			color: accountBeingEdited?.color,
			initialBalance: accountBeingEdited?.initialBalance,
			name: accountBeingEdited?.name,
			type: accountBeingEdited?.type,
		},
	});

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const queryClient = useQueryClient();

	const {
		isPending,
		mutateAsync: updateAccount,
	} = useMutation({
		async mutationFn(data: CreateBankAccountParams) {
			return bankAccountsService.update({
				id: accountBeingEdited!.id,
				...data,
			});
		},
	});

	const {
		isPending: isLoadingDelete,
		mutateAsync: removeAccount,
	} = useMutation({
		async mutationFn(bankAccountId: string) {
			return bankAccountsService.remove(bankAccountId);
		},
	});

	const handleSubmit = hookFormHandleSubmit(async data => {
		try {
			await updateAccount({
				...data,
				initialBalance: currencyStringToNumber(data.initialBalance),
			});

			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			queryClient.invalidateQueries({queryKey: ['bankAccounts']});

			toast.success('A conta foi editada com sucesso!');
			closeEditAccountModal();
		} catch {
			toast.error('Erro ao salvar as alterações!');
		}
	});

	function handleOpenDeleteModal() {
		setIsDeleteModalOpen(true);
	}

	function handleCloseDeleteModal() {
		setIsDeleteModalOpen(false);
	}

	async function handleDeleteAccount() {
		try {
			await removeAccount(accountBeingEdited!.id);
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			queryClient.invalidateQueries({queryKey: ['bankAccounts']});

			toast.success('A conta foi deletada com sucesso!');
			closeEditAccountModal();
		} catch {
			toast.error('Erro ao deletar a conta!');
		}
	}

	return {
		isEditAccountModalOpen,
		closeEditAccountModal,
		register,
		errors,
		handleSubmit,
		control,
		isLoading: isPending,
		isDeleteModalOpen,
		handleOpenDeleteModal,
		handleCloseDeleteModal,
		handleDeleteAccount,
		isLoadingDelete,
	};
}
